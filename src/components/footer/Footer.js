import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// styling
import { Grid, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// assets
import googlePlay from "../../assets/img/google-play.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxWidth: "100%",
    marginTop: "32px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  scrTop: {
    width: "100%",
    padding: "12px 0",
    background: "rgba(0,0,0,0.25)",
    cursor: "pointer",
  },
}));

const Footer = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  // scrollToTop
  const scrollToTop = () => {
    if (
      document.body.scrollTop !== 0 ||
      document.documentElement.scrollTop !== 0
    ) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={cls.root}>
      <div
        className={clsx(cls.scrTop, "fcc mar_b-48", globalCls.txtMdWhite)}
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up mar_r-16"></i> SCROLL TO TOP
      </div>
      <Grid container spacing={4} justify="center">
        <Grid item xs={10} sm={5} md={3} lg={2} xl={2}>
          <div className="fcol">
            <div className={clsx(globalCls.txtLgWhite, "fwb")}>JOIN US</div>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2 mar_t-32")}
            >
              Professionals
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Student
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Work with us ?
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Check vacancy
            </Link>

            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Other Help
            </Link>
          </div>
        </Grid>
        <Grid item xs={10} sm={5} md={3} lg={2} xl={2}>
          <div className="fcol">
            <div className={clsx(globalCls.txtLgWhite, "fwb")}>INFORMATION</div>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2 mar_t-32")}
            >
              About us
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Terms {"&"} Conditions
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Privacy policy
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Contact us
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              FAQs
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Report bug
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Feedback
            </Link>
          </div>
        </Grid>
        <Grid item xs={10} sm={5} md={3} lg={2} xl={2}>
          <div className="fcol">
            <div className={clsx(globalCls.txtLgWhite, "fwb")}>CITIES</div>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2 mar_t-32")}
            >
              Bhagalpur
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Banka
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Sri City
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Chennai
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Chittoor
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Patna
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              All cities
            </Link>
          </div>
        </Grid>
        <Grid item xs={10} sm={5} md={3} lg={2} xl={2}>
          <div className="fcol">
            <div className={clsx(globalCls.txtLgWhite, "fwb")}>SERVICES</div>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2 mar_t-32")}
            >
              For recruiters
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Membership
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Partner program
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Report fraud
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Govt. jobs
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Alerts
            </Link>
            <Link
              to="/"
              className={clsx(globalCls.txtMdWhite, "no-decor pad-2")}
            >
              Help
            </Link>
          </div>
        </Grid>
        <Grid item xs={10} sm={5} md={3} lg={2} xl={2}>
          <div className="fcol">
            <div className={clsx(globalCls.txtLgWhite, "fwb")}>
              APP AND SOCIAL
            </div>
            <div className="fc mar_t-32 fs2x">
              <Link to="/" className="mar_l-4">
                <i className="fab fa-twitter-square fc_white"></i>
              </Link>
              <Link to="/" className="mar_l-4">
                <i className="fab fa-facebook-square fc_white"></i>
              </Link>
              <Link to="/" className="mar_l-4">
                <i className="fab fa-youtube-square fc_white"></i>
              </Link>
              <Link to="/" className="mar_l-4">
                <i className="fab fa-linkedin fc_white"></i>
              </Link>
              <Link to="/" className="mar_l-4">
                <i className="fab fa-instagram-square fc_white"></i>{" "}
              </Link>
            </div>
            <div className="mar_t-32 fcol">
              <Link to="/" className="link w-100 no-decor">
                <button className="fc w-100">
                  <img className="mar_l-8 h-20p" src={googlePlay} alt="" />
                  <div className="fcol mar_l-16">
                    <div className="fss align-l fc_gray">Get it on</div>
                    <div className="fsm align-l fwb">Google Play</div>
                  </div>
                </button>
              </Link>
              <Link to="/" className="link mar_t-4 w-100 no-decor">
                <button className="fc w-100">
                  <i className="mar_l-8 fab fa-apple fsxl"></i>
                  <div className="fcol mar_l-16">
                    <div className="fss align-l fc_gray">Download on the</div>
                    <div className="fsm align-l fwb">App Store</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={clsx(cls.scrTop, "fcc mar_t-32", globalCls.txtMdWhite)}>
        © All rights reserved @ 2021 wilswork.ml
      </div>
    </div>
  );
};

export default Footer;
