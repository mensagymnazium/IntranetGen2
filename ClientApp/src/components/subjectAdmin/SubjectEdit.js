import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import Subject, { gradeNames } from "../../objects/Subject";
import Period, { dayNames, periodNames } from "../../objects/Period";
import Teacher from "../../objects/Teacher";

export default class SubjectEdit extends Component {
  constructor() {
    super();

    this.state = { loading: "loading" };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleTeacherChange = this.handleTeacherChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: "loading", subject: null });

    var id = parseInt(this.props.match.params.subject);

    if (isNaN(id)) {
      return this.setState({
        loading: "new",
        subject: new Subject(null, "", null, "", new Period(0, 0), -1, 30, []),
        teachers: await this.fetchTeachers()
      });
    }

    var [subject, teachers] = await Promise.all([this.fetchSubject(id), this.fetchTeachers()]);

    if (subject) {
      this.setState({
        loading: "done",
        subject, teachers
      });
    } else {
      this.setState({
        loading: "not_found"
      });
    }
  }

  async fetchSubject(id) {
    var response = await fetch(`/api/subject/${id}`);

    if (response.status !== 200) {
      return null;
    }

    var subject = await response.json();
    return Subject.from(subject);
  }

  async fetchTeachers() {
    var response = await fetch("/api/teacher");

    if (response.status !== 200) {
      return null;
    }

    var teachers = await response.json();
    return teachers.map(t => new Teacher(t.id, t.name));
  }

  handleTextChange(event) {
    this.setState({
      subject: {
        ...this.state.subject,
        [event.target.name]: event.target.value
      }
    });
  }

  handlePeriodChange(event) {
    var target = event.target;

    var day = target.name === "day" ? target.value : null;
    var period = target.name === "period" ? target.value : null;

    var oldPeriod = this.state.subject.period;

    this.setState({
      subject: {
        ...this.state.subject,
        period: new Period(
          day !== null ? day : oldPeriod.day,
          period !== null ? period : oldPeriod.period
        )
      }
    });
  }

  handleGradeChange(event) {
    var grades = this.state.subject.grades;

    var target = event.target;
    var grade = parseInt(target.value)

    if (target.checked) {
      grades = [...grades, grade]
    } else {
      grades = grades.filter(g => g !== grade);
    }

    this.setState({
      subject: {
        ...this.state.subject,
        grades
      }
    });
  }

  handleTeacherChange(event) {
    var id = parseInt(event.target.value);

    var teacher = this.state.teachers.find(t => t.id === id) || null;

    this.setState({
      subject: {
        ...this.state.subject,
        teacher
      }
    });
  }

  goBack() {
    if (window.confirm("Opravdu chcete zahodit změny?")) {
      this.props.history.goBack();
    }
  }

  async save() {
    var result = await fetch("/api/subject", {
      method: this.state.subject.id == null ? "POST" : "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.subject)
    });

    if (result.ok) {
      this.props.history.goBack();
    } else {
      window.alert("Nastala chyba");
    }
  }

  render() {
      if (this.state.loading === "loading") {
          return <div className="container text-center"><div className="badge badge-info"><div className="spinner-grow spinner-grow-sm text-light" /> Načítám data...</div></div>;
    }

    if (this.state.loading === "not_found") {
      return <Redirect to="/admin" />;
    }

    var subject = this.state.subject;

    return (<>
      <Helmet>
        <title>{subject.name && subject.name + ' | '}Úprava předmětu | Intranet</title>
      </Helmet>

        <div className="container">
            <div className="card bg-dark form-card">
                <div className="card-body">
                    <form className="form-horizontal" id="SubjectEditForm">

                        <div className="input-group row">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Jméno:</div>
                            </div>        
                            <input
                                className="form-control"
                              type="text"
                              name="name"
                              required
                              value={subject.name}
                              onChange={this.handleTextChange}
                                    />
                        </div><hr/>

                        <div className="input-group row">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Popis:</div>
                            </div>  
                            <textarea
                                className="form-control"
                              name="description"
                              value={subject.description}
                              onChange={this.handleTextChange}
                            />
                        </div><br />
                        <div className="row">
                            <div className="col">
                        <div className="input-group row">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Vyučující:</div>
                            </div>  
                            <select className="form-control" name="teacher" value={subject.teacher ? subject.teacher.id : "none"} onChange={this.handleTeacherChange}>
                              <option value="none">
                                Žádný
                              </option>
                              {
                                this.state.teachers.map(({id, name}) => (
                                  <option value={id} key={id}> 
                                    {name}
                                  </option>
                                ))
                              }
                            </select>
                                </div>
                            </div>
                            <div className="col">
                        <div className="input-group row">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Kapacita:</div>
                            </div>
                            
                            <input
                                className="form-control"
                                type="number"
                                name="capacity"
                                required
                                value={subject.capacity}
                                onChange={this.handleTextChange}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">Přihlášeno: {"0"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col">
                        <div className="input-group row">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Den:</div>
                            </div>
                            <select className="form-control" name="day" value={subject.period.day} onChange={this.handlePeriodChange}>
                          {
                            dayNames.map((name, index) => (
                              <option value={index} key={index}>
                                {name}
                              </option>
                            ))
                          }
                                    </select>
                                </div></div>
                            <div className="col">
                                <div className="input-group row">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Hodina:</div>
                                    </div>
                                    <select className="form-control" name="period" value={subject.period.period} onChange={this.handlePeriodChange}>
                          {
                            periodNames.map((name, index) => (
                              <option value={index} key={index}>
                                {name}
                              </option>
                            ))
                          }
                        </select>
                                </div>
                            </div>
                        </div><hr/>

                        <div className="input-group row">
                            <span className="input-group-text">Zobrazit třídě:</span></div><br />
                        <div className="input-group row">
                        
                        <div className="card-columns">
                            {
                                gradeNames.map((name, index) => (
                                    <div className="card" style={{ padding: '3px', paddingLeft: '8px' }}><div key={index} className="custom-control custom-checkbox">
                                <input
                                    className="custom-control-input"
                              type="checkbox"
                                    name={`class${index}`}
                                    id={`class${index}`}
                              value={index}
                              checked={subject.grades.indexOf(index) >= 0}
                              onChange={this.handleGradeChange}
                                />
                                <label className="custom-control-label" for={`class${index}`}>
                                            {name}
                                        </label></div></div>
                        ))
                                }</div>
                        </div>
                        <hr/>
                        <div className="btn-group">
                            <button className="btn btn-primary" type="button" onClick={this.save}>{subject.id != null ? "Uložit" : "Vytvořit"}</button>
                            <button className="btn btn-danger" type="button" onClick={this.goBack}>Zahodit</button>
                        </div>
                            </form>
                </div>
            </div>
      </div></>);
  }
}
