import { InputHTMLAttributes } from "react";

export type TextInputProps = {
  inputID: string;
  label?: string;
  inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;
