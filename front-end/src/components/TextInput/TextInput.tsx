import React from "react";
import { TextInputProps } from "./TextInput.types";

function TextInput({
  inputID,
  label,
  inputClassName,
  ...rest
}: TextInputProps) {
  return (
    <>
      <label htmlFor={inputID}>{!!label ? label : null}</label>
      <input
        id={inputID}
        name={inputID}
        aria-label={inputID}
        aria-required="true"
        className={`p-2 box-border h-12 w-48 border-4 rounded-md border-slate-300 hover:border-slate-400 appearance-none ${inputClassName}`}
        {...rest}
      />
    </>
  );
}

export default TextInput;
