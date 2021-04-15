import React from "react";

// components
import Page from "../../components/mui/Page";
import SearchFilters from "./components/SearchFilters";
import SearchItems from "./section/SearchItems";
import Footer from "../../components/footer/Footer";

// styling
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const SearchResults = () => {
  const cls = useStyles();

  return (
    <Page title="Wilswork | Search jobs">
      <div className={cls.root}>
        <SearchFilters />
        <SearchItems />
        <div className="mar_t-32 w-100">
          <Footer />
        </div>
      </div>
    </Page>
  );
};

export default SearchResults;
