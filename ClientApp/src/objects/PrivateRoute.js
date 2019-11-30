import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Auth";

export default function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />  //if user is authorized, continue to element
                ) : (
                        <Redirect to="/" /> //else return to root
                    )
            }
        />
    );
}
 