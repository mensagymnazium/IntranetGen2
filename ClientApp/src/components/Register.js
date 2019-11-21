import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Register extends Component {
    render() {
        return (<>
            <Helmet>
                <title>Registrace | Intranet</title>
            </Helmet>

            <form>
                <label>Jméno</label>
                <input type="text" placeholder="Jméno" />
                <label>Přijmení</label>
                <input type="text" placeholder="Příjmení" />

                <br />
                <label>Uživatelské jméno</label>
                <input type="text" placeholder="Uživatelské jméno" />
                <br />
                <label>Heslo</label>
                <input type="text" placeholder="Heslo" />

                <br />
                <input type="submit" value="Přihlásit" />
            </form>
        </>);

    }
}
