import React from "react";
import clsx from "clsx";

// components
import Loader from "../../../components/loader";

// styling
import { Button, IconButton, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

// misc
import { parseDate } from "../../../helpers/misc";
import { Chat } from "@material-ui/icons";

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

const PostingJobHeader = ({ application }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  // renderJobHeader
  const renderJobHeader = () => {
    if (application.getAppByIdLoading) {
      return <Loader />;
    } else if (application.getAppByIdSuccess) {
      return (
        <div className={clsx(cls.root, globalCls.pclr_mobtb)}>
          <img
            src={baseUrl + application.getAppByIdData?.job?.jobThumbnail}
            className={cls.img}
            alt=""
          />
          <div className={clsx("f1bwcol", globalCls.pcMarL_mobMarT32)}>
            <div className="fbw">
              <div className="fcol">
                <div className={clsx(cls.title)}>
                  {application.getAppByIdData?.job?.name || "Not available"}
                </div>
                <div className={clsx(globalCls.txtMdPriCol, "mar_t-8", "fwb")}>
                  posted by you
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-16", "f")}>
                  <i className="fas fa-map-marker-alt w-28p mar_t-4"></i>
                  <div className="fc">
                    {application.getAppByIdData?.job?.location?.name || "N/A"},{" "}
                    {application.getAppByIdData?.job?.location?.addressLine ||
                      "N/A"}
                    ,{" "}
                    {application.getAppByIdData?.job?.location?.landmark ||
                      "N/A"}
                    ,{" "}
                    {application.getAppByIdData?.job?.location
                      ?.cityDistrictTown || "N/A"}
                    ,{" "}
                    {application.getAppByIdData?.job?.location?.state || "N/A"},{" "}
                    {application.getAppByIdData?.job?.location?.country ||
                      "N/A"}
                    ,{" "}
                    {application.getAppByIdData?.job?.location?.pinCode ||
                      "N/A"}
                  </div>
                </div>
                <div className={clsx(globalCls.txtMdSec, "fwb", "mar_t-4")}>
                  <i className="fas fa-rupee-sign w-28p"></i>
                  {application.getAppByIdData?.job?.payscale || "N/A"}/
                  {application.getAppByIdData?.job?.payscaleUnit || "N/A"}
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-4")}>
                  <i className="far fa-user w-28p"></i>Vacancy:
                  {application.getAppByIdData?.job?.reqQty || "N/A"}
                </div>
                <div className={clsx(globalCls.txtMdSec, "mar_t-4")}>
                  <i className="far fa-calendar w-28p"></i>Deadline:
                  {parseDate(application.getAppByIdData?.job?.deadline)}
                </div>
              </div>
            </div>
            <div className="fc">
              <Button
                color="primary"
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<Chat />}
                onClick={() => {
                  alert("Coming soon!");
                }}
              >
                Message
              </Button>
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
