import React from "react";
import { useState } from "react";
import useMousePointer from "./useMousePointer.js";
import { motion } from "framer-motion";

const MousePointer = () => {
  const { x, y } = useMousePointer();
  return (
    <div>
      <motion.div
        className="w-5 h-5 bg-black fixed rounded-full pointer-events-none z-[9999]"
        animate={{ x: x - 10, y: y - 10 }}
        transition={{ type: "spring", stiffness: 500, damping: 50 }}
      >
    
      </motion.div>
    </div>
  );
};

export default MousePointer;
