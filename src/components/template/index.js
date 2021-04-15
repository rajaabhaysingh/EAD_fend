import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// styling
import { Button, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// components

// assets

// colors

// icons
import { MoreVert } from "@material-ui/icons";

// redux
import { themeAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Template = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        Component
      </Route>
    </Switch>
  );
};

export default Template;

// -------------------------------------
// =====================================
// -------------------------------------

import React from "react";

// components
import Header from "../../components/header";
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
    <Page title="Home">
      <div className={cls.root}>
        <Header helper={helper} />
        <div className={globalCls.bodyRoot}>scvf</div>
      </div>
    </Page>
  );
};

export default Home;

<i className="fas fa-map-marker-alt mar_r-4"></i>;
