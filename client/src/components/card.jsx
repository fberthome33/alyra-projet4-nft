import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
    const item = props.item;
    let link = '/' + props.type + '/' + item.address;
    let description = item.title;
    return (
        <div className="card animate__animated animate__fadeIn">
            <Link to={link}>
                <div className="illustration"></div>
            </Link>
            <div className="title">
                {description}
            </div>
        </div>
    );
}

export default Card;