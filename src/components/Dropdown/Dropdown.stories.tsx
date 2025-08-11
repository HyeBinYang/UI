import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./index";
import Button from "../Button";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    openDirection: {
      control: {
        type: "select",
        options: ["top", "right", "bottom", "left"],
      },
    },
    triggerOnHover: {
      control: {
        type: "boolean",
      },
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Dropdown {...args}>
          <Dropdown.Trigger>
            {(open) => (
              <Button color="pink" disableRipple>
                DropdownTrigger {open ? "open" : "close"}
              </Button>
            )}
          </Dropdown.Trigger>
          <Dropdown.List>
            <div
              style={{
                width: "160px",
                marginBottom: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: "#fff",
              }}
              role="menu"
            >
              <Dropdown.Item role="menuitem" onClick={() => action("DropdownItem 1")()}>
                <div>DropdownItem 1</div>
              </Dropdown.Item>
              <Dropdown.Item role="menuitem" onClick={() => action("DropdownItem 2")()}>
                <div>DropdownItem 2</div>
              </Dropdown.Item>
              <Dropdown.Item role="menuitem">
                <div onClick={() => action("DropdownItem 3")()}>DropdownItem 3</div>
              </Dropdown.Item>
            </div>
          </Dropdown.List>
        </Dropdown>
        <h1>qweqwewq</h1>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    openDirection: "bottom",
  },
};
