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
  defaultSelected?: Option[];
  placeholder?: string;
  helperText?: {
    text: string;
    color?: string;
  };
  multiple?: boolean;
  renderValue?: (selected: Option[]) => React.ReactNode;
  onSelect?: (option: Option) => void;
};

const Select = ({
  width,
  options,
  defaultSelected = [],
  placeholder = "Select",
  helperText,
  multiple = false,
  renderValue,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState<Option[]>(defaultSelected);

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
                padding-right: 1.75rem;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
                cursor: pointer;
                user-select: none;
              `}
            >
              <div
                css={css`
                  width: 100%;
                `}
              >
                {selected.length > 0 ? (
                  renderValue ? (
                    renderValue(selected)
                  ) : (
                    <div
                      css={css`
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      `}
                    >
                      {selected.map((option) => option.label).join(", ")}
                    </div>
                  )
                ) : (
                  <span>{placeholder}</span>
                )}
              </div>
              <span
                css={css`
                  position: absolute;
                  right: 20px;
                  z-index: 1;
                  width: 1em;
                  height: 1em;
                  margin-right: -0.6rem;
                  transform: rotate(${open ? "180deg" : "0deg"});
                  background-color: #fff;
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
            const isSelected = selected.some(
              (selectedOption) => selectedOption.value === option.value
            );

            const handleClick = (e: React.MouseEvent<HTMLElement>) => {
              setSelected((prev) => {
                if (multiple) {
                  if (prev.some((selectedOption) => selectedOption.value === option.value)) {
                    return prev.filter((selectedOption) => selectedOption.value !== option.value);
                  }

                  return [...prev, option];
                }
                return [option];
              });
              onSelect?.(option);
            };

            return (
              <Dropdown.Item
                key={option.value}
                as="li"
                role="option"
                aria-selected={isSelected}
                closeOnClick={!multiple}
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
                onClick={handleClick}
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
