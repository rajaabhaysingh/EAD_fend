import React from "react";
import clsx from "clsx";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Link } from "react-router-dom";

// components

// assets

// colors

// icons

// misc
import { timeAgo, generateName, parseDate } from "../../helpers/misc";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    background: theme.palette.background.bg,
    textDecoration: "none",
    color: theme.palette.text.primary,
    minWidth: "100%",
    boxSizing: "border-box",
    borderRadius: "8px",
  },
  jobThumbnail: {
    width: "40px",
    height: "40px",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "4px",
  },
  title: {
    marginTop: "4px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
    fontSize: "0.9rem",
    textOverflow: "wrap",
  },
}));

const JobCard = ({ job }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={globalCls.hovActive_suggList}>
      <Link to={`/jobs/${job._id}`} className={clsx("fcol", cls.root)}>
        <div className={clsx("fcol", "rel")}>
          <div className="f">
            <img
              className={cls.jobThumbnail}
              src={baseUrl + job.jobThumbnail}
              alt=""
            />
            <div className={clsx("fcol", globalCls.marL8)}>
              <div className={globalCls.txtSmPriCol}>
                {generateName(
                  job.owner?.firstName,
                  job.owner?.middleName,
                  job.owner?.lastName
                )}
              </div>
              <div className={clsx(cls.title)}>
                {job.name || "Not available"}
              </div>
            </div>
          </div>
          <div className={clsx(globalCls.txtSmSec, globalCls.pcTimeAgo)}>
            {timeAgo(job.createdAt)}
          </div>
        </div>
        <div className="fcol mar_t-8">
          <div className={clsx(globalCls.pctb_moblr_spbw, "mar_t-4")}>
            <div className="fcol">
              <div className={globalCls.txtSmSec}>
                <i className="fas fa-map-marker-alt mar_r-4"></i>{" "}
                {job.location?.pinCode || "N/A"},{" "}
                {job.location?.cityDistrictTown || "N/A"}
              </div>
              <div className={clsx(globalCls.txtSmSec, "fwb")}>
                <i className="fas fa-rupee-sign mar_r-4"></i>{" "}
                {job.payscale || "N/A"}/{job.payscaleUnit || "N/A"}
              </div>
            </div>
            <div className={clsx(globalCls.pcMarT8, "fcol")}>
              <div className={globalCls.txtSmSec}>
                <i className="far fa-user mar_r-4"></i> Vacancy:{" "}
                {job.reqQty || "N/A"}
              </div>
              <div className={globalCls.txtSmSec}>
                <i className="far fa-calendar mar_r-4"></i> Deadline:{" "}
                {parseDate(job.deadline)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
