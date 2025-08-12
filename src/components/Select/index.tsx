import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { css } from "@emotion/react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  width?: number;
  options: Option[];
  defaultSelected?: Option;
  placeholder?: string;
  helperText?: {
    text: string;
    color?: string;
  };
  onSelect?: (option: Option) => void;
};

const Select = ({
  width,
  options,
  defaultSelected,
  placeholder = "Select",
  helperText,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState<Option | null>(defaultSelected || null);

  return (
    <div>
      <Dropdown role="combobox">
        <Dropdown.Trigger>
          {(open) => (
            <div
              css={css`
                width: ${width ? `${width}px` : "auto"};
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
                cursor: pointer;
              `}
            >
              <span
                css={css`
                  font-size: 0.875rem;
                  color: ${selected ? "#333" : "#ccc"};
                `}
              >
                {selected?.label || placeholder}
              </span>
              <span
                css={css`
                  width: 1em;
                  height: 1em;
                  margin-right: -0.5rem;
                  transform: rotate(${open ? "180deg" : "0deg"});
                `}
              >
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
              </span>
            </div>
          )}
        </Dropdown.Trigger>
        <Dropdown.List
          as="ul"
          role="listbox"
          css={css`
            width: 100%;
            padding: 0;
            margin: 0;
            border: 1px solid #eeeeee;
            border-radius: 0.25rem;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          `}
        >
          {options.map((option) => {
            const isSelected = option.value === selected?.value;

            return (
              <Dropdown.Item
                key={option.value}
                as="li"
                role="option"
                aria-selected={isSelected}
                css={css`
                  list-style: none;
                  padding: 0.5rem;
                  font-size: 0.875rem;
                  color: #333;
                  background-color: ${isSelected ? "#bdbdbd" : "transparent"};
                  cursor: pointer;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  max-width: 100%;

                  &:hover {
                    background-color: ${isSelected ? "#9e9e9e" : "#f0f0f0"};
                  }
                `}
                onClick={() => {
                  setSelected(option);
                  onSelect?.(option);
                }}
              >
                {option.label}
              </Dropdown.Item>
            );
          })}
        </Dropdown.List>
      </Dropdown>
      {helperText?.text && (
        <p
          css={css`
            margin-top: 4px;
            margin-bottom: 0;
            font-size: 0.8rem;
            color: ${helperText?.color || "#333"};
          `}
        >
          {helperText.text}
        </p>
      )}
    </div>
  );
};

export default Select;
