import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Alert, AlertTitle } from "@material-ui/lab";

import { parseDate } from "../../../helpers/misc";
import { useHistory } from "react-router-dom";
import Loader from "../../../components/loader";

// keys
import { baseUrl } from "../../../config";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles((theme) => ({
  table: {
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: "border-box",
    borderCollapse: "separate",
    borderRadius: "8px",
    borderSpacing: "1px",
  },
  img: {
    height: "40px",
    width: "40px",
    borderRadius: "32px",
    objectFit: "cover",
    objectPosition: "center",
  },
  success: {
    color: theme.palette.common.white,
    background: theme.palette.success.main,
    padding: "4px 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    width: "60px",
    textAlign: "center",
    borderRadius: "20px",
  },
  rejected: {
    color: theme.palette.common.white,
    background: theme.palette.error.main,
    padding: "4px 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    width: "60px",
    textAlign: "center",
    borderRadius: "20px",
  },
  applied: {
    color: theme.palette.common.white,
    background: theme.palette.info.main,
    padding: "4px 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    width: "60px",
    textAlign: "center",
    borderRadius: "20px",
  },
  permanent: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  name: {
    // color: theme.palette.text.secondary,
    fontWeight: "bold",
    minWidth: "120px",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    borderBottom: `2px solid ${theme.palette.divider}`,
    cursor: "pointer",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.paper,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function CustomPaginationActionsTable({ applications }) {
  const classes = useStyles2();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(-1);
  const [rows, setRows] = React.useState([]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // updateRowsData
  React.useEffect(() => {
    if (applications?.getApplicationsSuccess) {
      setRows(applications.getApplicationsData);
    }
  }, [applications?.getApplicationsData]);

  return applications ? (
    rows.length > 0 ? (
      <TableContainer>
        <Table
          size="small"
          className={classes.table}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Job Icon</TableCell>
              <TableCell>Job name</TableCell>
              <TableCell>Applied on</TableCell>
              <TableCell>Pay scale</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow
                key={row._id}
                onClick={() =>
                  history.push(`/account/my-applications/${row._id}`)
                }
              >
                <TableCell align="center" component="th" scope="row">
                  <img
                    className={classes.img}
                    src={baseUrl + row.job.jobThumbnail}
                    alt=""
                  />
                </TableCell>
                <TableCell className={classes.name} component="th" scope="row">
                  {row.job.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {parseDate(row.createdAt)}
                </TableCell>
                <TableCell className={classes.name} component="th" scope="row">
                  ₹ {row.job.payscale}/{row.job.payscaleUnit}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.status === "accepted" ? (
                    <div className={classes.success}>ACCEPTED</div>
                  ) : row.status === "rejected" ? (
                    <div className={classes.rejected}>REJECTED</div>
                  ) : (
                    <div className={classes.applied}>APPLIED</div>
                  )}
                </TableCell>
              </StyledTableRow>
            ))}

            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    ) : (
      <Alert className="f1 mar_t-16" severity="info">
        <AlertTitle>NO APPLICATIONS AVAILABLE</AlertTitle>
        It seems that you have not applied under any jobs yet.
      </Alert>
    )
  ) : (
    <Loader />
  );
}
