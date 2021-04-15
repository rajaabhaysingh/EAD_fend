import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// components

// styling
import { Button, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    padding: "24px",
    boxSizing: "border-box",
    borderRadius: "8px",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
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
  btn: {
    background: theme.palette.common.white,
    color: theme.palette.primary.main,
    marginTop: "16px",
  },
}));

const PostJobCard = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <Link to="/account/my-postings/new" className={clsx(cls.root, "fcol")}>
      <div className="fcol">
        <div className={clsx(globalCls.txtLgWhite, "fwb")}>How it works?</div>
        <div className={clsx(globalCls.txtSmPriCol, "mar_t-8 mar_b-16")}>
          We advertise your job postings to all potential workers and help you
          to get them hired.
        </div>
        {[
          "Note down your job requirements.",
          "Signup/login into your account and fill up the details.",
          "Done! We will take care of rest.",
        ].map((timeline, i) => (
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
        <Button variant="contained" size="small" className={cls.btn}>
          POST A JOB AD NOW
        </Button>
      </div>
    </Link>
  );
};

export default PostJobCard;
