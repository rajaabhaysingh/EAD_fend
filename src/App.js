import "./App.css";
import "./styles/styles.css";
import "./styles/margins.css";

import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

// mui
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import shadows from "./components/mui/shadows";

// routes
import Home from "./views/home";

// redux
import { useSelector } from "react-redux";

const App = () => {
  // local state management

  const helper = useSelector((state) => state.helper);

  // theming
  let themeOptions = {};

  if (helper.themeName === "light") {
    themeOptions.type = "light";
    themeOptions.bg = "#fff";
    themeOptions.paperLight = "#faf7fc";
    themeOptions.paperDark = "#eee";
    themeOptions.primary = "#159947";
    themeOptions.secondary = "#1f5f5b";
    themeOptions.tertiary = "#06373a";
    themeOptions.teal = "#2accc8";
    themeOptions.textPrimary = "#061a23";
    themeOptions.textSecondary = "#697a98";
    themeOptions.textTertiary = "#bfb8d6";
    themeOptions.hover = "#ddd";
    themeOptions.divider = "#ddd";
    themeOptions.link = "#1f5f5b";
  } else {
    themeOptions.type = "dark";
    themeOptions.bg = "#061a23";
    themeOptions.paperLight = "#06373a";
    themeOptions.paperDark = "#111111";
    themeOptions.primary = "#159947";
    themeOptions.secondary = "#1f5f5b";
    themeOptions.tertiary = "#06373a";
    themeOptions.teal = "#2accc8";
    themeOptions.textPrimary = "#faf7fc";
    themeOptions.textSecondary = "#ccc";
    themeOptions.textTertiary = "#bfb8d6";
    themeOptions.hover = "#111";
    themeOptions.divider = "#ddd";
    themeOptions.link = "#1f5f5b";
  }

  const appTheme = createMuiTheme({
    palette: {
      type: themeOptions.type,
      background: {
        bg: themeOptions.bg,
        paperLight: themeOptions.paperLight,
        paperDark: themeOptions.paperDark,
      },
      action: {
        hover: themeOptions.hover,
      },
      primary: {
        main: themeOptions.primary,
      },
      secondary: {
        main: themeOptions.secondary,
      },
      tertiary: {
        main: themeOptions.tertiary,
      },
      text: {
        primary: themeOptions.textPrimary,
        secondary: themeOptions.textSecondary,
        tertiary: themeOptions.textTertiary,
        link: themeOptions.link,
        white: "#fff",
      },
      divider: themeOptions.divider,
      teal: themeOptions.teal,
    },
    shadows,
  });

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home helper={helper} />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
