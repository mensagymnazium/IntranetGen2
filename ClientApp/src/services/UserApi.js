import Api from "./Api";

class UserApi extends Api {
  // an api operation that calls one of the authorized endpoints.
  InsertOrUpdateUser(user) {
    return this.AuthenticatedApi.put("/api/user", JSON.stringify(user))
      .then(function(response) {
        // handle success
        return response.data;
      })
      .catch(function(error) {
        throw Error("An error has occurred calling the api: " + error);
      });
  }
}

export default UserApi;
