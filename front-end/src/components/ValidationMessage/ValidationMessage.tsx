import React from "react";
import { ValidationMessageProps } from "./ValidationMessage.types";

function ValidationMessage({
  children,
  className,
  type,
}: ValidationMessageProps) {
  const textColor =
    type === "custom"
      ? "text-gray-600"
      : type === "error"
      ? "text-red-500"
      : "text-green-500";
  return <p className={`text-sm ${textColor} ${className}`}>{children}</p>;
}

export default ValidationMessage;
