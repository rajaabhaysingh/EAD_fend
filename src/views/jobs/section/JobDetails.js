import React from "react";
import clsx from "clsx";

// components
import Divider from "../../../components/misc/Divider";
import GoogleMapReact from "google-map-react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  withStyles,
} from "@material-ui/core";

// styling
import useGlobalStyles from "../../../styles/globalStyles";
import { parseDate, timeAgo } from "../../../helpers/misc";

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
  mapContainer: {
    width: "100%",
    height: "50vh",
    minHeight: "200px",
    borderRadius: "4px",
  },
  txt: {
    position: "absolute",
    transform: "translateY(-200%)",
    padding: "4px",
    borderRadius: "4px",
    backgroundColor: "#fff",
    whiteSpace: "nowrap",
  },
  mapBulb: {
    position: "absolute",
    transform: "translateY(-100%)",
    padding: "8px",
    borderRadius: "30px",
    background: theme.palette.error.main,
    border: "1px solid #fff",
    boxShadow: theme.shadows[4],
  },
  mapMarker: {
    position: "absolute",
    transform: "translateY(-50%)",
    background: theme.palette.error.main,
    padding: "1px",
    borderRadius: "2px",
    height: "12px",
    boxShadow: theme.shadows[4],
  },
  addBar: {
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: theme.palette.background.paperLight,
    color: theme.palette.text.primary,
  },
}));

const MarkerReactComponent = ({ text }) => {
  const cls = useStyles();

  return (
    <div className="fccc rel">
      <div className={cls.txt}>{text}</div>
      <div className={cls.mapBulb}></div>
      <div className={cls.mapMarker}></div>
    </div>
  );
};

const JobDetails = ({ job }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.paperLight,
      },
    },
  }))(TableRow);

  const defaultProps = {
    center: {
      lat: job.getJobByIdData?.location?.lat
        ? parseFloat(job.getJobByIdData.location.lat)
        : 0.001,
      lng: job.getJobByIdData?.location?.long
        ? parseFloat(job.getJobByIdData.location.long)
        : 0.001,
    },
    zoom: 12,
  };

  return (
    <div className={clsx(cls.root, "fcol", "mar_t-16")}>
      <div className={clsx("mar_b-16", cls.title)}>More Details</div>
      <Divider />
      <div className={clsx("fsm mar_t-16", globalCls.txtMdSec)}>
        <TableContainer>
          <Table className={cls.table} aria-label="details table" size="small">
            <TableBody>
              <StyledTableRow>
                <TableCell align="left">Posted</TableCell>
                <TableCell align="left">
                  {timeAgo(job.getJobByIdData?.createdAt)}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell align="left">Job category</TableCell>
                <TableCell align="left">
                  {job.getJobByIdData?.category?.categoryName}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell align="left">Job duration</TableCell>
                <TableCell align="left">
                  {job.getJobByIdData?.duration}{" "}
                  {job.getJobByIdData?.durationUnit}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell align="left">Permanent job</TableCell>
                <TableCell align="left">
                  {job.getJobByIdData?.isPermanent ? "Yes" : "No"}{" "}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell align="left">Quantity required</TableCell>
                <TableCell align="left">
                  {job.getJobByIdData?.reqQty} {job.getJobByIdData?.reqQtyUnit}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell align="left">Deadline</TableCell>
                <TableCell align="left">
                  {parseDate(job.getJobByIdData?.deadline)}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell align="left">Payscale</TableCell>
                <TableCell align="left">
                  {job.getJobByIdData?.payscale}/
                  {job.getJobByIdData?.payscaleUnit}
                </TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={clsx("mar_b-16 mar_t-32", cls.title)}>Location</div>
      <Divider />
      {job.getJobByIdData?.location && (
        <div className={clsx("mar_t-16", "fsm", cls.addBar)}>
          {job.getJobByIdData?.location?.addressLine
            ? job.getJobByIdData?.location?.addressLine + ", "
            : ""}
          {job.getJobByIdData?.location?.cityDistrictTown
            ? job.getJobByIdData?.location?.cityDistrictTown + ", "
            : ""}
          {job.getJobByIdData?.location?.state
            ? job.getJobByIdData?.location?.state + ", "
            : ""}
          {job.getJobByIdData?.location?.country}
          <br />
          <strong>Locality: </strong>
          {job.getJobByIdData?.location?.locality}
          <br />
          <strong>PIN Code: </strong>
          {job.getJobByIdData?.location?.pinCode}
        </div>
      )}
      <div className={clsx("fsm mar_t-16", cls.mapContainer)}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_PLACES_KEY,
            region: "in",
            libraries: ["places", "geometry", "drawing", "visualization"],
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <MarkerReactComponent
            lat={
              job.getJobByIdData?.location?.lat
                ? parseFloat(job.getJobByIdData.location.lat)
                : 0.001
            }
            lng={
              job.getJobByIdData?.location?.long
                ? parseFloat(job.getJobByIdData.location.long)
                : 0.001
            }
            text="Job location"
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default JobDetails;
