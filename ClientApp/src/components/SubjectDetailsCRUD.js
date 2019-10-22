import React, { Component } from 'react';

export default class SubjectDetailsCRUD extends Component {
    render() {
        return (<div>
            <h2>{this.props.subject.id}</h2>

            <form>
                

                <br/><span>Vyučující: </span><input type="text" name="teacher" defaultValue={this.props.subject.teacher} />
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

                <hr/><button type="button" onClick={() => this.props.edit(this.props.subject.id, this.form)}>Uložit</button>
                <button type="button" onClick={function () {
                    if (window.confirm(`Jste si tímto jisti?\nPředmět "${this.subject.name}" (${this.subject.id}) bude trvale smazán.`)) { this.props.remove(this.props.subject.id, this.form) }}}>Smazat</button>
                <button type="button" onClick={() => this.props.create(prompt("Prosím stanovte ID předmětu"), this.form)}>Vytvořit</button>{/*ID je potřeba zkontrolovat, později můžem ID autogenerovat*/}
            </form>
        </div>);
}
}
