import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class NotFound extends Component {
  render() {
    return (<>
      <Helmet>
        <title>Stránka nenalezena | Intranet</title>
      </Helmet>
        <div className="container">
            <div className="alert alert-danger">
                  <h1>
                    Stránka nenalezena
                  </h1>
                  <p>
                    Taky jich tu zatím moc není.
                  </p>
            </div>
        </div>
    </>);
  }
}
