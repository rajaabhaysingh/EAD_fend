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
  TextField,
} from "@material-ui/core";
import getInitials from "../../../helpers/getInitials";
import { generateName, parseDate } from "../../../helpers/misc";
import clsx from "clsx";
import useGlobalStyles from "../../../styles/globalStyles";
import Divider from "../../../components/misc/Divider";
import RenderStars from "../../../components/ratings/RenderStars";
import netRating from "../../../helpers/netRating";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Chat } from "@material-ui/icons";

// redux
import { useDispatch, useSelector } from "react-redux";
import { changeAppStatus, initiatePayment } from "../../../redux/actions";
import PaymentDetailBox from "./PaymentDetailBox";

// --- helper function to download script ---
// loadScript
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

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
  priCol: {
    color: theme.palette.primary.main,
    fontSize: "0.7rem",
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
  // row: individual application
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(row.status);
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [paymentForm, setPaymentForm] = React.useState({
    amount: "",
    desc: "",
  });

  const classes = useRowStyles();
  const globalCls = useGlobalStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const payment = useSelector((state) => state.payment);

  // handleChange
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  // handleFormChange
  const handleFormChange = (e, label) => {
    setPaymentForm({
      ...paymentForm,
      [label]: e.target.value,
    });
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

  // =============== PAYMENTS ==============
  // proceedCheckout
  const proceedCheckout = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Payment SDK failed to load. Make sure your internet connection is active."
      );
      return;
    }

    // proceed
    const options = {
      name: "Workgent",
      description: "Job payment",
      // after successful payment
      handler: (response) => {
        // console.log(response);
        alert("Payment successful.");
      },
      prefill: {
        name: auth.user?.middleName
          ? auth.user?.firstName +
            " " +
            auth.user?.middleName +
            " " +
            auth.user?.lastName
          : auth.user?.firstName + " " + auth.user?.lastName,
        email: auth.user?.email,
      },
      amount: paymentForm.amount,
      desc: paymentForm.desc,
      applicationId: row._id,
    };

    // dispatch create order action
    dispatch(initiatePayment(options, row._id));
  };
  // =======================================

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
              src={process.env.REACT_APP_BASE_URL + row.user?.profilePicture}
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
        <TableCell align="center">
          <IconButton
            color="primary"
            aria-label="expand row"
            onClick={() => {}}
          >
            <Chat />
          </IconButton>
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
                className={clsx(globalCls.txtMdPri, "mar_t-32", "mar_b-8 fwb")}
              >
                Documents provided
              </div>
              {row.coverLetter.map((doc) => (
                <a
                  href={`${process.env.REACT_APP_BASE_URL}${doc.file}`}
                  target="_blank"
                  className={classes.file}
                  key={doc._id}
                >
                  {doc.file.split("___").pop()}
                  <i className="fas fa-external-link-alt mar_l-12"></i>
                </a>
              ))}
              <div
                className={clsx(globalCls.txtMdPri, "mar_t-32", "mar_b-8 fwb")}
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
                    className="fsm"
                  >
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
              <div
                className={clsx(globalCls.txtLgSec, "mar_t-48", "mar_b-8 fwb")}
              >
                Payment detail
              </div>
              <Divider />
              {showPaymentForm ? (
                <div style={{ maxWidth: "320px" }} className="fcol mar_t-16">
                  <TextField
                    className={clsx(globalCls.marT16, "fsm")}
                    type="number"
                    label="Payable amount in ₹"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={paymentForm.amount}
                    onChange={(e) => handleFormChange(e, "amount")}
                  />
                  <TextField
                    className={clsx(globalCls.marT16, "fsm")}
                    type="text"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={paymentForm.desc}
                    onChange={(e) => handleFormChange(e, "desc")}
                  />
                  {payment.createPaymentError &&
                    payment.createPaymentContextId === row._id && (
                      <Alert severity="error" className="mar_t-16">
                        {payment.createPaymentError}
                      </Alert>
                    )}
                  <div className="fend mar_t-16">
                    <Button
                      color="secondary"
                      onClick={() => setShowPaymentForm(false)}
                    >
                      CANCEL
                    </Button>
                    <Button
                      className={globalCls.marL8}
                      variant="contained"
                      color="primary"
                      disabled={
                        row.status !== "accepted" ||
                        payment.createPaymentLoading
                      }
                      onClick={proceedCheckout}
                    >
                      {payment.createPaymentLoading ? "LOADING" : "PROCEED"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  style={{
                    width: "190px",
                    whiteSpace: "nowrap",
                    marginTop: "32px",
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={row.status !== "accepted"}
                  onClick={() => setShowPaymentForm(true)}
                >
                  MAKE NEW PAYMENT
                </Button>
              )}

              <div className={classes.errTxt}>
                * Payments can only be made on accepted applications.
              </div>
              <div
                className={clsx(globalCls.txtMdPri, "mar_t-32", "mar_b-8 fwb")}
              >
                Payment history
              </div>
              <div className="fcol mar_t-32">
                {row.payments.length > 0 ? (
                  row.payments.map((paymentObj) => (
                    <PaymentDetailBox
                      paymentObj={paymentObj}
                      key={paymentObj._id}
                    />
                  ))
                ) : (
                  <Alert severity="info">
                    You have not made any payments yet.
                  </Alert>
                )}
              </div>
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
      setRows(job.applicationData.acceptedApp);
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
              <TableCell align="center">Chat</TableCell>
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
        <AlertTitle>NO ACCEPTED APPLICATIONS</AlertTitle>
        It seems you have not accepted any applications yet.
      </Alert>
    )
  ) : (
    <Loader />
  );
}
