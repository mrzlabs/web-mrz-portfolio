"use client";

import { useEffect, useMemo, useState } from "react";
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
  const seed = useMemo(
    () => [
      { x: 86, y: 72 },
      { x: 78, y: 18 },
      { x: 58, y: 38 },
      { x: 22, y: 28 },
      { x: 12, y: 74 },
      { x: 45, y: 82 },
      { x: 90, y: 52 },
    ],
    [],
  );

  useEffect(() => {
    let idx = 0;
    const move = () => {
      idx = (idx + 1) % seed.length;
      const next = seed[idx];
      setPos(next);
      setTrail((current) => [...current.slice(-7), next]);
    };
    const timer = window.setInterval(move, 3600);
    move();
    return () => window.clearInterval(timer);
  }, [seed]);

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
