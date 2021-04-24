import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import clsx from "clsx";

// styling
import {
  Button,
  Divider,
  Hidden,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Modal,
} from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// components
import LocationAutoComplete from "./LocationAutoComplete";
import { Divide as Hamburger } from "hamburger-react";
import SideDrawer from "./SideDrawer";

// assets
import logoLight from "../../assets/img/logo_light.png";
import logoDark from "../../assets/img/logo_dark.png";

// colors
import { paperLightLight, paperLightDark } from "../../styles/colors";

// icons
import {
  AccountCircle,
  AccountCircleTwoTone,
  BallotTwoTone,
  Brightness4TwoTone,
  BrightnessHighTwoTone,
  CloseTwoTone,
  DescriptionTwoTone,
  EmailTwoTone,
  LanguageTwoTone,
  MoreVert,
  NotificationsActiveTwoTone,
  SearchTwoTone,
} from "@material-ui/icons";

// redux
import { themeAction, logout, changeMargin } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../helpers/misc";

const useStyles = makeStyles((theme) => ({
  searchVisible: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "84px",
      transition: "ease-in 0.25s",
    },
  },
  searchHidden: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
  },
  headerMain: {
    backgroundColor: theme.palette.background.bg,
    width: "100%",
    minHeight: "60px",
    boxShadow: theme.shadows[1],
    padding: "0 8px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.bg,
      color: theme.palette.text.white,
      borderBottom:
        theme.palette.type === "light"
          ? "none"
          : `1px solid ${theme.palette.divider}`,
    },
  },
  logo: {
    marginLeft: "16px",
    height: "32px",
    width: "203px",
    backgroundImage:
      theme.palette.type === "light" ? `url(${logoDark})` : `url(${logoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "24px",
      width: "152px",
      marginLeft: "8px",
      backgroundImage: `url(${logoLight})`,
    },
  },
  subheader: {
    width: "100%vw",
    height: "32px",
    padding: "0 24px",
    boxShadow: theme.shadows[6],
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.background.bg
        : theme.palette.background.paperLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  locationText: {
    fontSize: "0.85rem",
    color: theme.palette.primary.main,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    overflow: "scroll",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px",
      height: "28px",
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  searchBar: {
    marginRight: "16px",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding:
        theme.palette.type === "light" ? "0 8px 8px 8px" : "8px 8px 8px 8px",
      boxSizing: "border-box",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.bg,
      boxShadow: `0 4px 4px -2px rgba(0,0,0,0.35)`,
      width: "100vw",
    },
  },
  modal: {
    backgroundColor: theme.palette.background.bg,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "90vw",
    maxWidth: "620px",
    maxHeight: "70vh",
    overflowY: "scroll",
    zIndex: 99999,
    marginTop: "60px",
  },
}));

const Header = ({}) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const helper = useSelector((state) => state.helper);

  // local state management
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [moreOptAnchorEl, setMoreOptAnchorEl] = useState(null);
  const [moreOptPcAnchorEl, setMoreOptPcAnchorEl] = useState(null);
  const [mobSearchVisible, setMobSearchVisible] = useState(
    helper.marginTop ? true : false
  );

  const moreOptionOpen = Boolean(moreOptAnchorEl);
  const moreOptionPcOpen = Boolean(moreOptPcAnchorEl);

  // headerlinks
  const headerlinks = [
    {
      title: "Home",
      link: "/",
      icon: <i className="fas fa-home mar_r-4"></i>,
    },
    {
      title: "All jobs",
      link: "/jobs",
      icon: <i className="fas fa-briefcase mar_r-4"></i>,
    },
    {
      title: "Job Categories",
      link: "/categories",
      icon: <i className="fas fa-th mar_r-4"></i>,
    },
    {
      title: "Training program",
      link: "/training",
      icon: <i className="fas fa-chalkboard-teacher mar_r-4"></i>,
    },
    {
      title: "About",
      link: "/about",
      icon: <i className="fas fa-info-circle mar_r-4"></i>,
    },
    {
      title: "Contacts",
      link: "/contact",
      icon: <i className="fas fa-headset mar_r-4"></i>,
    },
  ];

  // --- topbar menu operations ---
  const handleMoreOptionsClick = (event) => {
    if (mobSearchVisible) {
      setMobSearchVisible(false);
      // dispatch(changeMargin(false));
    }
    setMoreOptAnchorEl(event.currentTarget);
  };

  const handlePcMoreOptionsClick = (event) => {
    setMoreOptPcAnchorEl(event.currentTarget);
  };

  const handleMoreOptClose = () => {
    setMoreOptAnchorEl(null);
  };

  const handleMoreOptPcClose = () => {
    setMoreOptPcAnchorEl(null);
  };

  // handleThemeToggle
  const handleThemeToggle = () => {
    if (helper.themeName === "light") {
      dispatch(themeAction("dark"));
    } else {
      dispatch(themeAction("light"));
    }
    handleMoreOptClose();
  };

  // handleSearchSubmit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    history.push(`/jobs?q=${searchText}`);
  };

  // handleMobSearchToggle
  const handleMobSearchToggle = () => {
    setMobSearchVisible(!mobSearchVisible);

    if (mobSearchVisible) {
      dispatch(changeMargin(false));
    } else {
      dispatch(changeMargin(true));
    }

    if (moreOptionOpen) {
      setMoreOptAnchorEl(null);
    }
  };

  // handleLogout
  const handleLogout = () => {
    dispatch(logout(history));
  };

  // renderSearchBar
  const renderSearchBar = () => {
    return (
      <>
        <form className={cls.searchBar} onSubmit={handleSearchSubmit}>
          <input
            className={globalCls.inputSearch}
            type="text"
            name="searchText"
            placeholder="Search jobs"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className={globalCls.searchBtn}>
            <SearchTwoTone />
          </button>
        </form>
        <Hidden mdUp implementation="css">
          <div
            className={clsx(cls.locationText, "sb_hid")}
            onClick={() => setLocationOpen(true)}
          >
            <i className="fas fa-map-marker-alt mar_r-8"></i>
            <span className={globalCls.simpleLabel}>Current location: </span>
            <span className="ellipsis" style={{ maxWidth: "300px" }}>
              {helper.fetchLocationData?.location?.address
                ? helper.fetchLocationData.location.address
                : "All India (default)"}
            </span>
          </div>
        </Hidden>
      </>
    );
  };

  return (
    <div className={cls.searchHidden} style={{ zIndex: "9999" }}>
      <div className={cls.headerMain}>
        <div className="fc">
          {/* mob view */}
          <Hidden mdUp implementation="css">
            <Hamburger
              rounded
              size={24}
              label="Show menu"
              toggled={isMenuOpen}
              toggle={setMenuOpen}
              hideOutline={false}
            />
            <SideDrawer
              isMenuOpen={isMenuOpen}
              setMenuOpen={setMenuOpen}
              headerlinks={headerlinks}
            />
          </Hidden>
          <Link to="/" className="fc">
            <div className={cls.logo}></div>
          </Link>
          <Hidden smDown implementation="css">
            <div className="mar_l-32 tagline">Because work is life</div>
          </Hidden>
        </div>
        <div className="fc">
          {/* for mobile */}
          <Hidden mdUp implementation="css">
            <IconButton color="inherit" onClick={handleMobSearchToggle}>
              {mobSearchVisible ? <CloseTwoTone /> : <SearchTwoTone />}
            </IconButton>
            <IconButton color="inherit" onClick={handleMoreOptionsClick}>
              <MoreVert />
            </IconButton>
            {isLoggedIn() ? (
              <Menu
                anchorEl={moreOptAnchorEl}
                keepMounted
                open={moreOptionOpen}
                onClose={handleMoreOptClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                    marginTop: "60px",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    border: `1px solid rgba(0,0,0,0.25)`,
                    boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                    backgroundColor:
                      helper.themeName === "light"
                        ? paperLightLight
                        : paperLightDark,
                  },
                }}
              >
                <MenuItem className={globalCls.menuItemPri}>
                  <div className="fc fsm">
                    <NotificationsActiveTwoTone color="primary" />
                    <div className="fs mar_l-12">Notifications</div>
                  </div>
                </MenuItem>
                <Divider className={globalCls.marTB_8} />
                <MenuItem className={globalCls.menuItemPri}>
                  <div className="fc fsm">
                    <LanguageTwoTone color="primary" />
                    <div className="fs mar_l-12">Language</div>
                  </div>
                </MenuItem>
                <MenuItem
                  className={globalCls.menuItemPri}
                  onClick={handleThemeToggle}
                >
                  {helper.themeName === "light" ? (
                    <div className="fc fsm">
                      <Brightness4TwoTone color="primary" />
                      <div className="fs mar_l-12">Dark Mode</div>
                    </div>
                  ) : (
                    <div className="fc fsm">
                      <BrightnessHighTwoTone color="primary" />
                      <div className="fs mar_l-12">Light mode</div>
                    </div>
                  )}
                </MenuItem>
                <Divider className={globalCls.marTB_8} />
                <MenuItem onClick={handleLogout}>
                  <Button fullWidth variant="contained">
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                anchorEl={moreOptAnchorEl}
                keepMounted
                open={moreOptionOpen}
                onClose={handleMoreOptClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                    marginTop: "60px",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    border: `1px solid rgba(0,0,0,0.25)`,
                    boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                    backgroundColor:
                      helper.themeName === "light"
                        ? paperLightLight
                        : paperLightDark,
                  },
                }}
              >
                <MenuItem onClick={() => history.push("/login")}>
                  <Button fullWidth variant="contained">
                    Login/Signup
                  </Button>
                </MenuItem>
              </Menu>
            )}
          </Hidden>
          {/* for pc */}
          <Hidden smDown implementation="css">
            <div className="fc">
              {renderSearchBar()}
              <IconButton color="primary">
                <LanguageTwoTone />
              </IconButton>
              <IconButton color="primary" onClick={handleThemeToggle}>
                {helper.themeName === "light" ? (
                  <Brightness4TwoTone />
                ) : (
                  <BrightnessHighTwoTone />
                )}
              </IconButton>
              <IconButton color="primary" onClick={handlePcMoreOptionsClick}>
                <AccountCircle />
              </IconButton>
              {isLoggedIn() ? (
                <Menu
                  anchorEl={moreOptPcAnchorEl}
                  keepMounted
                  open={moreOptionPcOpen}
                  onClose={handleMoreOptPcClose}
                  PaperProps={{
                    style: {
                      width: "20ch",
                      marginTop: "92px",
                      boxSizing: "border-box",
                      borderRadius: "4px",
                      border: `1px solid rgba(0,0,0,0.25)`,
                      boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                      backgroundColor:
                        helper.themeName === "light"
                          ? paperLightLight
                          : paperLightDark,
                    },
                  }}
                >
                  <MenuItem className={globalCls.menuItemPri}>
                    <div className="fc fsm">
                      <NotificationsActiveTwoTone color="primary" />
                      <div className="fs mar_l-12">Notifications</div>
                    </div>
                  </MenuItem>
                  <MenuItem className={globalCls.menuItemPri}>
                    <div className="fc fsm">
                      <EmailTwoTone color="primary" />
                      <div className="fs mar_l-12">Messages</div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={globalCls.menuItemPri}
                    onClick={() => history.push("/account")}
                  >
                    <div className="fc fsm">
                      <AccountCircleTwoTone color="primary" />
                      <div className="fs mar_l-12">Account</div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={globalCls.menuItemPri}
                    onClick={() => history.push("/account/my-applications")}
                  >
                    <div className="fc fsm">
                      <DescriptionTwoTone color="primary" />
                      <div className="fs mar_l-12">My Applications</div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={globalCls.menuItemPri}
                    onClick={() => history.push("/account/my-postings")}
                  >
                    <div className="fc fsm">
                      <BallotTwoTone color="primary" />
                      <div className="fs mar_l-12">My Postings</div>
                    </div>
                  </MenuItem>
                  <Divider className={globalCls.marTB_8} />
                  <MenuItem onClick={handleLogout}>
                    <Button fullWidth variant="contained">
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              ) : (
                <Menu
                  anchorEl={moreOptPcAnchorEl}
                  keepMounted
                  open={moreOptionPcOpen}
                  onClose={handleMoreOptPcClose}
                  PaperProps={{
                    style: {
                      width: "20ch",
                      marginTop: "92px",
                      boxSizing: "border-box",
                      borderRadius: "4px",
                      border: `1px solid rgba(0,0,0,0.25)`,
                      boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                      backgroundColor:
                        helper.themeName === "light"
                          ? paperLightLight
                          : paperLightDark,
                    },
                  }}
                >
                  <MenuItem onClick={() => history.push("/login")}>
                    <Button fullWidth variant="contained">
                      Login/Signup
                    </Button>
                  </MenuItem>
                </Menu>
              )}
            </div>
          </Hidden>
        </div>
      </div>
      <div className={cls.subheader}>
        <div className="fc">
          {headerlinks.map((link, i) => (
            <NavLink
              exact
              to={link.link}
              key={i}
              className={globalCls.navLink}
              activeClassName={globalCls.navLinkActive}
            >
              {link.icon} {link.title}
            </NavLink>
          ))}
        </div>
        <div
          className={clsx(cls.locationText, "sb_hid")}
          onClick={() => setLocationOpen(true)}
        >
          <i className="fas fa-map-marker-alt mar_r-8"></i>
          <span className={globalCls.simpleLabel}>Current location: </span>
          <span className="ellipsis" style={{ maxWidth: "300px" }}>
            {helper.fetchLocationData?.location?.address
              ? helper.fetchLocationData.location.address
              : "All India (default)"}
          </span>
        </div>
      </div>
      {/* mob visible - search bar */}
      <Hidden mdUp implementation="css">
        {mobSearchVisible ? renderSearchBar() : null}
      </Hidden>
      <Modal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        className="fccc"
      >
        <div className={clsx(cls.modal, "sb_hid")}>
          <div className={globalCls.txtLgSec}>
            <strong>Select your location</strong>
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-4")}>
            We need your location information to recommend job near me.
          </div>
          <div className="fcol">
            <LocationAutoComplete mar />
            <Button
              className={globalCls.marT32}
              variant="contained"
              color="primary"
              type="button"
              onClick={() => setLocationOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
