import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  t: number;
}

// Trail age window in ms — scales with speed
const MIN_AGE = 180;
const MAX_AGE = 750;
const SPEED_SCALE = 900; // px/s considered "full speed"

export default function MouseFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastRef.current.t;
      if (dt > 0) {
        const dx = e.clientX - lastRef.current.x;
        const dy = e.clientY - lastRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // exponential moving average for smooth speed
        speedRef.current = speedRef.current * 0.82 + (dist / dt * 1000) * 0.18;
      }
      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: now });
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const now = performance.now();
      const speed = speedRef.current;

      // Decay speed toward zero when not moving
      speedRef.current *= 0.96;

      const maxAge = MIN_AGE + (MAX_AGE - MIN_AGE) * Math.min(speed / SPEED_SCALE, 1);
      pointsRef.current = pointsRef.current.filter(p => now - p.t < maxAge);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = pointsRef.current;
      if (pts.length < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const progress = i / pts.length; // 0 = oldest tail, 1 = newest head

        // Taper: faint and thin at tail, solid and slightly wider at head
        const alpha = progress * progress * 0.62;
        const width = 1.2 + progress * 3.2;

        const color = isDark
          ? `rgba(180, 172, 162, ${alpha})`   // light warm gray on dark paper
          : `rgba(148, 138, 126, ${alpha})`;   // light pencil gray on parchment

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
    />
  );
}
