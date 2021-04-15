import React from "react";
import clsx from "clsx";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
  mar: {
    margin: "24px",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
    },
  },
}));

const About = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const helper = useSelector((state) => state.helper);

  return (
    <Page title="About">
      <div className={cls.root}>
        <Header helper={helper} />
        <div
          className={
            helper.marginTop
              ? clsx(globalCls.bodyRoot, globalCls.bodyRootTransform)
              : globalCls.bodyRoot
          }
        >
          <Alert severity="warning" className={cls.mar}>
            This page is under construction. Check back later.
          </Alert>
        </div>
      </div>
    </Page>
  );
};

export default About;
