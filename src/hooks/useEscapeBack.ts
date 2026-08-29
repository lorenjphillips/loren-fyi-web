import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Escape returns to the section this detail page belongs to. Falls back to the
 * given path when there is no history to go back to, so a shared link still
 * lands somewhere sensible.
 */
export function useEscapeBack(fallback: string) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;

      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el?.isContentEditable
      ) {
        return;
      }
      // Leave Escape to any open dialog or popover.
      if (document.querySelector("[data-state='open'][role='dialog']")) return;

      if (window.history.state?.idx > 0) navigate(-1);
      else navigate(fallback);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, fallback]);
}
