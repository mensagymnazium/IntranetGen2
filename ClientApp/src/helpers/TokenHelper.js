import { msalAuth } from "../msal/MsalAuthProvider";

export function getTokenByScope(scope) {
  const accessTokenRequest = {
    scopes: scope
  };
  try {
    return msalAuth.acquireTokenSilent(accessTokenRequest);
  } catch (error) {
    console.log("AquireTokenSilent failure");
    return msalAuth.acquireTokenPopup(accessTokenRequest);
  }
}
