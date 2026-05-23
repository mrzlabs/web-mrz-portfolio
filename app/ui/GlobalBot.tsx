"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BotStep = { x: number; y: number };

const route: BotStep[] = [
  { x: 88, y: 12 },
  { x: 18, y: 22 },
  { x: 72, y: 36 },
  { x: 12, y: 50 },
  { x: 86, y: 60 },
  { x: 22, y: 74 },
  { x: 78, y: 86 },
  { x: 14, y: 94 },
];

export default function GlobalBot() {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % route.length), 3600);
    return () => window.clearInterval(t);
  }, [open]);

  const step = route[idx];

  const goContact = () => {
    setOpen(false);
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bot-layer" aria-hidden="false">
      <div
        className="bot-anchor"
        style={{ "--bot-x": `${step.x}%`, "--bot-y": `${step.y}%` } as CSSProperties}
      >
        <motion.button
          className="global-bot"
          type="button"
          aria-label="Abrir mensaje del bot"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <i className="bot-antenna" />
          <div className="bot-head">
            <span className="bot-eye left" />
            <span className="bot-eye right" />
            <i className="bot-mouth" />
          </div>
          <div className="bot-body">
            <i className="bot-arm left" />
            <i className="bot-arm right" />
            <i className="bot-core" />
          </div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="bot-bubble"
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ duration: 0.28 }}
            >
              <p>Queremos integrar soluciones a tus productos. Déjanos ayudarte.</p>
              <div className="bot-bubble-actions">
                <button type="button" onClick={goContact}>Ponte en contacto</button>
                <button type="button" className="ghost" onClick={() => setOpen(false)}>Cerrar</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}