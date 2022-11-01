import React from "react";
import { TextInputProps } from "./TextInput.types";

function TextInput({ id, inputClassName, ...rest }: TextInputProps) {
  return (
    <input
      name={id}
      id={id}
      className={`p-2 box-border h-12 w-48 border-4 rounded-md border-slate-300 hover:border-slate-400 focus:outline-none appearance-none ${inputClassName}`}
      {...rest}
    />
  );
}

export default TextInput;
