import React from "react";
import { Route, Redirect } from "react-router-dom";
import { msalAuth } from "./../msal/MsalAuthProvider";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = msalAuth.getAccount();
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: "/" }} />;
      }
      let role = currentUser.idToken.roles[0];
      // check if route is restricted by role
      if (roles && roles.indexOf(role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
