import React from "react";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Jobs = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <Page title="Jobs">
      <div className={cls.root}>
        <Header helper={helper} />
        <div className={globalCls.bodyRoot}>This is jobs page</div>
      </div>
    </Page>
  );
};

export default Jobs;
