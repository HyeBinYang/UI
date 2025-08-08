import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("Button이 렌더링된다.", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

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

  it("'loading' prop이 true일 때 로딩 아이콘이 렌더링된다.", () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("'loading' prop이 true일 때 버튼이 비활성화된다.", () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByText("Loading Button")).toBeDisabled();
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

  it("'disableRipple' prop이 true일 때 클릭 시 리플 효과가 나타나지 않는다.", () => {
    render(<Button disableRipple>Disable Ripple Button</Button>);
    fireEvent.click(screen.getByText("Disable Ripple Button"));
    expect(screen.queryByTestId("ripple")).not.toBeInTheDocument();
  });
});
