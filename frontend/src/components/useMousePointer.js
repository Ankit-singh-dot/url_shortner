import React, { useEffect, useState } from "react";

const useMousePointer = () => {
  const [mousePointer, setMousePointer] = useState({ x: 0, y: 0 });
  const updateMousePosition = (e) => {
    setMousePointer({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  });
  return mousePointer;
};

export default useMousePointer;
