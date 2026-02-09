"use client";

import { motion } from "framer-motion";

type AnimateOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function AnimateOnScroll({ children, className = "", delay = 0 }: AnimateOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
