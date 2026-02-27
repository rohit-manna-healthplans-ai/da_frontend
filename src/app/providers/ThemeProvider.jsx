import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/**
 * Real Light/Dark theme support
 * - MUI theme switches
 * - Full page switches via CSS variables (index.css) using `data-theme` on <html>
 */

const STORAGE_KEY = "iw_theme_mode";

const ThemeModeContext = createContext({
  mode: "dark",
  toggleMode: () => {},
  setMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

function buildTheme(mode) {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      // Palette aligned with the provided brand sheets
      primary: { main: dark ? "#4FD1DD" : "#38B6C1" },
      secondary: { main: dark ? "#2CB1BC" : "#2B98A2" },
      success: { main: "#22c55e" },
      warning: { main: "#f59e0b" },
      error: { main: "#ff6b6b" },
      background: {
        // Primary/secondary backgrounds
        default: dark ? "#003366" : "#A3CEF2",
        paper: dark ? "#183845" : "#BEEBFF",
      },
      text: {
        primary: dark ? "#F3F8FB" : "#111827",
        secondary: dark ? "#B7C8D2" : "rgba(17,24,39,0.72)",
      },
      divider: dark ? "rgba(247,250,252,0.10)" : "rgba(15,23,42,0.12)",
    },
    // Less bubble-like rounding
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial"].join(","),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: dark ? "#050810" : "#F6F8FB",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            fontWeight: 800,
          },
        },
      },
    },
  });
}

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") setMode(saved);
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (_) {}

    // THIS is what makes full screen light/dark
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const ctx = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    }),
    [mode]
  );

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={ctx}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
