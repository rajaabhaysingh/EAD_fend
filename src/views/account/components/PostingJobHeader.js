import React from "react";
import clsx from "clsx";

// components
import Loader from "../../../components/loader";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// asset
import userPlaceholder from "../../../assets/img/userPlaceholder.svg";

// misc
import { parseDate } from "../../../helpers/misc";
import { PeopleAlt, Visibility } from "@material-ui/icons";

// keys
import { baseUrl } from "../../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    padding: "24px",
    display: "flex",
    flex: "1",
    borderRadius: "10px 10px 0 0",
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    fontSize: "1.2rem",
    whiteSpace: "wrap",
  },
  img: {
    height: "200px",
    width: "200px",
    borderRadius: "4px",
    objectFit: "cover",
    objectPosition: "center",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "100%",
      maxHeight: "200px",
    },
  },
}));

const PostingJobHeader = ({ job }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  // renderJobHeader
  const renderJobHeader = () => {
    if (job.getJobByIdLoading) {
      return <Loader />;
    } else if (job.getJobByIdSuccess) {
      return (
        <div className={clsx(cls.root, globalCls.pclr_mobtb)}>
          <img
            src={
              job.getJobByIdData?.jobThumbnail
                ? baseUrl + job.getJobByIdData?.jobThumbnail
                : userPlaceholder
            }
            className={cls.img}
            alt=""
          />
          <div className={clsx("f1bwcol", globalCls.pcMarL_mobMarT32)}>
            <div className="fbw">
              <div className="fcol">
                <div className={clsx(cls.title)}>
                  {job.getJobByIdData?.name || "Not available"}
                </div>
                <div className={clsx(globalCls.txtMdPriCol, "mar_t-8", "fwb")}>
                  posted by you
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-16", "f")}>
                  <i className="fas fa-map-marker-alt w-28p mar_t-4"></i>
                  <div className="fc">
                    {job.getJobByIdData?.location?.name || "N/A"},{" "}
                    {job.getJobByIdData?.location?.addressLine || "N/A"},{" "}
                    {job.getJobByIdData?.location?.landmark || "N/A"},{" "}
                    {job.getJobByIdData?.location?.cityDistrictTown || "N/A"},{" "}
                    {job.getJobByIdData?.location?.state || "N/A"},{" "}
                    {job.getJobByIdData?.location?.country || "N/A"},{" "}
                    {job.getJobByIdData?.location?.pinCode || "N/A"}
                  </div>
                </div>
                <div className={clsx(globalCls.txtMdSec, "fwb", "mar_t-4")}>
                  <i className="fas fa-rupee-sign w-28p"></i>
                  {job.getJobByIdData?.payscale || "N/A"}/
                  {job.getJobByIdData?.payscaleUnit || "N/A"}
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-4")}>
                  <i className="far fa-user w-28p"></i>Vacancy:
                  {job.getJobByIdData?.reqQty || "N/A"}
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-4")}>
                  <i className="far fa-calendar w-28p"></i>Deadline:
                  {parseDate(job.getJobByIdData?.deadline)}
                </div>
              </div>
            </div>
            <div className="fcbw mar_t-16">
              <div className="f">
                <div
                  className={clsx(globalCls.pill, "fcc")}
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  <span className="mar_r-4">
                    <Visibility />
                  </span>
                  3 Views
                </div>
                <div
                  className={clsx(globalCls.marL8, globalCls.pill, "fcc")}
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  <span className="mar_r-4">
                    <PeopleAlt />
                  </span>
                  {job.getJobByIdData?.applications?.length} Applications
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Something went wrong...</div>;
    }
  };

  return renderJobHeader();
};

export default PostingJobHeader;
