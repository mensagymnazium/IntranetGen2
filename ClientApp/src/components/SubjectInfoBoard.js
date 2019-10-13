export default class SubjectInfoBoard extends components {
    return() {
        <div>
            <h2>{this.props.name}</h2>
            <div>{this.props.desc}</div>
            <div>Vyučující: {this.props.teacher}</div>
            <div>Hodina: {this.props.teacher}</div>
            <div>Oblast: {this.props.type}</div>
            <div>Kapacita: {this.props.capacity}</div>
            <button onClick={function (event) { console.log("Uzivatel si zapsal předmět " + this.props.name + " s ID: " + this.props.id); document.cookie += this.props.id }}>P5ihl8sit</button>
        </div>
    }
}
