import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, Redirect, useParams } from "react-router-dom";
import getQueryParams from "../../helpers/getQueryParams";
import { useToasts } from "react-toast-notifications";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";
import Loader from "../../components/loader";

// styling
import {
  Grid,
  makeStyles,
  Button,
  Hidden,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// icons
import { Visibility, VisibilityOff } from "@material-ui/icons";

// import assets
import VerImg from "../../assets/img/verify_otp.svg";
import LoginBg from "../../assets/img/login-bg-light.svg";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearAuth, clearSignup, verifyResetPwd } from "../../redux/actions";

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

const VerifyPwdReset = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const signup = useSelector((state) => state.signup);
  const auth = useSelector((state) => state.auth);
  const helper = useSelector((state) => state.helper);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { userId } = useParams();

  // getting url params
  const urlParams = getQueryParams(window.location.search);

  // local state management
  const [values, setValues] = useState({
    userId: userId,
    token: urlParams.token,
    password: "",
    passwordConfirm: "",
    showPassword: false,
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

  // handleClickShowPassword
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // handleMouseDownPassword
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handleOTPVerify
  const handleOTPVerify = (e) => {
    e.preventDefault();

    // dispatch verify action
    dispatch(
      verifyResetPwd({
        userId: values.userId,
        resetToken: values.token,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      })
    );
  };

  if (auth.verifyResetPwdSuccess) {
    addToast(auth.verifyResetPwdData, {
      appearance: "success",
      autoDismiss: true,
    });
    if (urlParams?.target) {
      return <Redirect to={`/login?target=${urlParams.target}`} />;
    } else {
      return <Redirect to="/login" />;
    }
  }

  return (
    <Page title="Wilswork | Verify account">
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
              <div className={clsx(cls.loginBox, "w-100", "fcol")}>
                <div className={clsx(globalCls.txtMdSec, "fwb")}>
                  Hello user,
                </div>
                <div className={clsx(globalCls.txtLgPriCol, "mar_t-8", "fwb")}>
                  Let's verify your account
                </div>
                <div className={clsx(globalCls.txtSmSec, "mar_t-8")}>
                  Please enter the OTP sent to:
                </div>
                <form className="fcol mar_t-32" onSubmit={handleOTPVerify}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id="adornment-password"
                      type="password"
                      value={values.password}
                      onChange={handleChange("password")}
                      name="password"
                      labelWidth={108}
                    />
                  </FormControl>
                  <FormControl
                    fullWidth
                    className={globalCls.marT16}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="adornment-password-cnfrm">
                      Confirm new Password
                    </InputLabel>
                    <OutlinedInput
                      id="adornment-password-cnfrm"
                      type={values.showPassword ? "text" : "password"}
                      value={values.passwordConfirm}
                      onChange={handleChange("passwordConfirm")}
                      name="passwordConfirm"
                      labelWidth={165}
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
                  {auth.verifyResetPwdError ? (
                    <Alert
                      className="mar_t-16"
                      variant="standard"
                      severity="error"
                    >
                      {auth.verifyResetPwdError}
                    </Alert>
                  ) : null}
                  <Button
                    className={clsx(globalCls.marT32)}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={auth.verifyResetPwdLoading}
                  >
                    CONFIRM
                  </Button>
                  <div className={clsx("fcc fsm mar_t-32", globalCls.txtMdSec)}>
                    Already have an account?{" "}
                    <Link
                      className={clsx(globalCls.link, "mar_l-8")}
                      to="/login"
                    >
                      <strong>Login here!</strong>
                    </Link>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
        {auth.verifyResetPwdLoading && <Loader />}
      </div>
    </Page>
  );
};

export default VerifyPwdReset;
