import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, Redirect } from "react-router-dom";
import getQueryParams from "../../helpers/getQueryParams";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";
import ReCAPTCHA from "react-google-recaptcha";
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
  TextField,
  Button,
  Hidden,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useGlobalStyles from "../../styles/globalStyles";

// icons
import { Visibility, VisibilityOff } from "@material-ui/icons";

// import assets
import SignupImg from "../../assets/img/signup.svg";
import LoginBg from "../../assets/img/login-bg-light.svg";
import userPlaceholder from "../../assets/img/userPlaceholder.svg";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signupAction } from "../../redux/actions";

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
  userImg: {
    height: "80px",
    width: "80px",
    borderRadius: "4px",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
  },
  inpLabel: {
    position: "absolute",
    bottom: "-12px",
    cursor: "pointer",
    background: "#ddd",
    height: "32px",
    width: "32px",
    borderRadius: "4px",
    opacity: "0.75",
    display: "flex",
    fontSize: "1.2rem",
    alignItems: "center",
    "&:hover": {
      background: "#ccc",
    },
  },
}));

const Signup = () => {
  // local state management
  const [formState, setFormState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    type: "individual",
    showPassword: false,
    profilePicture: undefined,
    preview: userPlaceholder,
    reCAPTCHA: null,
  });
  const [state, setState] = useState({
    agree: true,
  });

  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const helper = useSelector((state) => state.helper);
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (formState.type === "organization") {
      setFormState({
        ...formState,
        middleName: "",
        lastName: "",
      });
    }

    return () => {
      URL.revokeObjectURL(formState.profilePicture);
    };
  }, [formState]);

  // handleChange
  const handleChange = (e, image = null) => {
    if (image) {
      setFormState({
        ...formState,
        [e.target.name]: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
      });
      return;
    }

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // captchaFailed
  const captchaFailed = () => {
    setFormState({
      ...formState,
      reCAPTCHA: null,
    });
    // setDisableLogin(true);
  };

  // captchaPassed
  const captchaPassed = (key) => {
    setFormState({
      ...formState,
      reCAPTCHA: key,
    });
    // setDisableLogin(false);
  };

  // handleSwitchChange
  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // handleClickShowPassword
  const handleClickShowPassword = () => {
    setFormState({
      ...formState,
      showPassword: !formState.showPassword,
    });
  };

  // handleMouseDownPassword
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handleSignupFormSubmit
  const handleSignupFormSubmit = (e) => {
    e.preventDefault();

    if (formState.password !== formState.passwordConfirm) {
      alert("Password didn't match");
      setFormState({
        ...formState,
        passwordConfirm: "",
      });
      return;
    }

    const formData = new FormData();

    formData.append("firstName", formState.firstName);

    if (formState.middleName) {
      formData.append("middleName", formState.middleName);
    }

    formData.append("lastName", formState.lastName);
    formData.append("email", formState.email);
    formData.append("phone", formState.phone);
    formData.append("password", formState.password);
    formData.append("passwordConfirm", formState.passwordConfirm);
    formData.append("type", formState.type);
    formData.append("reCAPTCHA", formState.reCAPTCHA);

    if (formState.profilePicture) {
      formData.append("profilePicture", formState.profilePicture);
    }

    // dispatch action
    dispatch(signupAction(formData));
  };

  // preserving target url
  const urlParams = getQueryParams(window.location.search);

  if (signup.registered) {
    if (urlParams?.target) {
      return <Redirect to={`/verify-email?target=${urlParams.target}`} />;
    } else {
      return <Redirect to="/verify-email" />;
    }
  }

  return (
    <Page title="Wilswork | Signup">
      <div className={cls.root}>
        <Header helper={helper} />
        <div
          className={
            helper.marginTop
              ? clsx(globalCls.bodyRoot, globalCls.bodyRootTransform)
              : globalCls.bodyRoot
          }
        >
          <Grid container className={clsx("justc", cls.bg, globalCls.pad_0_32)}>
            <Grid
              item
              xs={false}
              sm={false}
              md={5}
              lg={5}
              xl={3}
              className="fc"
            >
              <Hidden smDown>
                <img className={cls.img} src={SignupImg} alt="" />
              </Hidden>
            </Grid>
            <Grid item xs={12} sm={10} md={6} lg={6} xl={6} className="fc">
              <form
                encType="multi-part/formdata"
                className={clsx(cls.loginBox, "w-100", "fcol")}
                onSubmit={handleSignupFormSubmit}
              >
                <div className="fcbw">
                  <div className="fcol">
                    <div className={clsx(globalCls.txtMdSec, "fwb")}>
                      Lets get your
                    </div>
                    <div
                      className={clsx(globalCls.txtLgPriCol, "mar_t-8", "fwb")}
                    >
                      Account set up
                    </div>
                    <div className={clsx(globalCls.txtSmSec, "mar_t-8")}>
                      Create an account to start using our service. Please
                      select whether you are registering as an individual or as
                      an organization
                    </div>
                  </div>
                  <div className="fccc rel">
                    <img
                      className={cls.userImg}
                      src={formState.preview}
                      alt=""
                    />
                    <input
                      style={{
                        display: "none",
                      }}
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      name="profilePicture"
                      onChange={(e) => handleChange(e, true)}
                    />
                    <label className={cls.inpLabel} htmlFor="profilePicture">
                      <i className="fas fa-upload mar-auto"></i>
                    </label>
                  </div>
                </div>
                <div className="fcol mar_t-32">
                  <RadioGroup
                    row
                    aria-label="type"
                    name="type"
                    value={formState.type}
                    className={clsx(globalCls.txtSmSec, "fcc")}
                    onChange={(e) => handleChange(e)}
                  >
                    <FormControlLabel
                      value="individual"
                      control={<Radio color="primary" />}
                      label="Individual"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="organization"
                      control={<Radio color="primary" />}
                      label="Organization"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  <div className="fc mar_t-16">
                    {formState.type === "individual" ? (
                      <>
                        <TextField
                          label="First name"
                          variant="standard"
                          fullWidth
                          size="small"
                          name="firstName"
                          value={formState.firstName}
                          onChange={(e) => handleChange(e)}
                        />
                        <TextField
                          label="Middle name"
                          variant="standard"
                          fullWidth
                          size="small"
                          name="middleName"
                          value={formState.middleName}
                          onChange={(e) => handleChange(e)}
                          className={globalCls.marL8}
                        />
                        <TextField
                          label="Last name"
                          variant="standard"
                          fullWidth
                          size="small"
                          name="lastName"
                          value={formState.lastName}
                          onChange={(e) => handleChange(e)}
                          className={globalCls.marL8}
                        />
                      </>
                    ) : (
                      <TextField
                        label="Organization name"
                        variant="standard"
                        fullWidth
                        size="small"
                        name="firstName"
                        value={formState.firstName}
                        onChange={(e) => handleChange(e)}
                      />
                    )}
                  </div>
                  <div className={clsx(globalCls.marT16, "fc")}>
                    <TextField
                      label="Email"
                      variant="standard"
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={(e) => handleChange(e)}
                    />
                    <TextField
                      label="Phone"
                      variant="standard"
                      fullWidth
                      size="small"
                      type="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={(e) => handleChange(e)}
                      className={globalCls.marL8}
                    />
                  </div>
                  <div className={clsx(globalCls.marT16, "fc")}>
                    <FormControl fullWidth size="small">
                      <InputLabel htmlFor="adornment-password">
                        Password
                      </InputLabel>
                      <Input
                        id="adornment-password"
                        type="password"
                        value={formState.password}
                        onChange={(e) => handleChange(e)}
                        name="password"
                      />
                    </FormControl>
                    <FormControl
                      size="small"
                      fullWidth
                      className={globalCls.marL8}
                    >
                      <InputLabel htmlFor="adornment-password-cnfrm">
                        Confirm Password
                      </InputLabel>
                      <Input
                        id="adornment-password-cnfrm"
                        type={formState.showPassword ? "text" : "password"}
                        value={formState.passwordConfirm}
                        onChange={(e) => handleChange(e)}
                        name="passwordConfirm"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {formState.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>

                  {signup.error ? (
                    <Alert
                      className="mar_t-24"
                      variant="standard"
                      severity="error"
                    >
                      {signup.error}
                    </Alert>
                  ) : null}
                  <div className="fc bb fsm mar_t-16">
                    <Checkbox
                      checked={state.agree}
                      onChange={handleSwitchChange}
                      name="agree"
                      color="primary"
                    />
                    <span className={globalCls.txtMdPri}>
                      I agree to the
                      <Link
                        className={clsx(globalCls.link, globalCls.marLR_4)}
                        to="/terms-and-conditions"
                      >
                        Terms and Conditions
                      </Link>
                      and
                      <Link
                        className={clsx(globalCls.link, globalCls.marLR_4)}
                        to="/privacy-policy"
                      >
                        Privacy policy
                      </Link>
                      . I also agree that I am over 14 years old.
                    </span>
                  </div>
                  <div className="w-100 fcc mar_t-24">
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                      onChange={captchaPassed}
                      onExpired={captchaFailed}
                      onErrored={captchaFailed}
                      theme={helper.themeName === "light" ? "light" : "dark"}
                    />
                  </div>
                  <Button
                    className={clsx(globalCls.marT32)}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={
                      signup.loading || !state.agree || !formState.reCAPTCHA
                    }
                  >
                    CONTINUE
                  </Button>
                  <div className={clsx("fcc fsm mar_t-32", globalCls.txtMdSec)}>
                    Already have an account?{" "}
                    <Link
                      className={clsx(globalCls.link, "mar_l-8")}
                      to="/login"
                    >
                      <strong>Login now!</strong>
                    </Link>
                  </div>
                  <div className="fcbw mar_t-32 fss">
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
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
        {signup.loading && <Loader />}
      </div>
    </Page>
  );
};

export default Signup;
