import React, { Component } from 'react';

export default class SubjectDetailsCRUD extends Component {
    render() {
        return (<div>
            
            <br /><br />
            <form id="SubjectCRUDForm">
                <input type="text" name="name" defaultValue={this.props.subject.name}/>
                <hr/>
                <span>Vyučující: </span><input type="text" name="teacher" defaultValue={this.props.subject.teacher} />
                <br/><span>Den: </span>
                    <select name="day" defaultValue={this.props.subject.period.day}>
                        <option value={0}>Pondělí</option>
                        <option value={1}>Úterý</option>
                        <option value={2}>Středa</option>
                        <option value={3}>Čtvrtek</option>
                        <option value={4}>Pátek</option>
                    </select>
                <span> Perioda: </span>
                    <select name="period" defaultValue={this.props.subject.period.period}>
                        <option value={0}>1. - 2.</option>
                        <option value={1}>3. - 4.</option>
                        <option value={2}>5. - 6.</option>
                        <option value={3}>7. - 8.</option>
                        <option value={4}>9. - 10.</option>
                    </select>
                
                <br/><span>Oblast: </span>{/*To be added*/}
                <br /><span>Maximální Kapacita: </span><input type="number" name="capacity" defaultValue={this.props.subject.capacity}/>
                <br /><br /><textarea name="description" style={{ whiteSpace: "pre-wrap" }} rows="4" cols="40" defaultValue={this.props.subject.description}/>

                <hr /><p>ID: {this.props.subject.id}</p>
                <button type="button" onClick={() => this.props.edit(this.props.subject.id, document.getElementById("SubjectCRUDForm"))}>Uložit změny</button>
                
            </form>
        </div>);
}
}
