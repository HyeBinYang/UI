import type { Meta, StoryObj } from "@storybook/react";
import Card from "./index";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a simple card component with some content.",
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: "This card has a title and some content.",
  },
};

export const LongContent: Story = {
  args: {
    title: "Card with Long Content",
    children:
      "This card contains a longer piece of content to demonstrate how the card component handles more text. It should wrap properly and maintain good spacing.",
  },
};
