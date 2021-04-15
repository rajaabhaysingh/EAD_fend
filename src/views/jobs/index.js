import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import clsx from "clsx";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";
import JobPage from "./JobPage";
import SearchResults from "./SearchResults";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Jobs = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const helper = useSelector((state) => state.helper);

  const { path } = useRouteMatch();

  return (
    <Page title="Wilswork | Jobs">
      <div className={cls.root}>
        <Header helper={helper} />
        <div
          className={
            helper.marginTop
              ? clsx(globalCls.bodyRoot, globalCls.bodyRootTransform)
              : globalCls.bodyRoot
          }
        >
          <Switch>
            <Route path={path} exact>
              <SearchResults />
            </Route>
            <Route path={`${path}/:jobId`}>
              <JobPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Page>
  );
};

export default Jobs;
