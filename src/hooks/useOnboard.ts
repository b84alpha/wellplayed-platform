import { useState, useEffect } from "react";

export interface OnboardData {
  name?: string;
  mainGame?: string;
  team?: string;
  completed?: boolean;
}

const KEY = "wp_onboard";

function load(): OnboardData {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useOnboard() {
  const [data, setData] = useState<OnboardData>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  function save(part: Partial<OnboardData>) {
    setData((p) => ({ ...p, ...part }));
  }

  return { data, save };
}
