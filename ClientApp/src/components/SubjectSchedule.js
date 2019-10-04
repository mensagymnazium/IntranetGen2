import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default class SubjectSchedule extends Component {
  render() {
    return (<>
      <Helmet>
        <title>Rozvrh | Intranet</title>
      </Helmet>

      <Link to="/subjects/cimrmanologie">Cimrmanologie</Link><br />
      <Link to="/subjects/kvantova-fyzika">Kvantová fyzika</Link><br />
      <Link to="/subjects/pocitacova-grafika">Počítačová grafika</Link>

      <Route path="/subjects/:subject" render={(props) => {
        var subject = props.match.params.subject;

        return (<>
          <Helmet>
            <title>{subject} | Rozvrh | Intranet</title>
          </Helmet>
          <h1>
            {subject}
          </h1>
        </>);
      }} />
    </>);
  }
}
