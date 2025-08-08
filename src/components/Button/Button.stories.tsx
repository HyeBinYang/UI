import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
import { action } from "@storybook/addon-actions";

const Icon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12H19M12 19V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["text", "contained", "outlined"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    leftIcon: {
      control: "select",
      options: ["None", "Icon"],
      mapping: {
        None: null,
        Icon: <Icon />,
      },
      description: "Left icon",
    },
    rightIcon: {
      control: "select",
      options: ["None", "Icon"],
      mapping: {
        None: null,
        Icon: <Icon />,
      },
      description: "Right icon",
    },
    disableRipple: {
      control: { type: "boolean" },
      description: "Disable ripple effect",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: "Button",
    size: "medium",
    variant: "contained",
    bgColor: "blue",
    disableRipple: false,
    onClick: () => {
      action("clicked")();
    },
  },
};
