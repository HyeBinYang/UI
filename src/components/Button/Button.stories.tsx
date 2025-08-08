import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
import { action } from "@storybook/addon-actions";

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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    size: "medium",
    variant: "contained",
    bgColor: "blue",
    onClick: () => {
      action("clicked")();
    },
  },
};
