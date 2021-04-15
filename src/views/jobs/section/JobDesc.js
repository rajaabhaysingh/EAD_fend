import React from "react";
import clsx from "clsx";

// components
import Divider from "../../../components/misc/Divider";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
    padding: "24px",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "16px",
    display: "flex",
    flex: "1",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
      borderRadius: "4px",
    },
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    fontSize: "1.2rem",
    whiteSpace: "wrap",
  },
}));

const JobDesc = ({ job }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={clsx(cls.root, "fcol", "mar_t-32")}>
      <div className={clsx("mar_b-16", cls.title)}>Description</div>
      <Divider />
      <div className={clsx("fsm mar_t-16", globalCls.txtMdSec)}>
        {job.getJobByIdData?.desc}
      </div>
      {job.getJobByIdData?.prerequisites?.length > 0 && (
        <>
          <div className={clsx("mar_b-16 mar_t-32", cls.title)}>
            Requirements
          </div>
          <Divider />
          <ul className={clsx("fsm mar_t-16 fcol", globalCls.txtMdSec)}>
            {job.getJobByIdData.prerequisites.map((prereq, i) => (
              <li key={i} className="mar_t-4">
                {prereq}
              </li>
            ))}
          </ul>
        </>
      )}
      {job.getJobByIdData?.facilities?.length > 0 && (
        <>
          <div className={clsx("mar_b-16 mar_t-32", cls.title)}>Facilities</div>
          <Divider />
          <ul className={clsx("fsm mar_t-16 fcol", globalCls.txtMdSec)}>
            {job.getJobByIdData.facilities.map((facility, i) => (
              <li key={i} className="mar_t-4">
                <strong>{facility.key}:</strong> {facility.value}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default JobDesc;
