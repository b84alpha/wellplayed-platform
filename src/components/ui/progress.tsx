import React from "react";
export function Progress({ value = 0 }: { value: number }) {
  return (
    <div className="w-full h-2 bg-gray-700 rounded">
      <div
        className="h-full bg-primary rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
