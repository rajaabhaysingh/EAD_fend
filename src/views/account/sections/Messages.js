import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// components
import Page from "../../../components/mui/Page";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

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

const Messages = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <Page title="Wilswork | Account Messages">
          <div className={cls.root}>
            <Alert severity="warning" className={cls.mar}>
              This page is under construction. Check back later.
            </Alert>
          </div>
        </Page>
      </Route>
    </Switch>
  );
};

export default Messages;
