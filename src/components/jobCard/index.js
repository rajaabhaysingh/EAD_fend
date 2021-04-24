import React from "react";
import clsx from "clsx";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Link } from "react-router-dom";

// components

// assets
import img_placeholder from "../../assets/img/img_placeholder.svg";

// colors

// icons

// misc
import { timeAgo, generateName, parseDate } from "../../helpers/misc";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "24px",
    background: theme.palette.background.bg,
    borderRadius: "32px",
    textDecoration: "none",
    color: theme.palette.text.primary,
    maxWidth: "230px",
    minWidth: "230px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0",
      padding: "16px",
      maxWidth: "100%",
      minWidth: "100%",
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
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
    [theme.breakpoints.up("md")]: {
      maxWidth: "190px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
}));

const JobCard = ({ job }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={clsx(globalCls.hovActive_cardList, globalCls.pcMarR16)}>
      <Link to={`/jobs/${job._id}`} className={clsx("fcol", cls.root)}>
        <div className={clsx(globalCls.pclr_mobtb, "rel")}>
          <div className={globalCls.pctb_moblr}>
            <img
              className={cls.jobThumbnail}
              src={
                job.jobThumbnail
                  ? process.env.REACT_APP_BASE_URL + job.jobThumbnail
                  : img_placeholder
              }
              alt=""
            />
            <div
              className={clsx("fcol", globalCls.mobMarL8, globalCls.pcMarT8)}
            >
              <div className={globalCls.txtSmPriCol}>
                {generateName(
                  job.owner_details[0]?.firstName,
                  job.owner_details[0]?.middleName,
                  job.owner_details[0]?.lastName
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
                {job.location_details[0]?.pinCode || "N/A"},{" "}
                {job.location_details[0]?.cityDistrictTown || "N/A"}
              </div>
              <div className={clsx(globalCls.txtSmSec, "fwb mar_t-4")}>
                <i className="fas fa-rupee-sign mar_r-4"></i>{" "}
                {job.payscale || "N/A"}/{job.payscaleUnit || "N/A"}
              </div>
            </div>
            <div className={clsx(globalCls.pcMarT8, "fcol")}>
              <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
                <i className="far fa-user mar_r-4"></i> Vacancy:{" "}
                {job.reqQty || "N/A"}
              </div>
              <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
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
