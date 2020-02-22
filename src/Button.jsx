import React from 'react';

const Button = (props) => {

    return (
        <button onClick={props.callback} className={'button'} disabled={props.disabled}>
            {props.title}
        </button>
    );
}

export default Button;