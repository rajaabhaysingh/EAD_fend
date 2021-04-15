import React from "react";
import { useRouteMatch } from "react-router-dom";
import clsx from "clsx";
import getQueryParams from "../../../helpers/getQueryParams";
import ReactPaginate from "react-paginate";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../../styles/globalStyles";
import { Alert } from "@material-ui/lab";

// components
import Loader from "../../../components/loader";
import SearchJobCard from "../components/SearchJobCard";

// assets

// colors

// icons

// redux
import { getJobsByFilters } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "24px",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
    },
  },
  borB: {
    padding: "24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  results: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "24px",
    padding: "24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      padding: "0",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "0",
    },
  },
  pad: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
  pageContainer: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    margin: "0",
    padding: "16px",
  },
  page: {
    display: "inline-block",
    fontWeight: "bold",
    height: "32px",
    width: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px",
    cursor: "pointer",
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
  },
  action: {
    margin: "0 8px",
    fontWeight: "bold",
    height: "32px",
    width: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    cursor: "pointer",
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
  },
  breakCls: {
    padding: "8px",
    color: theme.palette.divider,
  },
  disabled: {
    color: theme.palette.divider,
    cursor: "not-allowed",
    background: theme.palette.background.paper,
  },
  link: {
    height: "32px",
    width: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  priCol: {
    color: theme.palette.primary.main,
  },
}));

const parseQueryString = (queryObj) => {
  let arr = [];
  for (let key in queryObj) {
    if (queryObj.hasOwnProperty(key)) {
      arr.push(key + "=" + queryObj[key]);
    }
  }
  return arr.join("&");
};

const SearchItems = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  // getting wuery parameters
  const urlParams = getQueryParams(window.location.search);

  const queryString = parseQueryString(urlParams);

  // fetch search results on each "query string" change
  React.useEffect(() => {
    dispatch(getJobsByFilters(queryString, 1));
  }, [queryString]);

  // handlePageChange
  const handlePageChange = (page) => {
    dispatch(getJobsByFilters(queryString, page.selected + 1));
  };

  return (
    <div className={cls.root}>
      <div className={cls.borB}>
        <div className={clsx(globalCls.txtLgSec, "fwb")}>
          {search.getSearchResultsData?.jobs?.length
            ? "Showing " +
              ((parseInt(search.getSearchResultsData.page) - 1) *
                parseInt(search.getSearchResultsData.limit) +
                1) +
              "-" +
              ((parseInt(search.getSearchResultsData.page) - 1) *
                parseInt(search.getSearchResultsData.limit) +
                1 +
                parseInt(search.getSearchResultsData.jobs.length) -
                1) +
              " of total " +
              search.getSearchResultsData.totalResults +
              " jobs found."
            : "Search results"}
        </div>
        <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
          Showing results for:{" "}
          <strong className={globalCls.txtSmPriCol}>
            "{urlParams.q ? urlParams.q : "All jobs"}"
          </strong>{" "}
          in{" "}
          <strong className={globalCls.txtSmPriCol}>
            "
            {urlParams.catId
              ? urlParams.category
                ? urlParams.category
                : urlParams.catId
              : "All categories"}
            "
          </strong>{" "}
          category.
        </div>
      </div>
      <div className={clsx(cls.borBPC, cls.results)}>
        {search.getSearchResultsLoading ? (
          <Loader />
        ) : search.getSearchResultsSuccess ? (
          search.getSearchResultsData?.jobs?.length > 0 ? (
            search.getSearchResultsData.jobs.map((job) => (
              <SearchJobCard job={job} key={job._id} />
            ))
          ) : (
            <Alert className="f1" variant="standard" severity="info">
              No results found for your serach query. Please try with different
              keyword(s).
            </Alert>
          )
        ) : (
          <Alert className="f1" variant="standard" severity="error">
            {search.getSearchResultsError}
          </Alert>
        )}
      </div>
      <div className="fcc">
        <ReactPaginate
          previousLabel={<i className="fas fa-chevron-left"></i>}
          nextLabel={<i className="fas fa-chevron-right"></i>}
          breakLabel={<i className="fas fa-ellipsis-h"></i>}
          breakClassName={globalCls.txtLgPriCol}
          pageCount={
            search.getSearchResultsData?.totalPages
              ? search.getSearchResultsData.totalPages
              : 0
          }
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={cls.pageContainer}
          activeClassName={cls.priCol}
          breakLinkClassName={cls.breakCls}
          pageClassName={cls.page}
          pageLinkClassName={cls.link}
          activeLinkClassName={globalCls.link}
          previousClassName={cls.action}
          nextClassName={cls.action}
          previousLinkClassName={cls.link}
          nextLinkClassName={cls.link}
          disabledClassName={cls.disabled}
        />
      </div>
    </div>
  );
};

export default SearchItems;
