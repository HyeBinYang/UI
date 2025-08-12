import React, { forwardRef } from "react";
import { css } from "@emotion/react";
import useRippleEffect from "../../hooks/useRippleEffect";
import Ripple from "../Ripple";

type Props = {
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  color?: string;
  children: React.ReactNode;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disableRipple?: boolean;
  loading?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type LoaderProps = {
  color?: string;
};

const Loader = ({ color }: LoaderProps) => {
  return (
    <span
      data-testid="loader"
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
      `}
    >
      <span
        css={css`
          display: inline-block;
          width: 1em;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 2px solid ${color};
          animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;

          @keyframes l20-1 {
            0% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
            }
            12.5% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
            }
            25% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
            }
            50% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
            }
            62.5% {
              clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
            }
            75% {
              clip-path: polygon(
                50% 50%,
                100% 100%,
                100% 100%,
                100% 100%,
                100% 100%,
                50% 100%,
                0% 100%
              );
            }
            100% {
              clip-path: polygon(
                50% 50%,
                50% 100%,
                50% 100%,
                50% 100%,
                50% 100%,
                50% 100%,
                0% 100%
              );
            }
          }
          @keyframes l20-2 {
            0% {
              transform: scaleY(1) rotate(0deg);
            }
            49.99% {
              transform: scaleY(1) rotate(135deg);
            }
            50% {
              transform: scaleY(-1) rotate(0deg);
            }
            100% {
              transform: scaleY(-1) rotate(-135deg);
            }
          }
        `}
      ></span>
    </span>
  );
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      size = "medium",
      variant = "contained",
      color = "#000",
      children,
      disabled,
      leftIcon,
      rightIcon,
      disableRipple = false,
      loading = false,
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
        color: ${loading ? "transparent" : color};
      `,
      contained: css`
        background-color: ${color};
        color: ${loading ? "transparent" : "#fff"};
      `,
      outlined: css`
        background-color: transpar0ent;
        color: ${loading ? "transparent" : color};
        border: 1px solid ${color};
      `,
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (!disableRipple && !loading) {
        triggerRippleEffect(e);
      }
      onClick?.(e);
    };

    return (
      <button
        {...buttonAttributes}
        ref={ref}
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          overflow: hidden;
          cursor: ${disabled ? "not-allowed" : loading ? "default" : "pointer"};
          ${sizeStyles[size]}
          ${variantStyles[variant]}
        `}
        disabled={disabled || loading}
        onClick={handleClick}
      >
        {ripples.map((ripple) => (
          <Ripple
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            css={css`
              background-color: ${variant === "contained" ? "#fff" : color};
            `}
          />
        ))}
        <span
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: ${variant === "contained" ? "#000" : color};
            border-radius: 4px;
            opacity: 0;
            transition: all 0.3s ease;

            ${!loading &&
            !disabled &&
            css`
              &:hover {
                opacity: 0.22;
              }
            `}
          `}
        />
        {loading && <Loader color={variant === "contained" ? "#fff" : color} />}
        {leftIcon && (
          <span
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 8px;
              margin-left: -4px;
            `}
          >
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 8px;
              margin-right: -4px;
            `}
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

export default Button;
