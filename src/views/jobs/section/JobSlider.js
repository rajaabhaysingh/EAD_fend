import React from "react";

// styling
import { makeStyles, Button } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";
import { Alert, AlertTitle } from "@material-ui/lab";

// components
import JobCard from "../../../components/jobCard";

// assets

// colors

// icons
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const JobSlider = ({ jobList }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={clsx(globalCls.pad_lr_8_16, "fcol")}>
      <div className={globalCls.mainTitle}>Recommended jobs near you</div>
      <div className={globalCls.subTitle}>
        We recommend jobs based on youy current location and browsing history
      </div>
      <div
        className={clsx(
          globalCls.pcOfScr,
          globalCls.custMobList,
          "mar_t-16",
          "sb_hid"
        )}
      >
        <div className={clsx(globalCls.pclr_mobtb, globalCls.pcPadB16)}>
          {jobList?.length > 0 ? (
            jobList.map((job) => <JobCard job={job} key={job._id} />)
          ) : (
            <div className={clsx(globalCls.pad_lr_8_16, "f1")}>
              <Alert className="f1" severity="info">
                <AlertTitle>NO JOBS AVAILABLE</AlertTitle>
                It seems that there isn't any job available under this segment.
                You can check jobs under different categories or if you think
                this is a mistake, please contact website admins.
              </Alert>
            </div>
          )}
        </div>
      </div>
      <div className="fcc">
        <Button
          className={globalCls.rounded}
          variant="contained"
          color="primary"
        >
          See all jobs near me
        </Button>
      </div>
    </div>
  );
};

export default JobSlider;
