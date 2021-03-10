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
import Jobs from "./views/jobs";
import Training from "./views/training";
import Contact from "./views/contact";
import About from "./views/about";
import Account from "./views/account";
import Categories from "./views/categories";

import PrivateRoute from "./components/HOC/PrivateRoute";

// redux
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

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
    themeOptions.divider = "#06373a";
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
          <Route path="/" exact strict>
            <Home />
          </Route>
          <Route path="/jobs">
            <Jobs />
          </Route>
          <Route path="/training">
            <Training />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/login">This is login page</Route>
          <Route path="/signup">This is signup page</Route>
          <Route path="/error404">Page not found [404]</Route>
          <PrivateRoute>
            <Account />
          </PrivateRoute>
          <Redirect to="/error404" />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
