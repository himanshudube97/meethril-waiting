"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Wordmark({ children }: { children: ReactNode }) {
  return (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-serif)",
        color: "var(--text-primary)",
        letterSpacing: "0.18em",
        fontWeight: 500,
      }}
      className="text-5xl sm:text-7xl md:text-8xl"
    >
      {children}
    </motion.h1>
  );
}

export function Tagline({ children }: { children: ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--text-secondary)",
        fontStyle: "italic",
      }}
      className="mt-6 text-lg sm:text-xl md:text-2xl"
    >
      {children}
    </motion.p>
  );
}

export function ComingSoon({ children }: { children: ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--text-muted)",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
      }}
      className="mt-4 text-xs sm:text-sm"
    >
      {children}
    </motion.p>
  );
}

export function FormReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.9, duration: 0.6, ease: "easeOut" }}
      className="mt-12 w-full max-w-md"
    >
      {children}
    </motion.div>
  );
}
