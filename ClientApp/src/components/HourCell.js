import "./HourCell.css";
export default class HourCell extends components {
    return() {
        <div>
            <h3>this.props.period</h3>
            <div>{this.props.children}</div>
        </div>
    }
}
