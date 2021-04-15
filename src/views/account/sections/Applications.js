import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../../components/HOC/PrivateRoute";
import clsx from "clsx";

// components
import Page from "../../../components/mui/Page";
import ApplicationDetails from "./application/ApplicationDetails";
import ApplicationTable from "../components/ApplicationTable";
import ProfileHeader from "../sections/ProfileHeader";

// styling
import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import useGlobalStyles from "../../../styles/globalStyles";

// redux
import { useSelector } from "react-redux";
import Loader from "../../../components/loader";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    padding: "24px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
  baseRoot: {},
}));

// ApplicationBase component
const ApplicationBase = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const applications = useSelector((state) => state.application);

  return applications.getApplicationsLoading ? (
    <Loader />
  ) : applications.getApplicationsData ? (
    <Page title="Wilswork | My applications">
      <div className={cls.baseRoot}>
        <div className="fcbw">
          <div className="fcol">
            <div className={clsx(globalCls.txtLgSec, "fwb")}>
              My Applications
            </div>
            <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
              View/edit you application detail here.
            </div>
          </div>
        </div>
        <ProfileHeader applications={applications} />
        <div className="mar_t-24">
          <div className={clsx(globalCls.txtLgSec, "fwb")}>
            All applications
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-4 mar_b-24")}>
            Select an application to view details about it.
          </div>
          <ApplicationTable applications={applications} />
        </div>
      </div>
    </Page>
  ) : (
    <Alert className="f1 mar_t-16" severity="error">
      <AlertTitle>SOME ERROR OCCURED</AlertTitle>
      {applications.getApplicationsError}
    </Alert>
  );
};

// Applications -- default export
const Applications = () => {
  const cls = useStyles();
  const { path } = useRouteMatch();

  return (
    <div className={cls.root}>
      <Switch>
        <PrivateRoute path={path} exact component={ApplicationBase} />
        <PrivateRoute
          path={`${path}/:applicationId`}
          component={ApplicationDetails}
        />
      </Switch>
    </div>
  );
};

export default Applications;
