"use client";

import { useEffect, useRef } from "react";

type Props = {
  variant?: "hero" | "sig";
  density?: number;
  speed?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  pulse: number;
};

type Pulse = {
  a: number;
  b: number;
  t: number;
  dur: number;
};

export default function NeuralWeb({ variant = "hero", density = 90, speed = 0.18 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const fit = () => {
      const rect = cv.parentElement!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(cv.parentElement!);

    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      baseR: 1.2 + Math.random() * 1.6,
      pulse: Math.random() * Math.PI * 2,
    }));

    const pulses: Pulse[] = [];
    const MAX_DIST = 150;

    const spawnPulse = () => {
      const a = Math.floor(Math.random() * particles.length);
      const candidates: number[] = [];
      for (let i = 0; i < particles.length; i++) {
        if (i === a) continue;
        const dx = particles[a].x - particles[i].x;
        const dy = particles[a].y - particles[i].y;
        if (dx * dx + dy * dy < MAX_DIST * MAX_DIST) candidates.push(i);
      }
      if (!candidates.length) return;
      const b = candidates[Math.floor(Math.random() * candidates.length)];
      pulses.push({ a, b, t: 0, dur: 1200 + Math.random() * 1600 });
    };

    let last = performance.now();
    let pulseTimer = 0;
    let raf = 0;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      pulseTimer += dt;
      if (pulseTimer > 280) {
        spawnPulse();
        pulseTimer = 0;
      }

      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.012;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      ctx.lineCap = "round";
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 > MAX_DIST * MAX_DIST) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / MAX_DIST) * 0.28;
          ctx.strokeStyle = `rgba(216, 180, 254, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      for (let k = pulses.length - 1; k >= 0; k--) {
        const pl = pulses[k];
        pl.t += dt;
        const prog = pl.t / pl.dur;
        if (prog >= 1) {
          pulses.splice(k, 1);
          continue;
        }
        const A = particles[pl.a];
        const B = particles[pl.b];
        const x = A.x + (B.x - A.x) * prog;
        const y = A.y + (B.y - A.y) * prog;
        const fade = Math.sin(prog * Math.PI);
        ctx.strokeStyle = `rgba(237, 224, 255, ${0.55 * fade})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
        ctx.fillStyle = `rgba(237, 224, 255, ${0.95 * fade})`;
        ctx.shadowColor = "rgba(216, 180, 254, 0.95)";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (const p of particles) {
        const breath = 0.6 + Math.sin(p.pulse) * 0.25;
        ctx.fillStyle = `rgba(237, 224, 255, ${0.75 * breath})`;
        ctx.shadowColor = "rgba(192, 132, 252, 0.9)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseR, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, speed, variant]);

  return <canvas ref={ref} className="neural-canvas" aria-hidden="true" />;
}
