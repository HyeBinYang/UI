import { css } from "@emotion/react";
import React from "react";

type Props = {
  x: number;
  y: number;
} & React.HTMLAttributes<HTMLSpanElement>;

const Ripple = ({ x, y, ...props }: Props) => {
  return (
    <span
      data-testid="ripple"
      css={css`
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 500px;
        animation: ripple 0.5s linear infinite;
        border-radius: 50%;
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.5;
          }

          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}
      {...props}
    />
  );
};

export default Ripple;
