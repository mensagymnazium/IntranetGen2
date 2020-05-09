import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { insertOrUpdateUser } from "./../services/UserApi";
import { getTokenByScope } from "../helpers/TokenHelper";
import { getUserGroup } from "../services/GraphService";

import { Grade } from "./../helpers/Enums";

export const Home = props => {
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
      try {
        insertOrUpdateUser(user);
      } catch (error) {
        console.log(error);
        //TODO Logger
      }
    }
    getUserGroups();
  }, [user]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Intranet</title>
      </Helmet>
      <div className="container">
        <div className="alert alert-warning border border-warning">
          <p>
            Toto je hlavní stránka nového Intranetu Byl vytvořen z důvodu
            údržitelnosti a škálovatelnosti, což u předcházející verze nebylo
            možné. Vize tohoto intranetu není jen u zápisu předmětů, ale dá se
            rožšířit o spousty skvělých funkcí, které budou žákům a učitelům
            zlepšovat působení ve škole.
          </p>
          <p>
            Jedná se již o produkční verzi. Přesto prosím smýšlejte o tomto webu
            jako o BETA verzi ve které určitě bude spousty chyb. Systém pro
            zápis není navržen úplně user friendly, ale spíše jako MVP verze
            (minimum viable product) z důvodu mé vlastní omezené časové kapacity
            pro tento projekt.
          </p>
          <p>
            Rád bych tento projekt jednou vydal jako Open source a věnoval právě
            vám žákům Mensa gymnazia, kdy budete moci navrhovat a ještě lépe ti
            zdatnější přidávat funkcionality.
          </p>
          <p>
            Intranet je psán pomocí technologie React a .NET Core s databázi v
            Microsoft SQL.
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
  var gradesList = [
    Grade.Prima,
    Grade.Sekunda,
    Grade.Tercie,
    Grade.Kvarta,
    Grade.Kvinta,
    Grade.Sexta,
    Grade.Septima,
    Grade.Oktava,
    Grade.Teacher,
    Grade.Admin
  ];

  var admin = groups.find(group => group.displayName === Grade.Admin);
  if (admin) return "Admin";
  var teacher = groups.find(group => group.displayName === Grade.Teacher);
  if (teacher) return "Teacher";

  return gradesList.find(name =>
    groups.find(group => group.displayName === name)
  );
}
