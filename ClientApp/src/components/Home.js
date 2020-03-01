import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { insertOrUpdateUser } from "./../services/UserApi";
import { getTokenByScope } from "../helpers/TokenHelper";
import { getUserGroup } from "../services/GraphService";

export const Home = props => {
  const [errors, setErrors] = useState([]);
  console.log(props);
  let user = {
    Email: props.auth.user.userName,
    StudentClass: ""
  };

  useEffect(() => {
    async function getUserGroups() {
      let scope = ["user.read"];
      let token = await getTokenByScope(scope);
      let groups = await getUserGroup(token);
      user.StudentClass = await getStudentClass(groups.value);
      apiInsertOrUpdateUser();
    }
    async function apiInsertOrUpdateUser() {
      let scope = ["api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf/User.Write"];
      try {
        let token = await getTokenByScope(scope);
        insertOrUpdateUser(token.accessToken, user);
      } catch (error) {
        console.log(error);
        //TODO Logger
      }
    }
    getUserGroups();
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

async function getStudentClass(groups) {
  var classes = [
    "Prima",
    "Sekunda,",
    "Tercie",
    "Kvarta",
    "Kvinta",
    "Sexta",
    "Septima",
    "Oktáva"
  ];

  return classes.find(name =>
    groups.find(group => group.displayName === "Studenti " + name)
  );
}
