import React, { useEffect } from "react";
import { Switch, useRouteMatch, NavLink } from "react-router-dom";
import PrivateRoute from "../../components/HOC/PrivateRoute";
import clsx from "clsx";

// styling
import { Hidden, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// components
import Header from "../../components/header";
import Overview from "./sections/Overview";
import Applications from "./sections/Applications";
import Postings from "./sections/Postings";
import Messages from "./sections/Messages";
import Loader from "../../components/loader";

// assets

// colors

// icons

// redux
import {
  getApplications,
  getPostings,
  getAddresses,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
  sideNav: {
    background: theme.palette.background.bg,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  navLink: {
    textDecoration: "none",
    width: "88px",
    padding: "16px 0",
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  borT: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  navLinkActive: {
    background: theme.palette.primary.main,
    color: "#fff",
  },
  accountBase: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "scroll",
  },
}));

const Account = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const helper = useSelector((state) => state.helper);
  const application = useSelector((state) => state.application);
  const postings = useSelector((state) => state.postings);

  // load postings and applications on component mount
  useEffect(() => {
    dispatch(getApplications());
    dispatch(getPostings());
    dispatch(getAddresses());
  }, []);

  return (
    <div className={cls.root}>
      <Header helper={helper} />
      <div
        className={
          helper.marginTop
            ? clsx(globalCls.bodyRoot, globalCls.bodyRootTransform)
            : globalCls.bodyRoot
        }
      >
        <div className="f h-100 of_scr">
          <Hidden smDown>
            <div className={clsx("fcolbw", cls.sideNav)}>
              <div className="fcol">
                <NavLink
                  exact
                  to="/account"
                  className={cls.navLink}
                  activeClassName={cls.navLinkActive}
                >
                  <div className="fccc">
                    <i className="fas mar_b-4 fsxl fa-info-circle"></i>
                    Profile
                  </div>
                </NavLink>
                <NavLink
                  exact
                  to="/account/my-postings"
                  className={cls.navLink}
                  activeClassName={cls.navLinkActive}
                >
                  <div className="fccc">
                    <i className="fas mar_b-4 fsxl fa-briefcase mar_r-4"></i>
                    Postings
                  </div>
                </NavLink>
                <NavLink
                  exact
                  to="/account/my-applications"
                  className={cls.navLink}
                  activeClassName={cls.navLinkActive}
                >
                  <div className="fccc">
                    <i className="fas mar_b-4 fsxl fa-file-contract mar_r-4"></i>
                    Applications
                  </div>
                </NavLink>
                <NavLink
                  exact
                  to="/account/messages"
                  className={cls.navLink}
                  activeClassName={cls.navLinkActive}
                >
                  <div className="fccc">
                    <i className="fas mar_b-4 fsxl fa-envelope mar_r-4"></i>
                    Message
                  </div>
                </NavLink>
              </div>
              <NavLink
                exact
                to="/premium"
                className={clsx(cls.navLink, cls.borT)}
                activeClassName={cls.navLinkActive}
              >
                <div className="fccc">
                  <i className="fas fsxl fa-info-circle"></i>
                  Premium
                </div>
              </NavLink>
            </div>
          </Hidden>
          <div className={clsx(cls.accountBase, "sb_hid")}>
            {application.getApplicationsLoading ||
            postings.getPostingsLoading ? (
              <Loader />
            ) : (
              <Switch>
                <PrivateRoute path={path} exact component={Overview} />
                <PrivateRoute
                  path={`${path}/my-applications`}
                  component={Applications}
                />
                <PrivateRoute
                  path={`${path}/my-postings`}
                  component={Postings}
                />
                <PrivateRoute path={`${path}/messages`} component={Messages} />
              </Switch>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
