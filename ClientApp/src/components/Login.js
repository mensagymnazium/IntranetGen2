import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import Icons from '../style/IconsBase64.json';

export default class Login extends Component {
    constructor() {
        super();
    }

    render() {
        return (<>
            <Helmet>
                <title>Přihlášení | Intranet</title>
            </Helmet>

            <div style={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <h1 style={{
                    display: "inline-block",
                    fontSize: "6cm",
                    transform: "rotate(20deg)"
                }}>
                    [TODO]
                </h1>
            </div>
        </>);
    }
}
