import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 16, // Half of the circle's width
        y: mousePosition.y - 16, // Half of the circle's height
      }}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 200,
        mass: 0.3,
      }}
    >
      <div className="w-4 h-4 rounded-full bg-white/20 backdrop-blur-sm" />
    </motion.div>
  );
} 