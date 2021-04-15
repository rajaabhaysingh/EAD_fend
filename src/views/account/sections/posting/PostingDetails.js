import React from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

// styling
import { Button, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../../styles/globalStyles";
import { Alert, AlertTitle } from "@material-ui/lab";

// components
import Page from "../../../../components/mui/Page";
import PostingJobHeader from "../../components/PostingJobHeader";
import AcceptedAppicantsTable from "../../components/AceptedApplicantsTable";
import PendingApplicantsTable from "../../components/PendingApplicantsTable";
import Loader from "../../../../components/loader";

// assets

// colors

// icons
import { Edit } from "@material-ui/icons";

// redux
import { getJobById } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  postingContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
  },
  acceptedTable: {
    padding: "24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
  pendingTable: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
}));

const PostingDetails = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const job = useSelector((state) => state.jobs);

  // dispatch
  React.useEffect(() => {
    dispatch(getJobById(jobId));
  }, [jobId]);

  return job.getJobByIdLoading ? (
    <Loader />
  ) : job.getJobByIdData ? (
    <Page title="Wilswork | New posting">
      <div className={cls.root}>
        <div className="fcbw">
          <div className="fcol">
            <div className={clsx(globalCls.txtLgSec, "fwb")}>
              Postings details
            </div>
            <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
              Manage your posting here.
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
          <PostingJobHeader job={job} />
          <div className={clsx("fcol", cls.acceptedTable)}>
            <div className={clsx(globalCls.txtLgSec, "fwb", "mar_b-24")}>
              Accepted applications
            </div>
            <AcceptedAppicantsTable job={job} />
          </div>
          <div className={clsx("fcol", cls.pendingTable)}>
            <div className={clsx(globalCls.txtLgSec, "fwb", "mar_b-24")}>
              Pending applications
            </div>
            <PendingApplicantsTable job={job} />
          </div>
        </div>
      </div>
    </Page>
  ) : (
    <Alert className="f1 mar_t-16" severity="error">
      <AlertTitle>SOME ERROR OCCURED</AlertTitle>
      {job.getJobByIdError}
    </Alert>
  );
};

export default PostingDetails;
