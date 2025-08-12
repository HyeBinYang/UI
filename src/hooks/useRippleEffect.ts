import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type RipplePosition = {
  id: string;
  x: number;
  y: number;
};

const useRippleEffect = () => {
  const [ripples, setRipples] = useState<RipplePosition[]>([]);

  const triggerRippleEffect = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleID = uuidv4();
    const newRipple = { id: rippleID, x: e.clientX - rect.left, y: e.clientY - rect.top };

    setRipples([...ripples, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== rippleID));
    }, 500);
  };

  return {
    ripples,
    triggerRippleEffect,
  };
};

export default useRippleEffect;
