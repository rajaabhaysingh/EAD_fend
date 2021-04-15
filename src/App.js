import "./App.css";
import "./styles/styles.css";
import "./styles/margins.css";

import React, { useEffect } from "react";
import "date-fns";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import DateUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

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
import Login from "./views/login";
import Signup from "./views/signup";
import VerifyOTP from "./views/signup/VerifyOTP";
import ResendOTP from "./views/signup/ResendOTP";
import ResetPassword from "./views/login/ResetPassword";
import Error404 from "./views/error/Error404";

import PrivateRoute from "./components/HOC/PrivateRoute";

// redux
import { useSelector } from "react-redux";
import { isLocationAvailable, isUserLoggedIn } from "./redux/actions";
import { useDispatch } from "react-redux";

const App = () => {
  // local state management

  const helper = useSelector((state) => state.helper);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn());
    }
    dispatch(isLocationAvailable());
  }, []);

  // theming
  let themeOptions = {
    priLight: "rgba(0,125,0,0.1)",
    error: "#be1e2d",
    warn: "#ee5700",
    teal: "#2accc888",
    hover: "rgba(0,0,0,0.1)",
  };

  if (helper.themeName === "light") {
    themeOptions.type = "light";
    themeOptions.bg = "#fff";
    themeOptions.paperLight = "#ecf0ec";
    themeOptions.primary = "#159947";
    themeOptions.secondary = "#1f5f5b";
    themeOptions.tertiary = "#06373a";
    themeOptions.textPrimary = "#061a23";
    themeOptions.textSecondary = "#697a98";
    themeOptions.textTertiary = "#bfb8d6";
    themeOptions.divider = "#e4e4e4";
    themeOptions.link = "#1f5f5b";
    themeOptions.dark = "#06373a";
  } else {
    themeOptions.type = "dark";
    themeOptions.bg = "#090c09";
    themeOptions.paperLight = "#061a23";
    themeOptions.primary = "#159947";
    themeOptions.secondary = "#1f5f5b";
    themeOptions.tertiary = "#06373a";
    themeOptions.textPrimary = "#faf7fc";
    themeOptions.textSecondary = "#ccc";
    themeOptions.textTertiary = "#bfb8d6";
    themeOptions.divider = "#06373a";
    themeOptions.link = "#1f5f5b";
    themeOptions.dark = "#062229";
  }

  const appTheme = createMuiTheme({
    palette: {
      type: themeOptions.type,
      background: {
        dark: themeOptions.dark,
        bg: themeOptions.bg,
        paper: themeOptions.paperLight,
        paperLight: themeOptions.paperLight,
        paperDark: themeOptions.paperDark,
      },
      action: {
        hover: themeOptions.hover,
      },
      primary: {
        main: themeOptions.primary,
        light: themeOptions.priLight,
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
      error: {
        main: themeOptions.error,
      },
      warning: {
        main: themeOptions.warn,
      },
    },
    shadows,
  });

  return (
    <ThemeProvider theme={appTheme}>
      <MuiPickersUtilsProvider utils={DateUtils}>
        <ToastProvider placement="bottom-center">
          <div className="App">
            <Switch>
              <Route path="/" exact strict component={Home} />
              <Route path="/jobs" component={Jobs} />
              <Route path="/training" component={Training} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/categories" component={Categories} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/verify-email" component={VerifyOTP} />
              <Route path="/resend-otp" component={ResendOTP} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/error404" component={Error404} />
              <PrivateRoute path="/account" component={Account} />
              <Redirect to="/error404" />
            </Switch>
          </div>
        </ToastProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
