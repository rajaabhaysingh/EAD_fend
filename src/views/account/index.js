import React from "react";

// components
import Page from "../../components/mui/Page";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Home = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <Page title="Account">
      <div className={cls.root}>
        This is accounts page. It will have some different layout.
      </div>
    </Page>
  );
};

export default Home;
