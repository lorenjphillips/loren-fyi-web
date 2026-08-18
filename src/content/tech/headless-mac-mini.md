---
title: Headless Mac Mini as an Always-On Agent Host
description: Run long-lived Claude/Codex agent sessions on a Mac mini over SSH + tmux, driven from your laptop.
date: 2026-08-17
---


Run long-lived Claude/Codex agent sessions on a Mac mini that never sleeps, driven from
your laptop over SSH + tmux. Close the laptop lid; the agents keep running.

## The model

- **Laptop** = thin client. You SSH in, attach, look around, detach.
- **Mini** = always-on brain. tmux holds the sessions; agents are children of the tmux
  server, not your SSH connection, so disconnecting never kills them.
- **git** = the sync mechanism between machines. Never copy `.venv`/`node_modules`.

## Prerequisites on the Mini

| Piece | Why / how |
|---|---|
| Tailscale | Stable private address for SSH from anywhere; no port forwarding. |
| Remote Login | System Settings → General → Sharing → Remote Login (enables sshd). |
| Never sleep | `sudo pmset -a sleep 0 disablesleep 1 womp 1 autorestart 1` |
| FileVault decision | If ON, a power-loss reboot stops at the unlock screen — no unattended restart. Disable (`sudo fdesetup disable`) only if you accept the risk. |
| tmux | `brew install tmux`. Suggested `~/.tmux.conf`: mouse on, big scrollback (100k). |
| Toolchain | Whatever your repo needs (e.g. `uv`, `node`, `pnpm`, `gh`) — verify your full test/lint gates pass on the Mini itself. |
| Claude CLI | Install, then `/login` once on the Mini (credentials are per-machine). |
| Codex CLI | Install, then log in on the Mini (or copy `~/.codex/auth.json`). |
| git identity | Set `user.name`/`user.email`; auth `gh` on the Mini. |

**Tip:** keep the repo at the *same absolute path* on both machines (e.g.
`/Users/<you>/myrepo`) — Claude's memory and settings are keyed by path, and sibling
worktrees resolve identically.

## SSH from the laptop

Generate an ed25519 key, add it to the Mini's `~/.ssh/authorized_keys`, and configure:

```ssh-config
Host mini
  HostName <tailscale-ip-or-magicdns-name>
  User <you>
  ServerAliveInterval 60
  ServerAliveCountMax 4
  AddKeysToAgent yes
  UseKeychain yes        # macOS: passphrase from keychain, fully passwordless
```

Now `ssh mini` just works, and `scp`/automation stay clean.

## The aliases (laptop `~/.zshrc`)

All three are just `ssh -t mini …` into tmux:

```sh
# mini — attach/create a plain shell session in the repo
alias mini='ssh -t mini "tmux new-session -A -s marker -c ~/myrepo"'

# orch — attach/create the orchestrator session running Claude unattended
alias orch='ssh -t mini "~/.local/bin/orch"'

# ms <name> — attach/create any named session (extra agents, scratch shells)
ms() { ssh -t mini "~/.local/bin/sess $1"; }
```

On the Mini, `~/.local/bin/orch` is roughly:

```sh
#!/bin/sh
export PATH=/usr/local/bin:/opt/homebrew/bin:$HOME/.local/bin:$PATH
tmux new-session -A -s orchestrator -c ~/myrepo \
  'claude --dangerously-skip-permissions'
```

(`sess` is the same idea with `-s "$1"` and no command. `--dangerously-skip-permissions`
is what lets Claude run unattended without blocking on approval prompts — understand the
risk before using it.)

A third helper, `agent-window <name> "<cmd>"`, opens `<cmd>` in a new labeled tmux
window inside the orchestrator session — the headless replacement for terminal tabs:

```sh
#!/bin/sh
export PATH=/usr/local/bin:/opt/homebrew/bin:$HOME/.local/bin:$PATH
tmux new-window -t "${AGENT_TMUX_SESSION:-orchestrator}" -n "$1" -c ~/myrepo "$2"
```

## tmux in 60 seconds

```
one tmux server on the Mini
└── sessions (orchestrator, marker, …)     unlimited
    └── windows (= tabs)                   Ctrl-b c
        └── panes (= splits)               Ctrl-b % / "
```

- `Ctrl-b d` detach · `Ctrl-b w` window tree · `Ctrl-b s` session tree
- `Ctrl-b n`/`p`/`<number>` switch windows · `Ctrl-b <arrows>` move between panes
- **Persistence:** anything started *inside* tmux survives SSH dropping — the alias
  reattaches to the live process. Running `claude` over raw SSH without tmux dies on
  disconnect; never do that.
- **After a Mini reboot** tmux sessions are gone: reattach fresh and use
  `claude --continue` to reload the prior conversation from disk.

## Gotchas that will bite you

1. **Non-login SSH PATH:** `ssh mini <cmd>` skips `/usr/local/bin` and `~/.local/bin`.
   Either wrap commands as `ssh mini 'bash -lc "…"'` or export PATH explicitly at the
   top of every helper script (as above).
2. **sudo is interactive:** you can't drive `pmset`/`fdesetup` from an agent — run those
   yourself at the keyboard or over an interactive `ssh -t`.
3. **RAM is the ceiling:** on an 8 GB machine, 2–3 concurrent agents is the practical
   limit; more will thrash. Stagger waves.
4. **Regenerate, never copy** `.venv`/`node_modules` across machines (architecture and
   absolute-path breakage). Sync code via git only.
5. **Per-machine state to bring over manually:** CLI logins (claude, codex, gh), any
   path-keyed agent memory/settings dirs, and untracked working files like a handoff doc.

## Quick health checks

```sh
ssh mini 'tmux ls'                                   # live sessions
ssh mini 'df -m /System/Volumes/Data | tail -1'      # free disk
ssh mini 'bash -lc "cd ~/myrepo && git log --oneline -1"'
ssh mini 'bash -lc "for t in tmux gh claude codex node; do command -v $t || echo $t MISSING; done"'
```
