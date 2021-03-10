import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...restProps }) => {
  return (
    <Route
      {...restProps}
      component={(props) => {
        const token = localStorage.getItem("token");

        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
