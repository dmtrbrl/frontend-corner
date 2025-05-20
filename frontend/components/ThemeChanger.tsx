"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import styles from "./ThemeChanger.module.css";

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme, setTheme } = useTheme();

  const currentTheme = theme !== "system" ? theme : systemTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "🌗";
  }

  return (
    <button
      className={styles.button}
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
    >
      {currentTheme === "light" ? "🌞" : "🌚"}
    </button>
  );
};
