"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (!mounted) return <span className="w-16" />;

  return (
    <button
      onClick={toggle}
      className="text-sm font-mono text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition"
    >
      {dark ? "[ light ]" : "[ dark ]"}
    </button>
  );
}
