"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";

type BotStep = {
  x: number;
  y: number;
  show: boolean;
};

const route: BotStep[] = [
  { x: 106, y: 74, show: false },
  { x: 88, y: 68, show: true },
  { x: 76, y: 20, show: true },
  { x: 58, y: 42, show: true },
  { x: 34, y: 24, show: true },
  { x: 16, y: 72, show: true },
  { x: -8, y: 58, show: false },
  { x: 112, y: 18, show: false },
  { x: 84, y: 28, show: true },
  { x: 62, y: 78, show: true },
  { x: 38, y: 56, show: true },
  { x: 12, y: 34, show: true },
  { x: -10, y: 18, show: false },
];

export default function GlobalBot() {
  const [step, setStep] = useState(route[0]);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % route.length;
      setStep(route[index]);
    }, 2100);

    return () => window.clearInterval(timer);
  }, []);

  const goContact = () => {
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bot-layer" aria-hidden="false">
      <motion.button
        className={step.show ? "global-bot is-on" : "global-bot"}
        type="button"
        aria-label="Ir a contacto"
        onClick={goContact}
        whileHover={{ filter: "drop-shadow(0 0 18px rgba(192,132,252,.95))" }}
        style={{ "--bot-x": `${step.x}%`, "--bot-y": `${step.y}%` } as CSSProperties}
      >
        <span />
        <i />
      </motion.button>
    </div>
  );
}
