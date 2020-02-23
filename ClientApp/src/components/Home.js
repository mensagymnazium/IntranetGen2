import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UserApi from "./../services/UserApi";
import { getTokenByScope } from "../helpers/TokenHelper";

export const Home = props => {
  const [errors, setErrors] = useState([]);
  console.log(props);
  let user = {
    Email: props.auth.user.userName,
    StudentClass: "Prima"
  };
  useEffect(() => {
    async function fetchData() {
      let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/User.Write"];
      getTokenByScope(scope).then(token => {
        let api = new UserApi(token.accessToken);
        const result = api.InsertOrUpdateUser(user);
        result.catch(errors => setErrors(errors));
      });
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Intranet</title>
      </Helmet>
      <div className="container">
        <div className="alert alert-warning border border-warning">
          <p>
            Toto je hlavní stránka nového Intranetu, kterou v současné době
            vyvíjí <b>Benjamin Swart</b>, <b>Petr Dedek</b>,{" "}
            <b>Martin-Kent Kraus</b> a <b>Michal Žáček</b> pod vedením{" "}
            <b>Stanislava Čaji</b>.
          </p>
          <p>
            Pokud jste se sem dostali a nejste součástí tohoto týmu, což nevím,
            jestli je vůbec možné, tak vás ujišťuji, že se nejedná o nic
            důležitého a že tu zatím žádné předměty přihlásit nejdou.
          </p>
          <p>
            Pokud jste součástí tohoto týmu, tak vás prosím, aby jste psali
            čitelný kód.
          </p>
          <p>
            Tato stránka byla vykreslena v <b>{new Date().toLocaleString()}</b>.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
