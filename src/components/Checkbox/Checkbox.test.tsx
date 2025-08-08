import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Checkbox from "./index";
import "@testing-library/jest-dom";

describe("Checkbox", () => {
  it("체크박스 토글 기능이 정상 작동한다.", () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return <Checkbox checked={checked} onChange={setChecked} />;
    };

    render(<TestComponent />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("체크박스 비활성화 기능이 정상 작동한다.", () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return <Checkbox disabled checked={checked} onChange={setChecked} />;
    };

    render(<TestComponent />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});
