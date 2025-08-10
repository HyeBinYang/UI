import { css } from "@emotion/react";
import React, { Children, cloneElement } from "react";

type Props = {
  label?: string;
  defaultValue?: string;
  children?: React.ReactNode;
  row?: boolean;
  color?: string;
  size?: "small" | "medium" | "large";
  onChange?: (value: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const RadioGroup = ({
  label,
  children,
  defaultValue,
  row,
  color = "#000",
  size = "medium",
  onChange,
  ...props
}: Props) => {
  const [value, setValue] = React.useState(defaultValue ?? "");

  return (
    <div>
      {label && (
        <label
          css={css`
            font-size: 16px;
            line-height: 1.5;
            letter-spacing: 0.01em;
          `}
        >
          {label}
        </label>
      )}
      <div
        {...props}
        css={css`
          display: flex;
          flex-direction: ${row ? "row" : "column"};
          gap: 10px;
        `}
      >
        {Children.map(children, (child) =>
          cloneElement(child as React.ReactElement, {
            value,
            checked: value === (child as React.ReactElement).props.value,
            color: (child as React.ReactElement).props.color ?? color,
            size: (child as React.ReactElement).props.size ?? size,
            onChecked: () => {
              setValue((child as React.ReactElement).props.value);
              onChange?.((child as React.ReactElement).props.value);
            },
          })
        )}
      </div>
    </div>
  );
};

export default RadioGroup;
