import React, { createContext, useContext, useState } from "react";
import { css } from "@emotion/react";

type DropdownListPosition = "top" | "right" | "bottom" | "left";

type DropdownState = {
  open: boolean;
  openDirection?: DropdownListPosition;
  triggerOnHover?: boolean;
  closeOnBlur?: boolean;
  closeDropdownList: () => void;
  openDropdownList: () => void;
};

const DropdownContext = createContext<DropdownState | null>(null);

type DropdownProps = {
  children: React.ReactNode;
  openDirection?: DropdownListPosition;
  triggerOnHover?: boolean;
  closeOnBlur?: boolean;
  closeOnSelect?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Dropdown = ({
  children,
  openDirection = "bottom",
  triggerOnHover = false,
  closeOnBlur = true,
  closeOnSelect = true,
  ...props
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const openDropdownList = () => {
    setOpen(true);
  };

  const closeDropdownList = () => {
    setOpen(false);
  };

  const handlePointerEnter = () => {
    if (triggerOnHover) openDropdownList();
  };

  const handlePointerLeave = () => {
    if (triggerOnHover) closeDropdownList();
  };

  const handleBlur = () => {
    closeDropdownList();
  };

  return (
    <DropdownContext.Provider
      value={{ open, openDirection, triggerOnHover, closeDropdownList, openDropdownList }}
    >
      <div
        {...props}
        css={css`
          position: relative;
          display: inline-block;
        `}
        aria-expanded={open}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onBlur={closeOnBlur ? handleBlur : undefined}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = ({
  children,
}: {
  children: ((open: boolean) => React.ReactNode) | React.ReactNode;
}) => {
  const context = useContext(DropdownContext);

  if (!context) throw new Error("Dropdown 내부에서 사용해야 합니다.");

  const { open, openDropdownList, closeDropdownList } = context;

  const handleClick = () => {
    open ? closeDropdownList() : openDropdownList();
  };

  return (
    <div
      css={css`
        display: inline-block;
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      {typeof children === "function" ? children(open) : children}
    </div>
  );
};

const DropdownList = ({
  children,
  as: Tag = "div",
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const context = useContext(DropdownContext);

  if (!context) throw new Error("Dropdown 내부에서 사용해야 합니다.");

  const { open, openDirection } = context;

  if (!open) return null;

  const getPosition = () => {
    switch (openDirection) {
      case "top":
        return "bottom: 100%; left: 50%; transform: translateX(-50%);";
      case "right":
        return "left: 100%; top: 50%; transform: translateY(-50%);";
      case "bottom":
        return "top: 100%; left: 50%; transform: translateX(-50%);";
      case "left":
        return "right: 100%; top: 50%; transform: translateY(-50%);";
    }
  };

  return (
    <Tag
      {...props}
      css={css`
        position: absolute;
        ${getPosition()}
        z-index: 1000;
      `}
    >
      {children}
    </Tag>
  );
};

const DropdownItem = ({
  children,
  as: Tag = "div",
  closeOnClick = true,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  closeOnClick?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
} & React.HTMLAttributes<HTMLElement>) => {
  const context = useContext(DropdownContext);

  if (!context) throw new Error("Dropdown 내부에서 사용해야 합니다.");

  const { closeDropdownList } = context;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e);
    if (closeOnClick) closeDropdownList();
  };

  return (
    <Tag
      {...props}
      onClick={handleClick}
      onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
    >
      {children}
    </Tag>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
