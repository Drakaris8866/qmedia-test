import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children?: React.ReactNode | string; outlined?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  outlined,
  ...props
}) => {
  return (
    <button {...props }className={`button ${outlined ? "button-outlined" : ""}`}>
      <span>{children}</span>
    </button>
  );
};
