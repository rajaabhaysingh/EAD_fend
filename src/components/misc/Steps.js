import React from "react";
import clsx from "clsx";

// styling
import { makeStyles } from "@material-ui/core";

// components

// assets

// colors

// icons

// redux

const useStyles = makeStyles((theme) => ({
  root: {},
  circle: {
    height: "36px",
    width: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
    [theme.breakpoints.down("sm")]: {
      height: "24px",
      width: "24px",
      fontSize: "0.8rem",
    },
  },
  line: {
    height: "6px",
    display: "flex",
    flex: "1",
    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
    [theme.breakpoints.down("sm")]: {
      height: "4px",
    },
  },
  active: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  inactive: {
    background: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
  intermediateLine: {
    backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.background.paper}, ${theme.palette.background.paper})`,
    color: theme.palette.common.white,
  },
  inactiveLine: {
    background: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
}));

const Steps = ({ total, active }) => {
  const cls = useStyles();

  // renderStep
  const renderStep = () => {
    let tempJsxArray = [];

    for (let i = 0; i < total - 1; i++) {
      if (i + 1 <= active) {
        tempJsxArray.push(
          <div key={i + "circle"} className={clsx(cls.circle, cls.active)}>
            {i + 1}
          </div>
        );
        if (active === i + 1) {
          tempJsxArray.push(
            <div
              key={i + "line"}
              className={clsx(cls.line, cls.intermediateLine)}
            ></div>
          );
        } else {
          tempJsxArray.push(
            <div key={i + "line"} className={clsx(cls.line, cls.active)}></div>
          );
        }
      } else {
        tempJsxArray.push(
          <div key={i + "circle"} className={clsx(cls.circle, cls.inactive)}>
            {i + 1}
          </div>
        );
        tempJsxArray.push(
          <div
            key={i + "line"}
            className={clsx(cls.line, cls.inactiveLine)}
          ></div>
        );
      }
    }

    // programming last step
    if (active === total) {
      tempJsxArray.push(
        <div key={total + "circle"} className={clsx(cls.circle, cls.active)}>
          {total}
        </div>
      );
    } else {
      tempJsxArray.push(
        <div key={total + "circle"} className={clsx(cls.circle, cls.inactive)}>
          {total}
        </div>
      );
    }

    return tempJsxArray;
  };

  return <div className="fc f1">{renderStep()}</div>;
};

export default Steps;
