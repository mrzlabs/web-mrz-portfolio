"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";

type Point = {
  x: number;
  y: number;
};

function mkPath(points: Point[]) {
  if (points.length < 2) return "";
  return points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      const prev = points[index - 1];
      const cx = (prev.x + point.x) / 2;
      return `Q ${cx} ${prev.y} ${point.x} ${point.y}`;
    })
    .join(" ");
}

export default function GlobalBot() {
  const [pos, setPos] = useState<Point>({ x: 86, y: 72 });
  const [trail, setTrail] = useState<Point[]>([]);

  useEffect(() => {
    let current = { x: 86, y: 72 };
    let vector = { x: -10, y: 7 };
    const move = () => {
      const jitter = {
        x: (Math.random() - 0.5) * 28,
        y: (Math.random() - 0.5) * 22,
      };
      vector = {
        x: vector.x * 0.52 + jitter.x,
        y: vector.y * 0.52 + jitter.y,
      };
      const next = {
        x: Math.min(94, Math.max(6, current.x + vector.x)),
        y: Math.min(88, Math.max(10, current.y + vector.y)),
      };
      if (next.x === 6 || next.x === 94) vector.x *= -1;
      if (next.y === 10 || next.y === 88) vector.y *= -1;
      current = next;
      setPos(next);
      setTrail((points) => [...points.slice(-11), next]);
    };
    const timer = window.setInterval(move, 2900);
    move();
    return () => window.clearInterval(timer);
  }, []);

  const goContact = () => {
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bot-layer" aria-hidden="false">
      <motion.svg
        className="bot-trail"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.34 }}
        transition={{ duration: 1.2 }}
      >
        <path d={mkPath(trail)} />
      </motion.svg>
      <motion.button
        className="global-bot"
        type="button"
        aria-label="Ir a contacto"
        onClick={goContact}
        whileHover={{ filter: "drop-shadow(0 0 18px rgba(192,132,252,.95))" }}
        style={{ "--bot-x": `${pos.x}vw`, "--bot-y": `${pos.y}vh` } as CSSProperties}
      >
        <span />
        <i />
      </motion.button>
    </div>
  );
}
