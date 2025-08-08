import React, { forwardRef } from "react";
import { css } from "@emotion/css";
import useRippleEffect from "../../hooks/useRippleEffect";

type Props = {
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      size = "medium",
      variant = "contained",
      bgColor = "#000",
      textColor = "#fff",
      children,
      disabled,
      onClick,
      ...buttonAttributes
    }: Props,
    ref
  ) => {
    const { ripples, triggerRippleEffect } = useRippleEffect();

    const sizeStyles = {
      small: css`
        height: 24px;
        padding: 4px 8px;
        font-size: 12px;
      `,
      medium: css`
        height: 32px;
        padding: 8px 16px;
        font-size: 16px;
      `,
      large: css`
        height: 40px;
        padding: 12px 24px;
        font-size: 20px;
      `,
    };

    const variantStyles = {
      text: css`
        background-color: transparent;
        color: ${bgColor};
      `,
      contained: css`
        background-color: ${bgColor};
        color: ${textColor};
      `,
      outlined: css`
        background-color: transparent;
        color: ${bgColor};
        border: 1px solid ${bgColor};
      `,
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      triggerRippleEffect(e);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${bgColor};
          color: ${textColor};
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
          &:disabled {
            cursor: not-allowed;
          }
          ${sizeStyles[size]}
          ${variantStyles[variant]}
        `}
        disabled={disabled}
        onClick={handleClick}
        {...buttonAttributes}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={css`
              position: absolute;
              top: ${ripple.y}px;
              left: ${ripple.x}px;
              transform: translate(-50%, -50%);
              width: 500px;
              height: 500px;
              background-color: ${variant === "contained" ? "#fff" : bgColor};
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
          />
        ))}
        <span
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: ${variant === "contained" ? "#000" : bgColor};
            border-radius: 4px;
            opacity: 0;
            transition: all 0.3s ease;
            &:hover {
              opacity: ${disabled ? 0 : 0.22};
            }
          `}
        />
        {children}
      </button>
    );
  }
);

export default Button;
