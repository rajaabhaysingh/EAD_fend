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
          return <Redirect to="/login?target=/account" />;
        }
      }}
    />
  );
};

const PrivateRoute2 = ({ children, ...rest }) => {
  const token = localStorage.getItem("token");

  return token ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login?target=/account" />
  );
};

export default PrivateRoute2;
