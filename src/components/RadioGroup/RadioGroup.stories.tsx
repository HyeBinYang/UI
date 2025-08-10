import React from "react";
import RadioGroup from "./index";
import { Meta, StoryObj } from "@storybook/react";
import Radio from "../Radio";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    row: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
  render: (args) => {
    return (
      <RadioGroup {...args} defaultValue="1" onChange={(value) => action("onChange")(value)}>
        <Radio value="value 1" label="Option 1" />
        <Radio value="value 2" label="Option 2" />
        <Radio value="value 3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select an option",
    color: "skyblue",
  },
};
