import React from "react";
import Card from "./card";

const Board = (props) => {
    const type = props.type;
    const items = props.items;
    if (items.length === 0){
        return <p>No {type}s available</p>
    }
    return (
        <div className="board">
            {items.map((item, index)=>{
                return <Card key={index} type={type} item={item} />
            })}
        </div>
    );
}

export default Board;