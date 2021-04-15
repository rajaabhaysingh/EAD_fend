import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

// assets
import error404 from "../../assets/img/error404.png";

// components
import Header from "../../components/header";
import Page from "../../components/mui/Page";

// styling
import { Button, makeStyles, Typography } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
  img: {
    width: "75%",
    margin: "64px 0 32px 0",
    maxWidth: "300px",
  },
}));

const Home = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const history = useHistory();

  return (
    <Page title="Error 404">
      <div className={cls.root}>
        <Header helper={helper} />
        <div className={globalCls.bodyRoot}>
          <div className="fccc f1 pad-8">
            <img className={cls.img} src={error404} alt="" />
            <Typography color="textSecondary" variant="h2">
              Error 404
            </Typography>
            <div className={clsx("mar_t-8 txtC", globalCls.txtSmSec)}>
              The page you're looking could not be found on our server. Please
              double check the url.
            </div>
            <Button
              color="primary"
              variant="contained"
              className={globalCls.marT32}
              onClick={() => history.push("/")}
            >
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
