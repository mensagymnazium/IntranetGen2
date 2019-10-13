import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SubjectSelectionTable from './SubjectSelectionTable';
import SubjectInfoBoard from './SubjectInfoBoard';

export default class SubjectSchedule extends Component {
    var cimrman = { id: "cimrmanologie", name: "Cimrmanologie", teacher: "J8ra Cimrman", period: 3, day: 0, type: 0, capacity: 0, capacityMax: 22, desc:"Kvantová fyzika je soustavou fyzikálních teorií, která souběžně s teorií relativity ve 20. století předefinovala do té doby platné základy klasické fyziky. Zatímco teorie relativity vysvětluje především kosmologické otázky týkajících se velkých celků, kvantová fyzika se primárně týká nejmenších, tzv. elementárních částic. Obě teorie, které se experimentálně potvrdily, se však nedaří sloučit do jednoho funkčního celku, tzv. teorie všeho."}
var kvantova_fyzika = { id: "kvantova_fyzika", name: "Kvantová Fyzika", teacher: "Max Planck", period: 3, day: 2 }
var protahovani = { id: "protahovani", name: "Protahování", teacher: "Reed Richards", period: 3, day: 2 }
var teoreticka_xenobiologie = { id: "teoreticka_xenobiologie", name: "Teoretická Xenobiologie", teacher: "Václav Brdek", period: 3, day: 3 }
var days = ["Pondeli", "Utery", "Streda", "Ctvrtek", "Patek"]
var periods = ["1-2","3-4","5-6","7-8","9-10"]
const subjects = [cimrman, kvantova_fyzika, protahovani, teoreticka_xenobiologie]

  render() {
    return (<>
      <Helmet>
        <title>Rozvrh | Intranet</title>
      </Helmet>

        <SubjectSelectionTable subjects={subjects} />

	  <Route path="/subjects/:subject" render={(props) => {
            var subject = props.match.params.subject;
            var active_subject = subjects.find(x => x.id == subject);

            return (<>
                <Helmet>
                    <title>{subject} | Rozvrh | Intranet</title>
                </Helmet>
                <SubjectInfoBoard
                    id={active_subject.id}
                    name={active_subject.name}
                    teacher={active_subject.teacher}
                    time={days[active_subject.day] + "; " + periods[active_subject.period]}
                    desc={active_subject.desc}
                    type={active_subject.type}
                    capacity={active_subject.capacity + "/" + active_subject.capacityMax}
                />
                
            </>);
        }} />
    </>);

  }
}
