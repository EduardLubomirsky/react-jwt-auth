import { Component, Fragment } from "react";
import Show from "../shared/interfaces/show.interface";

export default class Card extends Component<{ show: Show }> {
    constructor(props) {
        super(props)
    }

    render() {
        const { show: { name, image: { medium } } } = this.props;
        return (
            <div className="card">
                <img className="card-image" src={medium} alt="" />
                <p>{name}</p>
            </div>
        )
    }
}