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

const JobSlider = ({ jobs, title, subTitle }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return jobs?.getHomeLocalJobsData ? (
    <div className={clsx(globalCls.pad_lr_8_16, "fcol")}>
      <div className={globalCls.mainTitle}>{title || ""}</div>
      <div className={globalCls.subTitle}>{subTitle || ""}</div>
      <div
        className={clsx(
          globalCls.pcOfScr,
          globalCls.custMobList,
          "mar_t-16",
          "sb_hid"
        )}
      >
        <div className={clsx(globalCls.pclr_mobtb, globalCls.pcPadB16)}>
          {jobs.getHomeLocalJobsData?.jobs?.length > 0 ? (
            jobs.getHomeLocalJobsData.jobs.map((job) => (
              <JobCard job={job} key={job._id} />
            ))
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
      <div className={clsx("fcc", globalCls.mobMarT8)}>
        <Button
          className={globalCls.rounded}
          variant="contained"
          color="primary"
        >
          See all jobs near me
        </Button>
      </div>
    </div>
  ) : null;
};

export default JobSlider;
