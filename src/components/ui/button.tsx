import React from "react";
export function Button({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "bg-primary hover:bg-primary-dark text-white rounded-md px-4 py-2 " +
        className
      }
    />
  );
}
