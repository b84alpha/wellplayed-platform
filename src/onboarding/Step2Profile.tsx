import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboard } from "@/hooks/useOnboard";

export default function Step2Profile() {
  const [name, setName] = useState("");
  const { save } = useOnboard();
  const nav = useNavigate();

  return (
    <div className="space-y-4 max-w-xs">
      <h2 className="text-xl font-semibold">Choose a display name</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
        placeholder="PlayerOne"
      />
      <button
        disabled={!name}
        onClick={() => {
          save({ name });
          nav("../game");
        }}
        className="bg-primary hover:bg-primary-dark disabled:bg-gray-700 px-4 py-2 rounded w-full"
      >
        Continue
      </button>
    </div>
  );
}
