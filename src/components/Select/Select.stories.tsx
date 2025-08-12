import { Meta, StoryObj } from "@storybook/react";
import Select from "./index";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: "Option Value 1" },
      { label: "Option 2", value: "Option Value 2" },
      { label: "Option 3", value: "Option Value 3" },
    ],
    defaultSelected: { label: "Option 1", value: "Option Value 1" },
    helperText: { text: "Helper Text", color: "pink" },
    onSelect: (option) => {
      action("onSelect")(option);
    },
  },
};
