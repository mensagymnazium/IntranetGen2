import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as AuthenticationContext from "adal-vanilla/lib/adal";

// store the ADAL config:
window.adalConfig = {
  clientId: "06a61a5d-4a4b-4c7e-b28a-0107c9666506",
  tenant: "bc4facfa-6ca4-4771-aa06-3bce0418701c",
  cacheLocation: "sessionStorage",
  popUp: false
};

var authContext = new AuthenticationContext(window.adalConfig);

if (authContext.isCallback(window.location.hash)) {
  // this handles the redirect back from the AAD sign-in page.
  // it extracts the hash and processes the AAD token (or error) received.
  authContext.handleWindowCallback();
}

function startApplication(username, token) {
  // the url of the backend api
  let apiUrl = "https://localhost:5001";

  // render the main application
  ReactDOM.render(
    <App user={username} bearerToken={token} apiUrl={apiUrl} />,
    document.getElementById("root")
  );
}

var user = authContext.getCachedUser();

if (user) {
  let clientId = window.adalConfig.clientId;
  authContext.acquireToken(clientId, function(errorDesc, token, error) {
    if (error) {
      // acquire token failure
      // In this case the callback passed in the Authentication request constructor will be called.
      authContext.acquireTokenRedirect(clientId, null, null);
    } else {
      //acquired token successfully
      startApplication(user.userName, token);
    }
  });
} else {
  // Initiate login
  authContext.login();
}
