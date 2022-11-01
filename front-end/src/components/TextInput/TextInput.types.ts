import { InputHTMLAttributes } from "react";

export type TextInputProps = {
  id: string;
  inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;
