"use client";

import { motion } from "framer-motion";

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="initialState"
    transition={{
      duration: 0.5,
    }}
    animate="animateState"
    exit="exitState"
    variants={{
      initialState: {
        opacity: 0,
      },
      animateState: {
        opacity: 1,
      },
      exitState: {
        opacity: 0,
      },
    }}
    className="base-page-size">
    {children}
  </motion.div>
);
