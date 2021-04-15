import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// styling
import { Button, Grid, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// components

// assets
import mobileApp from "../../../assets/img/mobile_app.png";
import googlePlay from "../../../assets/img/google-play.svg";
import apple from "../../../assets/img/apple.svg";

// colors

// icons

// redux

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    padding: "32px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  box: {
    boxShadow: `0 0 4px rgba(255,255,255,0.5)`,
    borderRadius: "16px",
    padding: "32px",
    boxSizing: "border-box",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  roundBead: {
    position: "absolute",
    top: "calc(50% - 5px)",
    borderRadius: "20px",
    padding: "3px",
    background: theme.palette.warning.main,
    height: "12px",
    width: "12px",
    boxSizing: "border-box",
  },
  roundBeadInside: {
    height: "6px",
    width: "6px",
    background: theme.palette.background.bg,
    borderRadius: "20px",
    boxShadow: "0 2px 2px rgba(0,0,0,0.5)",
  },
  line: {
    height: "100%",
    width: "2px",
    background: theme.palette.divider,
  },
  img: {
    position: "absolute",
    top: "0",
    width: "100%",
    minHeight: "200px",
  },
  cities: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const Infographics = ({}) => {
  // local state mgmt

  const cls = useStyles();
  const globalCls = useGlobalStyles();

  // renderProcess
  const renderProcess = (timelineArray) => {
    return (
      <div className="fcol">
        <div className={clsx(globalCls.txtLgWhite, "fwb")}>How it works?</div>
        <div className={clsx(globalCls.txtMdPriCol)}>
          Quick and easy way to advertise
        </div>
        <div className={clsx(globalCls.txtSmWhite, "mar_t-12 mar_b-32")}>
          We advertise your job postings to all potential workers and help you
          to get them hired.
        </div>
        {timelineArray.map((timeline, i) => (
          <div className="f" key={i}>
            <div className={clsx("fccc", "rel")}>
              <div className={cls.roundBead}>
                <div className={cls.roundBeadInside}></div>
              </div>
              <div className={cls.line}></div>
            </div>
            <div className={clsx(globalCls.txtSmWhite, "mar_l-16", "pad-8")}>
              {timeline}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={clsx("", cls.root)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={cls.box}>
            {renderProcess([
              "First note down your requirements.",
              "Signup/login into your account.",
              "Fill up the details and post it.",
              "Done! We will take care of rest.",
            ])}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className="fcc h-100 rel of_hid">
            <img className={cls.img} src={mobileApp} alt="" />
            {/* <div className="fcol w-100 pad-16 bb shadow_1-1-4-dark round-4">
              <div className="fsxs w-100">
                Download apps for better experience
              </div>
              <Button
                variant="contained"
                color="primary"
                className=""
                size="small"
              >
                <img className="mar_l-8 h-20p" src={googlePlay} alt="" />
                <div className="fcol mar_l-16">
                  <div className="fs2xs fwb align-l fc_gray-light">
                    GET IT ON
                  </div>
                  <div className="fsm fwb fc_white">Google Play</div>
                </div>
              </Button>
              <Button
                variant="contained"
                color="primary"
                className=""
                size="small"
              >
                <img className="mar_l-8 h-20p" src={apple} alt="" />
                <div className="fcol mar_l-16">
                  <div className={globalCls.txtSmWhite}>Download on the</div>
                  <div className={globalCls.txtSmWhite}>App Store</div>
                </div>
              </Button>
            </div> */}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className={cls.box}>
            <div className={clsx(globalCls.txtLgWhite, "fwb")}>
              We're available at
            </div>
            <div className={clsx(globalCls.txtMdPriCol)}>
              Cities we're currently supporting
            </div>
            <div className={clsx(globalCls.txtSmWhite, "mar_t-12 mar_b-32")}>
              We currently support and operate at selected cities and soon will
              be coming to your place if we're unavailable there.
            </div>
            <Grid container spacing={1} className={cls.cities}>
              {[
                "Bhagalpur",
                "Banka",
                "Sri City",
                "Chennai",
                "Chittoor",
                "Patna",
                "Purnea",
                "Ranchi",
              ].map((city, i) => (
                <Grid key={i} item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Link
                    to={`/jobs?city=${city}`}
                    className={clsx(
                      "fc no-decor",
                      globalCls.pill,
                      globalCls.bgDark
                    )}
                  >
                    <div className={globalCls.txtMdPriCol}>
                      <i className="fas fa-city"></i>
                    </div>
                    <div className={clsx("mar_l-8", globalCls.txtMdWhite)}>
                      {city}
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Infographics;
