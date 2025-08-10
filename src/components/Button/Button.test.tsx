import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("Click시 onClick 함수가 호출된다.", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("'disabled' prop이 true일 때 버튼이 비활성화된다.", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText("Disabled Button")).toBeDisabled();
  });

  it("'loading' prop이 true일 때 버튼이 클릭되지 않는다.", () => {
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading Button
      </Button>
    );
    fireEvent.click(screen.getByText("Loading Button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
