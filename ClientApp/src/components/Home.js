﻿import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Home extends Component {
  render() {
    return (<>
      <Helmet>
        <title>Intranet</title>
      </Helmet>

      <p>
        Toto je hlavní stránka nového Intranetu, kterou v současné době vyvíjí <b>Benjamin Swart</b>, <b>Petr Dedek</b>, <b>Martin-Kent Kraus</b> a <b>Michal Žáček</b> pod vedením <b>Stanislava Čaji</b>.
      </p>
      <p>
        Pokud jste se sem dostali a nejste součástí tohoto týmu, což nevím, jestli je vůbec možné, tak vás ujišťuji, že se nejedná o nic důležitého a že tu zatím žádné předměty přihlásit nejdou.
      </p>
      <p>
        Pokud jste součástí tohoto týmu, tak vás prosím, aby jste psali čitelný kód.
      </p>
      <p>
        Tato stránka byla vykreslena v <b>{new Date().toLocaleString()}</b>.
      </p>
    </>);
  }
}