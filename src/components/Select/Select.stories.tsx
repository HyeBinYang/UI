import { Meta, StoryObj } from "@storybook/react";
import Select from "./index";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: "Option Value 1" },
      { label: "Option 2", value: "Option Value 2" },
      { label: "Option 3", value: "Option Value 3" },
      { label: "Option 4", value: "Option Value 4" },
      { label: "Option 5", value: "Option Value 5" },
      { label: "Option 6", value: "Option Value 6" },
      { label: "Option 7", value: "Option Value 7" },
      { label: "Option 8", value: "Option Value 8" },
      { label: "Option 9", value: "Option Value 9" },
      { label: "Option 10", value: "Option Value 10" },
    ],
    defaultSelected: [{ label: "Option 1", value: "Option Value 1" }],
    helperText: { text: "Helper Text", color: "pink" },
    width: 400,
    multiple: false,
    renderValue: (selected) => {
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {selected.map((option) => (
            <span
              key={option.value}
              style={{
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "16px",
                padding: "4px 8px",
              }}
            >
              {option.label}
            </span>
          ))}
        </div>
      );
    },
    onSelect: (option) => {
      action("onSelect")(option);
    },
  },
};
