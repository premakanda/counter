import React from 'react';

const Number = (props) => {
    let newClassName = props.counterError ? 'item counterError' : 'item';

    let displayCounter = props.errorInputStart || props.errorInputMax ? 'Некорректное значение' : props.isDisplayValue ? 'Enter value and press SET' : props.counter

    return (
        <div className="counterItem">
            <span className={newClassName}>{displayCounter}</span>
        </div>
    );
}

export default Number;
