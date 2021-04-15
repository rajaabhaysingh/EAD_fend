import React from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

// styling
import { Box, Button, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";
import { Alert, AlertTitle } from "@material-ui/lab";

// components
import Page from "../../../../components/mui/Page";
import AppJobHeader from "../../components/AppJobHeader";
import Loader from "../../../../components/loader";

// assets

// colors

// icons
import { Edit } from "@material-ui/icons";

// redux
import { getApplicationById } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../../../../components/misc/Divider";
import { Link } from "react-router-dom";
import PaymentDetailBox from "../../components/PaymentDetailBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  postingContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
  },
  table: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
  success: {
    color: theme.palette.common.white,
    background: theme.palette.success.main,
    padding: "4px 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    width: "60px",
    textAlign: "center",
    borderRadius: "20px",
  },
  rejected: {
    color: theme.palette.common.white,
    background: theme.palette.error.main,
    padding: "4px 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    width: "60px",
    textAlign: "center",
    borderRadius: "20px",
  },
  applied: {
    color: theme.palette.common.white,
    background: theme.palette.info.main,
    padding: "4px 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    width: "60px",
    textAlign: "center",
    borderRadius: "20px",
  },
  file: {
    padding: "4px 8px",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    marginBottom: "8px",
    color: theme.palette.primary.main,
    fontSize: "0.8rem",
    maxWidth: "300px",
    overflow: "hidden",
    textDecoration: "none",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ApplicationDetails = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const { applicationId } = useParams();
  const dispatch = useDispatch();
  const application = useSelector((state) => state.application);

  // dispatch
  React.useEffect(() => {
    dispatch(getApplicationById(applicationId));
  }, [applicationId]);

  return application.getAppByIdLoading ? (
    <Loader />
  ) : application.getAppByIdData ? (
    <Page title="Wilswork | Application">
      <div className={cls.root}>
        <div className="fcbw">
          <div className="fcol">
            <div className={clsx(globalCls.txtLgSec, "fwb")}>
              Application details
            </div>
            <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
              Manage your application here.
            </div>
          </div>
          <Button
            startIcon={<Edit />}
            color="primary"
            size="small"
            variant="contained"
          >
            Edit
          </Button>
        </div>
        <div className={clsx("mar_t-16", cls.postingContainer)}>
          <AppJobHeader application={application} />
          <div className={clsx("fcol", cls.table)}>
            <div
              className={clsx(globalCls.txtLgSec, "mar_t-32", "mar_b-8 fwb")}
            >
              Application Details
            </div>
            <Divider />
            <div
              className={clsx(globalCls.txtMdSec, "mar_t-32", "mar_b-8 fwb")}
            >
              Documents provided
            </div>
            {application.getAppByIdData?.coverLetter?.length > 0 ? (
              application.getAppByIdData.coverLetter.map((doc) => (
                <a
                  href={`${process.env.REACT_APP_BASE_URL}${doc.file}`}
                  target="_blank"
                  className={cls.file}
                  key={doc._id}
                >
                  {doc.file.split("___").pop()}
                  <i className="fas fa-external-link-alt mar_l-12"></i>
                </a>
              ))
            ) : (
              <div className={globalCls.txtErr}>No documents provided.</div>
            )}
            <div
              className={clsx(globalCls.txtMdSec, "mar_t-32", "mar_b-8 fwb")}
            >
              Status
            </div>
            <div className="fc">
              {application.getAppByIdData.status === "accepted" ? (
                <div className={cls.success}>ACCEPTED</div>
              ) : application.getAppByIdData.status === "rejected" ? (
                <div className={cls.rejected}>REJECTED</div>
              ) : (
                <div className={cls.applied}>APPLIED</div>
              )}
              {application.getAppByIdData.status !== "rejected" && (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  type="submit"
                  className={globalCls.marL8}
                  onClick={() =>
                    alert(
                      "You cannot withdraw application now. Feature coming soon."
                    )
                  }
                >
                  Withdraw application
                </Button>
              )}
            </div>
            <div
              className={clsx(globalCls.txtMdSec, "mar_t-32", "mar_b-8 fwb")}
            >
              Payment history
            </div>
            <div className="fcol mar_t-16">
              {application.getAppByIdData.payments?.length > 0 ? (
                application.getAppByIdData.payments.map((payment) => (
                  <PaymentDetailBox paymentObj={payment} key={payment._id} />
                ))
              ) : (
                <Alert className="f1" severity="info">
                  <AlertTitle>DETAILS UNAVAILABLE</AlertTitle>
                  No payment details available for this application.
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  ) : (
    <Alert className="f1 mar_t-16" severity="error">
      <AlertTitle>SOME ERROR OCCURED</AlertTitle>
      {application.getAppByIdError}
    </Alert>
  );
};

export default ApplicationDetails;
