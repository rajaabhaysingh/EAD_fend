import React from "react";

// components

// styling
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.divider,
    height: "1px",
    width: "100%",
    position: "relative",
  },
  highlighter: {
    height: "1px",
    background: theme.palette.primary.main,
    position: "absolute",
    width: "20%",
    maxWidth: "200px",
  },
}));

const Divider = ({ className }) => {
  const cls = useStyles();

  return (
    <div className={clsx(cls.root, className ? className : "")}>
      <div className={cls.highlighter}></div>
    </div>
  );
};

export default Divider;
