import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";
import Loader from "../../components/loader";
import VerifyPwdReset from "./VerifyPwdReset";

// styling
import { Grid, makeStyles, TextField, Button, Hidden } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// icons

// import assets
import VerImg from "../../assets/img/resend_otp.svg";
import Success from "../../assets/img/success.svg";
import LoginBg from "../../assets/img/login-bg-light.svg";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearAuth, clearSignup, sendResetPwdLink } from "../../redux/actions";

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
  success: {
    width: "120px",
    marginTop: "32px",
  },
}));

const ResetPassword = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const signup = useSelector((state) => state.signup);
  const auth = useSelector((state) => state.auth);
  const helper = useSelector((state) => state.helper);
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  // local state management
  const [values, setValues] = useState({
    email: "",
    hideInputAndShowSuccess: false,
  });

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

  // handlePwdResetLinkSend
  const handlePwdResetLinkSend = (e) => {
    e.preventDefault();

    // dispatch verify action
    dispatch(
      sendResetPwdLink({
        email: values.email,
      })
    );
  };

  // renderInputOrSuccess
  const renderInputOrSuccess = () => {
    if (auth.sendResetPwdLinkSuccess) {
      return (
        <div className="mar-auto fccc pad-16">
          <div className={clsx(globalCls.txtLgPriCol, "mar_t-8", "fwb")}>
            Forgot password?
          </div>
          <img src={Success} className={cls.success} alt="" />
          <div className={clsx("mar_t-24 fwb", globalCls.txtMdPriCol)}>
            {auth.sendResetPwdLinkData}
          </div>
          <div className={clsx("mar_t-8", globalCls.txtSmSec)}>
            Please check your inbox for password reset link. If you do not find
            it please check it in spam folder too.
          </div>
        </div>
      );
    } else {
      return (
        <div className={clsx(cls.loginBox, "w-100", "fcol")}>
          <div className={clsx(globalCls.txtMdSec, "fwb")}>Hello,</div>
          <div className={clsx(globalCls.txtLgPriCol, "mar_t-8", "fwb")}>
            Forgot password?
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-8")}>
            Enter email-id associated with your account. Password reset link
            will be send to following email-id:
          </div>
          <form className="fcol mar_t-32" onSubmit={handlePwdResetLinkSend}>
            <TextField
              className={globalCls.marT16}
              type="email"
              label="Email ID"
              variant="outlined"
              fullWidth
              value={values.email}
              onChange={handleChange("email")}
            />
            {auth.sendResetPwdLinkError ? (
              <Alert className="mar_t-16" variant="standard" severity="error">
                {auth.sendResetPwdLinkError}
              </Alert>
            ) : null}
            <Button
              className={clsx(globalCls.marT32)}
              variant="contained"
              color="primary"
              type="submit"
              disabled={auth.sendResetPwdLinkLoading}
            >
              RESET PASSWORD
            </Button>
            <div className={clsx("fcc fsm mar_t-32", globalCls.txtMdSec)}>
              Don't have an account?{" "}
              <Link className={clsx(globalCls.link, "mar_l-8")} to="/signup">
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
      );
    }
  };

  return (
    <Page title="Wilswork | Resend OTP">
      <Switch>
        <Route path={path} exact>
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
                    <img className={cls.img} src={VerImg} alt="" />
                  </Hidden>
                </Grid>
                <Grid item xs={12} sm={10} md={5} lg={4} xl={3} className="fc">
                  {renderInputOrSuccess()}
                </Grid>
              </Grid>
            </div>
            {auth.sendResetPwdLinkLoading && <Loader />}
          </div>
        </Route>
        <Route path={`${path}/:userId`}>
          <VerifyPwdReset />
        </Route>
      </Switch>
    </Page>
  );
};

export default ResetPassword;
