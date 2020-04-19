var graph = require("@microsoft/microsoft-graph-client");

function getGraphClient(accessToken) {
  const client = graph.Client.init({
    authProvider: done => {
      done(null, accessToken.accessToken);
    }
  });

  return client;
}

export async function getUserGroup(accessToken) {
  const client = getGraphClient(accessToken);
  return await client.api("/me/memberOf").get();
}
