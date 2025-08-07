import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText("Disabled Button")).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByText("Custom Button")).toHaveClass("custom-class");
  });
});
