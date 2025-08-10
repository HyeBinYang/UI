import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Radio from "./index";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    labelPlacement: {
      control: "select",
      options: ["end", "bottom"],
    },
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
      action("checked")();
      setChecked(!checked);
    };

    return <Radio {...args} checked={checked} value={args.label} onChecked={handleChecked} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: "Radio",
    color: "pink",
  },
};
