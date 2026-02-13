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
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { x: 60, y: 0 },
        right: { x: -60, y: 0 },
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
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: delay * 0.5,
                ease: [0.16, 1, 0.3, 1]
            }}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
}
