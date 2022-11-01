import React from "react";
import { ButtonProps } from "./Button.types";

function Button(props: ButtonProps) {
  const { title, buttonClassName, ...rest } = props;
  return (
    <button
      className={`p-2 inline-flex justify-center items-center box-border h-12 w-48 border-4 rounded-md bg-blue-400 text-white ${buttonClassName}`}
      {...rest}
    >
      {title}
    </button>
  );
}

export default Button;
