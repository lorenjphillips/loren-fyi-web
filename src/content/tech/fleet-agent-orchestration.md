---
title: Fleet: Orchestrating Coding Agents from One Mac App
description: How I run Claude orchestrators and Codex workers across two always-on Mac minis, and the small macOS app that tells me when anything needs me.
date: 2026-10-12
---

I build most of my software with coding agents that run for hours without me watching. Fleet is the control plane that makes that practical for one person: a few scripts on each machine, and a native macOS app that answers one question at a glance: **does anything need me?**

## The shape of it

- **Orchestrators.** A few long-running Claude sessions, each owning one area of the codebase. They plan the work, split it into small slices, launch workers, read the results and merge.
- **Lanes.** Short-lived Codex workers, one per slice: *build* an issue, *review* a PR, *resolve* review findings, or *run* a test gate. Each runs in its own git worktree.
- **Hosts.** Two headless Mac minis that never sleep, plus my laptop. Work keeps going when the lid is closed (see [Headless Mac Mini as an Always-On Agent Host](/tech/headless-mac-mini)).
- **Me.** I'm the top-level orchestrator. There is deliberately no agent managing the agents; Fleet is where I look, answer and steer.

## What the app shows

![Fleet's main list: each host with its orchestrators and lanes, live status, context usage, and the PR each lane produced](/images/tech/fleet/hosts.png)

Every host gets a section with its machine, memory and load. Under it sit its orchestrators (with how much of their context window they've used) and its lanes (with their model tier and the PR they opened, colored by CI status). One status glyph per row carries the state: a spinner while an agent is mid-turn, a red ring when it needs me, an amber ring when it stopped on a question, a check or a cross when a lane finished.

Click any row and it opens as a live terminal inside the app, attached to that agent's tmux session. Closing the pane only detaches; the agent keeps running.

## Decisions come to an inbox

![The "Needs you" inbox: questions from orchestrators with a recommended answer, alternative options and a free-text reply](/images/tech/fleet/inbox.png)

Nothing is allowed to block on a human watching a terminal. When an orchestrator needs a ruling, it files a question with a recommendation and options, then keeps working on something else. I can accept the recommendation, pick an option or type a reply, and Fleet delivers my answer to the agent **verbatim**, whether it is busy, idle or restarting. The Dock badge counts open decisions.

## Moving work between machines

![Moving a lane to another machine: wait for the agent's current turn to finish, or interrupt it now](/images/tech/fleet/move.png)

Any lane or agent can be dragged onto another host. Fleet checks that the target has room (each machine has a lane cap), copies the worktree, and resumes the same agent session on the other side, so the conversation and the code both carry over. If something fails verification, it rolls back. Before my laptop goes away (sleep, low battery, flaky Wi-Fi), the app offers to evacuate its agents to a mini.

## The parts that remove toil

- **Automatic context handoff.** When an orchestrator approaches its context limit, it writes a handoff note, clears, and resumes from that note with the current lanes and open decisions re-injected. This used to be the main manual chore.
- **Model tiers, not model names.** Orchestrators ask for *fast*, *balanced* or *best*. Fleet maps that to the best model currently available, so new models are adopted without editing prompts.
- **Placement by weight.** Light work goes to the smaller mini; heavy work that needs Docker goes to the bigger one, within each machine's cap.
- **A health tick.** Every ten minutes each host nudges idle or stalled orchestrators, relays pending answers and restarts anything that died.
- **Quiet notifications.** I only hear about a new decision, a blocked or stopped orchestrator, a PR with green checks, an unhealthy host or a failed move.

## How it's built

- Host side: one standard-library Python file plus thin CLI wrappers, deployed to each machine. Every host reports its state as a single JSON document that the app polls over SSH.
- Agents live in tmux; Claude Code hooks keep each orchestrator's state current.
- The app is SwiftUI with an embedded [Ghostty](https://ghostty.org) terminal, a ⌘K command palette and keyboard-first navigation. A mock mode renders it from fixture data; the screenshots here use that, so the hosts, issues and numbers are sample data.
