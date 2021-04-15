import React from "react";

// styling
import { CircularProgress, makeStyles } from "@material-ui/core";

// components

// assets

// colors

// icons

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "99999",
    top: "0",
    left: "0",
  },
  loader: {
    padding: "32px",
    borderRadius: "16px",
    background: "rgba(0,0,0,0.15)",
  },
}));

const Loader = () => {
  const cls = useStyles();

  return (
    <div className={cls.root}>
      <div className={cls.loader}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
