import React from "react";
import { Switch, useHistory, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../../components/HOC/PrivateRoute";
import clsx from "clsx";

// components
import Page from "../../../components/mui/Page";
import NewPosting from "./posting/NewPosting";
import PostingDetails from "./posting/PostingDetails";
import PostingTable from "../components/PostingTable";
import ProfileHeader from "../sections/ProfileHeader";

// styling
import { makeStyles, Button } from "@material-ui/core";
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

// PostingBase component
const PostingBase = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const postings = useSelector((state) => state.postings);
  const history = useHistory();

  const { url } = useRouteMatch();

  return postings.getPostingsLoading ? (
    <Loader />
  ) : postings.getPostingsData ? (
    <Page title="Wilswork | My postings">
      <div className={cls.baseRoot}>
        <div className="fcbw">
          <div className="fcol">
            <div className={clsx(globalCls.txtLgSec, "fwb")}>My postings</div>
            <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
              View/edit you postings detail here.
            </div>
          </div>
          <Button
            onClick={() => history.push(`${url}/new`)}
            color="primary"
            size="small"
            variant="contained"
          >
            Post Job
          </Button>
        </div>
        <ProfileHeader postings={postings} />
        <div className="mar_t-24">
          <div className={clsx(globalCls.txtLgSec, "fwb")}>
            All job postings
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-4 mar_b-24")}>
            Select posting to view details about it.
          </div>
          <PostingTable postings={postings} />
        </div>
      </div>
    </Page>
  ) : (
    <Alert className="f1 mar_t-16" severity="error">
      <AlertTitle>SOME ERROR OCCURED</AlertTitle>
      {postings.getPostingsError}
    </Alert>
  );
};

// Postings -- default export
const Postings = () => {
  const cls = useStyles();
  const { path } = useRouteMatch();

  return (
    <div className={cls.root}>
      <Switch>
        <PrivateRoute path={path} exact component={PostingBase} />
        <PrivateRoute path={`${path}/new`} component={NewPosting} />
        <PrivateRoute path={`${path}/:jobId`} component={PostingDetails} />
      </Switch>
    </div>
  );
};

export default Postings;
