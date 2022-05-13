import React from "react";

const Error = (props) => {
    return (
        <main>
            <h1>
                Error
            </h1>
            <p>{props.message}</p>
        </main>
    );
}

export default Error;