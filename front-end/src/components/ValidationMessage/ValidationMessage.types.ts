import { ReactNode } from "react";

export type ValidationMessageProps = {
  children: ReactNode;
  type: "error" | "success" | "custom";
  className?: string;
};
