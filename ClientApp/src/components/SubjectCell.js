import "./SubjectCell.css";
export default class SubjectCell extends components {
    return() {
        <Link to={"/subjects/" + this.props.id}>
            <div>
                <h3>this.props.name</h3>
                <h4>this.props.teacher</h4>
            </div>
        </Link>
    }
}