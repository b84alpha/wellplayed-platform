import React from "react";
export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={"bg-gray-800/60 rounded-2xl " + className} />;
}
export const CardContent = Card; // simple alias for now
