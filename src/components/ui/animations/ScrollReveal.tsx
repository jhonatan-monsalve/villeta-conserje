"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
    children,
    width = "100%",
    delay = 0.2,
    direction = "up"
}: ScrollRevealProps) {
    const directions = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: 30, y: 0 },
        right: { x: -30, y: 0 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0
            }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
                duration: 0.5,
                delay: delay * 0.3,
                ease: [0.16, 1, 0.3, 1]
            }}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
}

