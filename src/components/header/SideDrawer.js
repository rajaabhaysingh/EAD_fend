import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: "0",
    left: "0",
    backgroundColor: "rgba(0,0,0,0.25)",
    transition: "ease-in 0.15s",
    zIndex: "-1",
  },
  backdropHidden: {
    display: "none",
    transition: "ease-out 0.15s",
    zIndex: "-9999",
  },
  sideDrawerBase: {
    backgroundColor: theme.palette.background.bg,
    height: "100vh",
    width: "70vw",
    maxWidth: "280px",
    overflowY: "scroll",
    position: "absolute",
    top: "0",
    left: "0",
    boxShadow: "4px 0 8px rgba(0,0,0,0.25)",
    transform: "translateX(-101%)",
    transition: "ease-in 0.15s",
    display: "flex",
    flexDirection: "column",
  },
  sideDrawerOpen: {
    transform: "translateX(0%)",
    transition: "ease-out 0.15s",
  },
  drawerHeader: {
    height: "60px",
    boxShadow: theme.shadows[3],
  },
}));

const SideDrawer = ({ isMenuOpen, setMenuOpen }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const sideDrawerRef = useRef(null);
  const backdropRef = useRef(null);

  // startLinks
  const startLinks = [
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
  ];

  // midLinks
  const midLinks = [
    {
      title: "Account",
      link: "/account",
      icon: <i className="fas fa-user mar_r-4"></i>,
    },
    {
      title: "My postings",
      link: "/account/my-postings",
      icon: <i className="fas fa-briefcase mar_r-4"></i>,
    },
    {
      title: "My applications",
      link: "/account/my-applications",
      icon: <i className="fas fa-file-contract mar_r-4"></i>,
    },
    {
      title: "Messages",
      link: "/account/messages",
      icon: <i className="fas fa-envelope mar_r-4"></i>,
    },
  ];

  // endLinks
  const endLinks = [
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

  // touch and swipe events function
  // side_drawer is in child component as of now
  const sideDrawer = sideDrawerRef.current;

  let startingX = null;
  let alpha = 0.25;

  // fun handleTouchStart
  const handleTouchStart = (e) => {
    startingX = e.touches[0].clientX;
  };

  // fun handleTouchMove
  const handleTouchMove = (e) => {
    const backdrop = backdropRef.current;

    if (backdrop) {
      // DEFINING touch parameters
      let touch = e.touches[0];
      let change = startingX - touch.clientX;

      // handling backdrop TRANSPARENCY parameters
      let getScreenWidth = window.innerWidth;
      let swipeRange = startingX;
      if (getScreenWidth > 600) {
        // calculate on 300px
        alpha = (touch.clientX / startingX) * 0.25;
      } else {
        // calculate on 70% of screen width
        alpha = (touch.clientX / swipeRange) * 0.25;
      }

      // if swipes right in home screen - do nothing
      if (change < 0) {
        return;
      } else {
        backdrop.style.background = `rgba(0, 0, 0, ${alpha})`;
        sideDrawer.style.left = "-" + change + "px";
        sideDrawer.style.transition = "all 0s";
      }
    }
  };

  // fun handleTouchEnd
  const handleTouchEnd = (e) => {
    var change = startingX - e.changedTouches[0].clientX;
    var threshold = window.innerWidth / 5;
    if (change < threshold) {
      sideDrawer.style.left = 0;
      sideDrawer.style.transition = "ease-in 0.15s";
    } else {
      // perform menu close
      setMenuOpen(false);
      // set left to 0 - dafault value
      sideDrawer.style.left = "0";
      sideDrawer.style.transition = "ease-in 0.15s";
    }
  };

  return (
    <div
      className="f"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={sideDrawerRef}
        className={
          isMenuOpen
            ? clsx(cls.sideDrawerBase, cls.sideDrawerOpen, "sb_hid")
            : cls.sideDrawerBase
        }
      >
        <div className={cls.drawerHeader}></div>
        <ul className="fcol pad-0">
          {startLinks.map((link, i) => (
            <NavLink
              exact
              to={link.link}
              key={i}
              className={globalCls.navLink}
              activeClassName={globalCls.navLinkActive}
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-36p fcc">{link.icon}</span> {link.title}
            </NavLink>
          ))}
        </ul>
        <ul className="fcol pad-0">
          {midLinks.map((link, i) => (
            <NavLink
              exact
              to={link.link}
              key={i}
              className={globalCls.navLink}
              activeClassName={globalCls.navLinkActive}
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-36p fcc">{link.icon}</span> {link.title}
            </NavLink>
          ))}
        </ul>
        <ul className="fcol pad-0">
          {endLinks.map((link, i) => (
            <NavLink
              exact
              to={link.link}
              key={i}
              className={globalCls.navLink}
              activeClassName={globalCls.navLinkActive}
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-36p fcc">{link.icon}</span> {link.title}
            </NavLink>
          ))}
        </ul>
      </div>
      <div
        ref={backdropRef}
        className={isMenuOpen ? cls.backdrop : cls.backdropHidden}
        onClick={() => setMenuOpen(false)}
      ></div>
    </div>
  );
};

export default SideDrawer;
