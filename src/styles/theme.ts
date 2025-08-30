// Theme configuration
export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
}

export const lightTheme: ThemeColors = {
  primary: "#3b82f6",
  secondary: "#10b981",
  background: "#ffffff",
  text: "#111827",
  border: "#e5e7eb",
};

export const darkTheme: ThemeColors = {
  primary: "#60a5fa",
  secondary: "#34d399",
  background: "#1f2937",
  text: "#f9fafb",
  border: "#4b5563",
};

export const getTheme = (mode: ThemeMode): ThemeColors => {
  return mode === "light" ? lightTheme : darkTheme;
};
