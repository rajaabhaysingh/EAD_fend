import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// components
import Page from "../../../components/mui/Page";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
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
            Mr. Patil, if you're looking this... Rem! you had to do it :P.
          </div>
        </Page>
      </Route>
    </Switch>
  );
};

export default Messages;
