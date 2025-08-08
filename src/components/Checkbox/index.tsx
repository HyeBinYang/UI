import { css } from "@emotion/css";
import React, { ChangeEvent, ReactNode } from "react";

type Props = {
  label?: string;
  labelPlacement?: "end" | "bottom";
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  checkedIcon?: ReactNode;
  onChange?: (checked: boolean) => void;
} & Omit<React.HTMLAttributes<HTMLInputElement>, "onChange">;

const Checkbox = ({
  label,
  labelPlacement = "end",
  checked,
  color,
  disabled,
  size = "medium",
  icon,
  checkedIcon,
  onChange,
  ...inputProps
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event.target.checked);
  };

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
      className={css`
        display: inline-flex;
        align-items: center;
        flex-direction: ${labelPlacement === "bottom" ? "column" : "row"};
        cursor: ${disabled ? "not-allowed" : "pointer"};
        color: ${disabled ? "rgba(0, 0, 0, 0.3)" : color};
      `}
    >
      <span
        className={css`
          position: relative;
          padding: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;

          ${!disabled &&
          css`
            &:hover {
              background-color: rgba(0, 0, 0, 0.04);
            }
          `}

          & > svg {
            width: 1em;
            height: 1em;
          }
        `}
      >
        <input
          type="checkbox"
          checked={checked}
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            cursor: inherit;
            opacity: 0;
          `}
          disabled={disabled}
          onChange={handleChange}
          aria-label={label || undefined}
          {...inputProps}
        />
        {checked ? (
          checkedIcon ? (
            checkedIcon
          ) : (
            <svg
              className={css`
                width: 1em;
                height: 1em;
                fill: currentColor;
                ${sizeStyle[size].svg}
              `}
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
            </svg>
          )
        ) : icon ? (
          icon
        ) : (
          <svg
            className={css`
              width: 1em;
              height: 1em;
              fill: #000;
              ${sizeStyle[size].svg}
            `}
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
          </svg>
        )}
      </span>
      {label && (
        <span
          className={css`
            ${sizeStyle[size].label}
            line-height: 1.5;
            letter-spacing: 0.02em;
            user-select: none;
            color: ${disabled ? "rgba(0, 0, 0, 0.3)" : "#000"};
          `}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
