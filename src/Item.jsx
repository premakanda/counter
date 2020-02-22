import React from 'react';

const Item = (props) => {
    let inputClassName = props.error ? 'input inputValue' : 'input';

    return (
        <label>{props.title}
            <input className={inputClassName} type="number"
                   placeholder={props.value}
                   onChange={ (event) => {props.onChangeInput(Number(event.currentTarget.value))}}
                   disabled={props.disabledInput}
                   value={props.value}/>

        </label>
    );
}

export default Item;