import { msalAuth } from "../msal/MsalAuthProvider";

export async function getTokenByScope(scope) {
  const accessTokenRequest = {
    scopes: scope
  };
  try {
    return await msalAuth.acquireTokenSilent(accessTokenRequest);
  } catch (error) {
	  console.log("AquireTokenSilent failure");
	  return await msalAuth.acquireTokenRedirect(accessTokenRequest);
  }
}
