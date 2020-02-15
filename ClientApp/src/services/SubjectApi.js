import Api from "./Api";

class SubjectApi extends Api {
  // an api operation that calls one of the authorized endpoints.
  GetAllSubjects() {
    return this.AuthenticatedApi.get("/api/subject")
      .then(function(response) {
        // handle success
        return response.data;
      })
      .catch(function(error) {
        throw Error("An error has occurred calling the api: " + error);
      });
  }
}

export default SubjectApi;
