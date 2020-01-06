import { Component, Fragment } from "react";
import Show from "../shared/interfaces/show.interface";

export default class Card extends Component<{ show: Show }> {
    constructor(props) {
        super(props)
    }

    render() {
        const { show: { title, image, description } } = this.props;
        return (
            <div className="card">
                <img className="card-image" src={`http://localhost/${image}`} alt="" />
                <p>{title}</p>
            </div>
        )
    }
}