import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Login extends Component {
  render() {
    return (<>
      <Helmet>
        <title>Přihlášení | Intranet</title>
      </Helmet>

      <h1>
        Přihlašte se
      </h1>
      <p>
        ... by bylo co bychom řekli, kdyby tohle nebyla jenom zástupná stránka.
      </p>
    </>);
  }
}
