import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HourCell from './HourCell';
import SubjectCell from './SubjectCell';

export default class SubjectSelectionTable extends Component {
    render() {
        

        return (
            <div><h2>Pondělí</h2>
                <HourCell period="1. - 2.">return( <div>{this.props.subjects.filter(x => x.day == 0 & x.period == 0).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="3. - 4.">return( <div>{this.props.subjects.filter(x => x.day == 0 & x.period == 1).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="5. - 6.">return( <div>{this.props.subjects.filter(x => x.day == 0 & x.period == 2).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="7. - 8.">return( <div>{this.props.subjects.filter(x => x.day == 0 & x.period == 3).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="9. - 0.">return( <div>{this.props.subjects.filter(x => x.day == 0 & x.period == 4).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
            </div>
            <div><h2>Úterý</h2>
                <HourCell period="1. - 2.">return( <div>{this.props.subjects.filter(x => x.day == 1 & x.period == 0).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="3. - 4.">return( <div>{this.props.subjects.filter(x => x.day == 1 & x.period == 1).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="5. - 6.">return( <div>{this.props.subjects.filter(x => x.day == 1 & x.period == 2).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="7. - 8.">return( <div>{this.props.subjects.filter(x => x.day == 1 & x.period == 3).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="9. - 0.">return( <div>{this.props.subjects.filter(x => x.day == 1 & x.period == 4).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
            </div>
            <div><h2>Středa</h2>
                <HourCell period="1. - 2.">return( <div>{this.props.subjects.filter(x => x.day == 2 & x.period == 0).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="3. - 4.">return( <div>{this.props.subjects.filter(x => x.day == 2 & x.period == 1).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="5. - 6.">return( <div>{this.props.subjects.filter(x => x.day == 2 & x.period == 2).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="7. - 8.">return( <div>{this.props.subjects.filter(x => x.day == 2 & x.period == 3).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="9. - 0.">return( <div>{this.props.subjects.filter(x => x.day == 2 & x.period == 4).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
            </div>
            <div><h2>Čtvrtek</h2>
                <HourCell period="1. - 2.">return( <div>{this.props.subjects.filter(x => x.day == 3 & x.period == 0).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="3. - 4.">return( <div>{this.props.subjects.filter(x => x.day == 3 & x.period == 1).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="5. - 6.">return( <div>{this.props.subjects.filter(x => x.day == 3 & x.period == 2).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="7. - 8.">return( <div>{this.props.subjects.filter(x => x.day == 3 & x.period == 3).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="9. - 0.">return( <div>{this.props.subjects.filter(x => x.day == 3 & x.period == 4).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
            </div>
            <div><h2>Pátek</h2>
                <HourCell period="1. - 2.">return( <div>{this.props.subjects.filter(x => x.day == 4 & x.period == 0).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="3. - 4.">return( <div>{this.props.subjects.filter(x => x.day == 4 & x.period == 1).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="5. - 6.">return( <div>{this.props.subjects.filter(x => x.day == 4 & x.period == 2).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="7. - 8.">return( <div>{this.props.subjects.filter(x => x.day == 4 & x.period == 3).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
                <HourCell period="9. - 0.">return( <div>{this.props.subjects.filter(x => x.day == 4 & x.period == 4).map((subject) => <SubjectCell id={subject.id} name={subject.name} teacher={subject.teacher} />)}</div> )</HourCell>
            </div>
            
        );
    }
}

