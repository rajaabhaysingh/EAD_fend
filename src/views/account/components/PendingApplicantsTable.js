import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import Loader from "../../../components/loader";
import {
  Avatar,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import getInitials from "../../../helpers/getInitials";
import { generateName, parseDate } from "../../../helpers/misc";
import clsx from "clsx";
import useGlobalStyles from "../../../styles/globalStyles";
import Divider from "../../../components/misc/Divider";
import { useDispatch } from "react-redux";
import { changeAppStatus } from "../../../redux/actions";
import RenderStars from "../../../components/ratings/RenderStars";
import netRating from "../../../helpers/netRating";
import { Alert, AlertTitle } from "@material-ui/lab";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: "border-box",
    borderCollapse: "separate",
    borderRadius: "8px",
    borderSpacing: "1px",
  },
  avail: {
    padding: "4px",
    borderRadius: "10px",
    background: theme.palette.success.main,
  },
  unAvail: {
    padding: "5px",
    borderRadius: "10px",
    background: theme.palette.error.main,
  },
  chip: {
    color: theme.palette.common.white,
    padding: "4px 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    width: "60px",
    textAlign: "center",
    borderRadius: "20px",
  },
  applied: {
    background: theme.palette.info.main,
  },
  accepted: {
    background: theme.palette.success.main,
  },
  pending: {
    background: theme.palette.warning.main,
  },
  rejected: {
    background: theme.palette.error.main,
  },
  unknown: {
    background: theme.palette.warning.main,
  },
  errTxt: {
    color: theme.palette.error.main,
    fontSize: "0.7rem",
    marginTop: "8px",
  },
  file: {
    padding: "4px 8px",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    marginBottom: "8px",
    color: theme.palette.primary.main,
    fontSize: "0.8rem",
    maxWidth: "300px",
    overflow: "hidden",
    textDecoration: "none",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    // borderBottom: `2px solid ${theme.palette.divider}`,
    // "& > *": {
    //   borderBottom: "unset",
    // },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(TableRow);

function Row({ row, job }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(row.status);

  const classes = useRowStyles();
  const globalCls = useGlobalStyles();
  const dispatch = useDispatch();

  // handleChange
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  // handleStatusChange
  const handleStatusChange = (e) => {
    e.preventDefault();

    // dispatch status change
    dispatch(
      changeAppStatus(
        {
          applicationId: row._id,
          status: status,
        },
        row._id
      )
    );
  };

  // renderStatus
  const renderStatus = (status) => {
    if (status === "applied") {
      return (
        <div className={clsx(classes.chip, classes.applied)}>{status}</div>
      );
    } else if (status === "accepted") {
      return (
        <div className={clsx(classes.chip, classes.accepted)}>{status}</div>
      );
    } else if (status === "rejected") {
      return (
        <div className={clsx(classes.chip, classes.rejected)}>{status}</div>
      );
    } else {
      return (
        <div className={clsx(classes.chip, classes.unknown)}>{status}</div>
      );
    }
  };

  return (
    <React.Fragment>
      <StyledTableRow>
        <TableCell align="center">
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <div className="fc">
            <Avatar
              className={classes.avatar}
              src={baseUrl + row.user?.profilePicture}
            >
              {getInitials(
                generateName(
                  row.user?.firstName,
                  row.user?.middleName,
                  row.user?.lastName
                )
              )}
            </Avatar>
            <div className="fcol mar_l-8">
              <div className="fwb">
                {generateName(
                  row.user?.firstName,
                  row.user?.middleName,
                  row.user?.lastName
                )}
              </div>
              <div className={clsx("fc", classes.priCol)}>
                <RenderStars numOfStar={netRating(row.ratings)} />
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell align="right">{parseDate(row.createdAt)}</TableCell>
        <TableCell align="right">{parseDate(row.availableTill)}</TableCell>
        <TableCell align="right">{row.coverLetter.length}</TableCell>
        <TableCell align="right">{row.payments.length}</TableCell>
        <TableCell align="right">{renderStatus(row.status)}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div
                className={clsx(globalCls.txtLgSec, "mar_t-48", "mar_b-8 fwb")}
              >
                Applicantion detail
              </div>
              <Divider />
              <div
                className={clsx(
                  globalCls.txtMdPriCol,
                  "mar_t-32",
                  "mar_b-8 fwb"
                )}
              >
                Documents provided
              </div>
              {row.coverLetter.map((doc) => (
                <a
                  href={`${baseUrl}${doc.file}`}
                  target="_blank"
                  className={classes.file}
                  key={doc._id}
                >
                  {doc.file.split("___").pop()}
                  <i className="fas fa-external-link-alt mar_l-12"></i>
                </a>
              ))}
              <div
                className={clsx(
                  globalCls.txtMdPriCol,
                  "mar_t-32",
                  "mar_b-8 fwb"
                )}
              >
                Change Status
              </div>
              <form className="fc" onSubmit={handleStatusChange}>
                <FormControl
                  className={globalCls.marT16}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel id="application-status-label">
                    Application status
                  </InputLabel>
                  <Select
                    labelId="application-status-label"
                    id="application-status-select"
                    value={status}
                    onChange={handleChange}
                    labelWidth={130}
                  >
                    <MenuItem value={"applied"}>Applied</MenuItem>
                    <MenuItem value={"accepted"}>Accepted</MenuItem>
                    <MenuItem value={"rejected"}>Rejected</MenuItem>
                  </Select>
                  <FormHelperText className={classes.errTxt}>
                    *Rejected applications will be deleted.
                  </FormHelperText>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  className={globalCls.marL8}
                  style={{ marginTop: "-10px" }}
                  type="submit"
                  disabled={job.changeAppStatusLoading}
                >
                  UPDATE
                </Button>
              </form>
              {job.changeAppStatusError &&
                job.changeAppStatusErrorContextId === row._id && (
                  <Alert className="f1 mar_t-16" severity="error">
                    <AlertTitle>ERROR</AlertTitle>
                    {job.changeAppStatusError}
                  </Alert>
                )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ job }) {
  const classes = useRowStyles();

  const [rows, setRows] = React.useState([]);

  // update rows data on each job fetch
  React.useEffect(() => {
    if (job?.getJobByIdSuccess) {
      setRows(job.applicationData.pendingApp);
    }
  }, [job?.applicationData]);

  return job ? (
    rows.length > 0 ? (
      <TableContainer>
        <Table
          aria-label="collapsible table"
          className={classes.table}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ minWidth: "180px" }}>User</TableCell>
              <TableCell style={{ minWidth: "100px" }} align="right">
                Applied on
              </TableCell>
              <TableCell style={{ minWidth: "100px" }} align="right">
                Available Till
              </TableCell>
              <TableCell align="right">Docs provided</TableCell>
              <TableCell align="right">Payments done</TableCell>
              <TableCell style={{ width: "72px" }} align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row._id} row={row} job={job} />
            ))}
          </TableBody>
        </Table>
        {job.changeAppStatusLoading && <Loader />}
      </TableContainer>
    ) : (
      <Alert className="f1 mar_t-16" severity="info">
        <AlertTitle>NO PENDING APPLICATIONS</AlertTitle>
        It seems you dont have any pending applications.
      </Alert>
    )
  ) : (
    <Loader />
  );
}
