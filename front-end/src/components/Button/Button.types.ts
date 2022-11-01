import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  title: string;
  buttonClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
