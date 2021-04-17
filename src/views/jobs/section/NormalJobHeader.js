import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

// components
import Loader from "../../../components/loader";

// styling
import { Button, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// misc
import { generateName, parseDate } from "../../../helpers/misc";
import {
  PeopleAlt,
  PersonAdd,
  Settings,
  Share,
  Visibility,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    padding: "24px",
    borderRadius: "16px",
    border: `16px solid ${theme.palette.divider}`,
    display: "flex",
    flex: "1",
    boxShadow: theme.shadows[4],
    [theme.breakpoints.down("sm")]: {
      padding: "4px",
      borderRadius: "0",
      border: "none",
      boxShadow: "none",
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

const NormalJobHeader = ({ job, apply }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const history = useHistory();

  // renderApplyButton
  const renderApplyButton = () => {
    if (
      job.applyOnJobSuccess &&
      job.applyOnJobContextId === job.getJobByIdData?._id
    ) {
      return (
        <Button variant="contained" color="primary" size="small" type="button">
          Already applied
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={apply}
          disabled={job.applyOnJobLoading}
          type="submit"
        >
          Apply now
        </Button>
      );
    }
  };

  // renderJobHeader
  const renderJobHeader = () => {
    if (job.getJobByIdLoading) {
      return <Loader />;
    } else if (job.getJobByIdSuccess) {
      return (
        <div className={clsx(cls.root, globalCls.pclr_mobtb)}>
          <img
            src={
              process.env.REACT_APP_BASE_URL + job.getJobByIdData?.jobThumbnail
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
                  {generateName(
                    job.getJobByIdData?.owner?.firstName,
                    job.getJobByIdData?.owner?.middleName,
                    job.getJobByIdData?.owner?.lastName
                  )}
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-16")}>
                  <i className="fas fa-map-marker-alt w-20p"></i>{" "}
                  {job.getJobByIdData?.location?.pinCode || "N/A"},{" "}
                  {job.getJobByIdData?.location?.cityDistrictTown || "N/A"}
                </div>
                <div className={clsx(globalCls.txtMdSec, "fwb", "mar_t-4")}>
                  <i className="fas fa-rupee-sign w-20p"></i>{" "}
                  {job.getJobByIdData?.payscale || "N/A"}/
                  {job.getJobByIdData?.payscaleUnit || "N/A"}
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-4")}>
                  <i className="far fa-user w-20p"></i> Vacancy:{" "}
                  {job.getJobByIdData?.reqQty || "N/A"}
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-4")}>
                  <i className="far fa-calendar w-20p"></i> Deadline:{" "}
                  {parseDate(job.getJobByIdData?.deadline)}
                </div>
              </div>
              <div className="fcol mar_l-16">
                {job.getJobByIdData?.applications && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Settings />}
                    size="small"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  className={globalCls.marT8}
                  variant="outlined"
                  color="secondary"
                  startIcon={<PersonAdd />}
                >
                  Follow
                </Button>
                <Button
                  className={globalCls.marT8}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  startIcon={<Share />}
                >
                  Share
                </Button>
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
                {job.getJobByIdData?.applications ? (
                  <Button
                    className={globalCls.marL8}
                    color="primary"
                    variant="outlined"
                    startIcon={<PeopleAlt />}
                    size="small"
                    onClick={() =>
                      history.push(
                        `/account/my-postings/${job.getJobByIdData._id}`
                      )
                    }
                  >
                    {job.getJobByIdData?.applications?.length} Applied
                  </Button>
                ) : (
                  <div
                    className={clsx(globalCls.marL8, globalCls.pill, "fcc")}
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    <span className="mar_r-4">
                      <PeopleAlt />
                    </span>
                    {job.getJobByIdData?.applicationCount} Applied
                  </div>
                )}
              </div>
              <div className="f mar_l-16">{renderApplyButton()}</div>
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

export default NormalJobHeader;
