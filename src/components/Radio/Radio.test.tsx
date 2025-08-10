import React, { useState } from "react";
import Radio from "./index";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Radio", () => {
  it("라디오 버튼이 클릭되면 체크된 상태로 변경된다.", () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return <Radio checked={checked} onChecked={() => setChecked(true)} />;
    };

    render(<TestComponent />);

    fireEvent.click(screen.getByRole("radio"));
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("라디오 버튼이 비활성화되면 클릭되지 않는다.", () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return <Radio checked={checked} onChecked={() => setChecked(true)} disabled />;
    };

    render(<TestComponent />);

    fireEvent.click(screen.getByRole("radio"));
    expect(screen.getByRole("radio")).not.toBeChecked();
  });
});
