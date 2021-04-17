import React from "react";
import { Switch, Link, useRouteMatch } from "react-router-dom";
import clsx from "clsx";

// ICONS
import { Add, Delete, BorderColor } from "@material-ui/icons";

// misc
import { generateName } from "../../../helpers/misc";
import netRating from "../../../helpers/netRating";

// components
import Page from "../../../components/mui/Page";
import Loader from "../../../components/loader";
import PrivateRoute from "../../../components/HOC/PrivateRoute";
import RenderStars from "../../../components/ratings/RenderStars";

// styling
import { Button, IconButton, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// asset
import user from "../../../assets/img/userPlaceholder.svg";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    padding: "24px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
  container: {
    marginTop: "24px",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
  },
  padB: {
    padding: "24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
  pad: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
  dp: {
    height: "120px",
    width: "120px",
    borderRadius: "50%",
    border: `4px solid ${theme.palette.background.bg}`,
    boxShadow: theme.shadows[8],
    objectFit: "cover",
    objectPosition: "center",
    [theme.breakpoints.down("sm")]: {
      height: "80px",
      width: "80px",
    },
  },
  addr: {
    padding: "16px",
    borderRadius: "4px",
    background: theme.palette.background.paper,
    fontSize: "0.8rem",
    marginBottom: "8px",
    width: "420px",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const Overview = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const { url, path } = useRouteMatch();

  const auth = useSelector((state) => state.auth);
  const postings = useSelector((state) => state.postings);
  const application = useSelector((state) => state.application);
  const profile = useSelector((state) => state.profile);

  // RenderOverview
  const RenderOverview = () => {
    return auth.loading ||
      application.getApplicationsLoading ||
      postings.getPostingsLoading ? (
      <Loader />
    ) : auth.user ? (
      <Page title="Wilswork | My account">
        <div className={cls.root}>
          <div className={clsx(globalCls.txtLgSec, "fwb")}>My Profile</div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
            Manage you personal details and account overview here.
          </div>
          <div className={cls.container}>
            <div className={clsx(cls.padB, globalCls.pclr_mobtb)}>
              <div className="f1">
                <img
                  className={cls.dp}
                  src={
                    auth?.user?.profilePicture
                      ? baseUrl + auth.user.profilePicture
                      : user
                  }
                  alt=""
                />
                <div className={clsx("fcolbw", "mar_l-32")}>
                  <div className="fcol">
                    <div className={clsx(globalCls.txtLgPri, "fwb")}>
                      {generateName(
                        auth.user.firstName,
                        auth.user.middleName,
                        auth.user.lastName
                      )}
                    </div>
                    <div
                      className={clsx(globalCls.txtSmSec, "mar_t-4 mar_b-8")}
                    >
                      {auth.user.email}
                    </div>
                    <RenderStars numOfStar={netRating(auth.user.ratings)} />
                  </div>
                  <div className="fc mar_t-16">
                    <Link
                      className="no-decor fwb"
                      to={`${url}/my-applications`}
                    >
                      <div className={globalCls.txtSmPriCol}>
                        {application.getApplicationsData.length} Applications
                      </div>
                    </Link>
                    <Link className="no-decor fwb" to={`${url}/my-postings`}>
                      <div className={clsx(globalCls.txtSmPriCol, "mar_l-16")}>
                        {postings.getPostingsData.length} Postings
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={clsx("fcol", globalCls.mobMarT16)}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => alert("Edit feature currently unavailable")}
                >
                  Edit profile
                </Button>
              </div>
            </div>
            <div className={clsx("fcol", cls.padB)}>
              <div className={clsx(globalCls.txtMdSec, "fwb")}>
                Area of work
              </div>
              <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
                We recommend jobs and workers based on your domain of work. Make
                sure it is up to date and aligns with your work profile.
              </div>
              <div className="fcol mar_t-16">
                {auth.user.skills?.length > 0 ? (
                  auth.user.skills.map((skill, i) => (
                    <div key={i} className={globalCls.txtSmSec}>
                      {skill}
                    </div>
                  ))
                ) : (
                  <Alert className="f1" severity="info">
                    You have not provided any area of work yet. Click on "add"
                    button below to add area(s) of work.
                  </Alert>
                )}
                <Button
                  className={globalCls.marT16}
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<Add />}
                  style={{ maxWidth: "100px" }}
                >
                  ADD
                </Button>
              </div>
            </div>
            <div className={clsx("fcol", cls.padB)}>
              <div className={clsx(globalCls.txtMdSec, "fwb")}>
                My Addresses
              </div>
              <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
                Your address and location info help us to advertise and
                recommend relevant jobs around you.
              </div>
              <div className="fcol mar_t-16">
                {profile.getAddressesLoading ? (
                  <Loader />
                ) : profile.getAddressesSuccess ? (
                  profile.getAddressesData?.length > 0 ? (
                    profile.getAddressesData.map((address) => (
                      <div key={address._id} className="f">
                        <div className={clsx("fc", cls.addr)}>
                          {address?.name || "N/A"},{" "}
                          {address?.addressLine || "N/A"},{" "}
                          {address?.landmark || "N/A"},{" "}
                          {address?.cityDistrictTown || "N/A"},{" "}
                          {address?.state || "N/A"}, {address?.country || "N/A"}
                          , {address?.pinCode || "N/A"}
                        </div>
                        <div className="fc mar_l-8">
                          <IconButton className={globalCls.txtErr}>
                            <Delete />
                          </IconButton>
                          <IconButton>
                            <BorderColor />
                          </IconButton>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Alert className="f1" severity="info">
                      No saved address found. Click on add button to add address
                      below.
                    </Alert>
                  )
                ) : (
                  <Alert className="f1" severity="error">
                    {profile.getAddressesError}
                  </Alert>
                )}
                <Button
                  className={globalCls.marT16}
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<Add />}
                  style={{ maxWidth: "100px" }}
                >
                  ADD
                </Button>
              </div>
            </div>

            <div className={clsx("fcol", cls.pad)}>
              <div className={clsx(globalCls.txtMdSec, "fwb")}>
                Payment details
              </div>
              <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
                Your payment information that we use for financial transactions
                related to your account.
              </div>
              <div className="mar_t-16">
                <Alert className="f1" severity="info">
                  No payment details found. Make sure you provide at least one
                  payment method and it's details for receiving payments.{" "}
                  <strong>
                    We will be coming up with a wallet system soon.
                  </strong>
                </Alert>
                <Button
                  className={globalCls.marT16}
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<Add />}
                  style={{ maxWidth: "100px" }}
                >
                  ADD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Page>
    ) : (
      <Alert className="f1" severity="error">
        {auth.error}
      </Alert>
    );
  };

  return (
    <Switch>
      <PrivateRoute path={path} exact component={RenderOverview} />
    </Switch>
  );
};

export default Overview;
