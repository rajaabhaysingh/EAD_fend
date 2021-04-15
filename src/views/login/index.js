import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, Redirect } from "react-router-dom";
import getQueryParams from "../../helpers/getQueryParams";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";
import Loader from "../../components/loader";

// styling
import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Switch,
  Button,
  Hidden,
} from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// icons
import { Visibility, VisibilityOff } from "@material-ui/icons";

// import assets
import LoginImg from "../../assets/img/login.png";
import LoginBg from "../../assets/img/login-bg-light.svg";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginAction, clearSignup, clearAuth } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
  bg: {
    backgroundImage: `url(${LoginBg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100%",
  },
  img: {
    width: "100%",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
  },
  loginBox: {
    borderRadius: "16px",
    boxShadow: "0 0 32px rgba(0,0,0,0.15)",
    padding: "48px",
    boxSizing: "border-box",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: " 24px 16px",
      borderRadius: "0",
      boxShadow: "none",
      margin: "0",
    },
  },
}));

const Login = () => {
  // local state management
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [state, setState] = useState({
    remember_me: true,
  });

  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const signup = useSelector((state) => state.signup);
  const auth = useSelector((state) => state.auth);
  const helper = useSelector((state) => state.helper);
  const dispatch = useDispatch();

  useEffect(() => {
    // clear signup redux store state after signup
    if (signup.state !== "initial") {
      dispatch(clearSignup());
    }
    if (auth.state !== "initial") {
      dispatch(clearAuth());
    }
  }, []);

  // handleChange
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // handleSwitchChange
  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // handleClickShowPassword
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // handleMouseDownPassword
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handleLogin
  const handleLogin = (e) => {
    e.preventDefault();

    // dispatch login action
    dispatch(
      loginAction(
        {
          email: values.email,
          password: values.password,
        },
        state.remember_me
      )
    );
  };

  // preserving target url
  const urlParams = getQueryParams(window.location.search);

  if (auth.authenticated) {
    if (urlParams?.target) {
      return <Redirect to={urlParams.target} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <Page title="Wilswork | Login">
      <div className={cls.root}>
        <Header helper={helper} />
        <div
          className={
            helper.marginTop
              ? clsx(globalCls.bodyRoot, globalCls.bodyRootTransform)
              : globalCls.bodyRoot
          }
        >
          <Grid container className={clsx("justc", cls.bg)}>
            <Grid
              item
              xs={false}
              sm={false}
              md={6}
              lg={6}
              xl={7}
              className="fc"
            >
              <Hidden smDown>
                <img className={cls.img} src={LoginImg} alt="" />
              </Hidden>
            </Grid>
            <Grid item xs={12} sm={10} md={5} lg={4} xl={3} className="fc">
              <div className={clsx(cls.loginBox, "w-100", "fcol")}>
                <div className={clsx(globalCls.txtMdSec, "fwb")}>
                  Hello again,
                </div>
                <div className={clsx(globalCls.txtLgPriCol, "mar_t-8", "fwb")}>
                  Welcome back
                </div>
                <div className={clsx(globalCls.txtSmSec, "mar_t-8")}>
                  Please login to continue.
                </div>
                <form className="fcol mar_t-32" onSubmit={handleLogin}>
                  <TextField
                    label="Username/Email"
                    variant="outlined"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    fullWidth
                  />
                  <FormControl
                    className={clsx(globalCls.marT16)}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      labelWidth={70}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {auth.error ? (
                    <Alert
                      className="mar_t-16"
                      variant="standard"
                      severity="error"
                    >
                      {auth.error}
                    </Alert>
                  ) : null}
                  <div className="fcbw bb fsm mar_t-16">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.remember_me}
                          onChange={handleSwitchChange}
                          name="remember_me"
                          color="primary"
                        />
                      }
                      className={globalCls.txtMdSec}
                      label="Remember me"
                    />
                    <Link className={globalCls.link} to="/reset-password">
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    className={clsx(globalCls.marT32)}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={auth.loading}
                  >
                    Login
                  </Button>
                  <div className={clsx("fcc fsm mar_t-32", globalCls.txtMdSec)}>
                    Don't have an account?{" "}
                    <Link
                      className={clsx(globalCls.link, "mar_l-8")}
                      to="/signup"
                    >
                      <strong>Signup now!</strong>
                    </Link>
                  </div>
                  <div className="fcbw mar_t-32 fss">
                    <Link
                      className={clsx(globalCls.marLR_4, globalCls.link)}
                      to="/verify-email"
                    >
                      Verify account
                    </Link>
                    <Link
                      className={clsx(globalCls.marLR_4, globalCls.link)}
                      to="/terms"
                    >
                      Terms and Conditions
                    </Link>
                    <Link
                      className={clsx(globalCls.marLR_4, globalCls.link)}
                      to="/help"
                    >
                      Help section
                    </Link>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
        {auth.loading && <Loader />}
      </div>
    </Page>
  );
};

export default Login;
