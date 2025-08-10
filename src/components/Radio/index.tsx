import React from "react";
import { css } from "@emotion/react";

type Props = {
  checked?: boolean;
  label?: string;
  labelPlacement?: "end" | "bottom";
  color?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onChecked?: () => void;
} & React.HTMLAttributes<HTMLInputElement>;

const Radio = ({
  checked = false,
  label,
  labelPlacement = "end",
  color = "#000",
  size = "medium",
  disabled,
  onChecked,
  ...inputProps
}: Props) => {
  const sizeStyle = {
    small: {
      label: css`
        font-size: 0.875rem;
      `,
      svg: css`
        font-size: 1rem;
      `,
    },
    medium: {
      label: css`
        font-size: 1rem;
      `,
      svg: css`
        font-size: 1.5rem;
      `,
    },
    large: {
      label: css`
        font-size: 1.25rem;
      `,
      svg: css`
        font-size: 2rem;
      `,
    },
  };

  return (
    <label
      css={css`
        display: inline-flex;
        align-items: center;
        flex-direction: ${labelPlacement === "bottom" ? "column" : "row"};
        cursor: ${disabled ? "not-allowed" : "pointer"};
        color: ${disabled ? "rgba(0, 0, 0, 0.3)" : color};

        ${!disabled &&
        css`
          &:hover > .rbn-radio {
            background-color: rgba(0, 0, 0, 0.04);
          }
        `}
      `}
    >
      <span
        className="rbn-radio"
        css={css`
          position: relative;
          padding: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;

          & > svg {
            width: 1em;
            height: 1em;
          }
        `}
      >
        <input
          {...inputProps}
          type="radio"
          checked={checked}
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            cursor: inherit;
            opacity: 0;
          `}
          onChange={disabled ? undefined : onChecked}
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          css={css`
            fill: currentColor;
            ${sizeStyle[size].svg}
          `}
        >
          {checked ? (
            <>
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="white" />
              <circle cx="10" cy="10" r="5" fill="currentColor" />
            </>
          ) : (
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke={disabled ? "rgba(0, 0, 0, 0.3)" : " #6B7280"}
              strokeWidth="2"
              fill="white"
            />
          )}
        </svg>
      </span>
      {label && (
        <span
          css={css`
            line-height: 1.5;
            letter-spacing: 0.02em;
            user-select: none;
            color: ${disabled ? "rgba(0, 0, 0, 0.3)" : "#000"};
            ${sizeStyle[size].label}
          `}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Radio;
