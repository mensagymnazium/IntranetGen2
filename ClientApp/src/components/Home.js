import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { insertOrUpdateUser } from "./../services/UserApi";
import { getTokenByScope } from "../helpers/TokenHelper";
import { getUserGroup } from "../services/GraphService";

import { Grade, GradeMail, ProgrammingGroup } from "./../helpers/Enums";
import { Grades, GradesMailList } from "./../helpers/Data";

export const Home = props => {
  let user = {
    Email: props.auth.user.userName,
    StudentClass: "",
    Group: ""
  };

  useEffect(() => {
    async function getUserGroups() {
      let scope = ["user.read"];
      let token = await getTokenByScope(scope);
      let groups = await getUserGroup(token);
      user.StudentClass = await getStudentClass(groups.value);
      console.log("skupiny", groups.value);
      user.Group = await getProgrammingGroup(groups.value);
      apiInsertOrUpdateUser();
    }
    async function apiInsertOrUpdateUser() {
      try {
        insertOrUpdateUser(user);
      } catch (error) {
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

async function getProgrammingGroup(groups) {
  var admin = groups.find(group => group.displayName === Grade.Admin);
  if (admin) return "Admin";
  var seminarI = groups.find(
    group => group.id === "8ec9013b-6a43-4d5b-9716-74bcfffb6eab"
  );
  if (seminarI) return ProgrammingGroup.First;
  var seminarII = groups.find(
    group => group.id === "877044fb-957f-480b-8be4-60ed9bf12f68"
  );
  console.log("seminar", seminarII);
  if (seminarII) {
    return ProgrammingGroup.Second;
  }

  return ProgrammingGroup.NotInGroup;
}

async function getStudentClass(groups) {
  var admin = groups.find(group => group.displayName === Grade.Admin);
  if (admin) return "Admin";
  var teacher = groups.find(group => group.displayName === Grade.Teacher);
  if (teacher) return "Teacher";
  var oktava = groups.find(group => group.mail === GradeMail.Oktava);
  if (oktava) return Grade.Oktava;

  var result = GradesMailList.find(name =>
    groups.find(group => group.mail === name)
  );
  var grade = result.split("@");
  var t = grade[0][0].toUpperCase() + grade[0].slice(1);
  var index = Grades.indexOf(t);
  return Grades[index + 1];
}
