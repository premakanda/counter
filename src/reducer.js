import React from 'react';

export const INPUT_START = "App/Reducer/INPUT-START";
export const INPUT_MAX = "App/Reducer/INPUT-MAX";
export const INPUT_SET = "App/Reducer/INPUT-SET";
export const INPUT_INC = "App/Reducer/INPUT-INC";
export const INPUT_RESET = "App/Reducer/INPUT-RESET";
export const SET_STATE = "App/Reducer/SET-STATE";


const initialState = {
        counter: 0,
        maxValue: 2,
        startValue: 0,
        resetDisabled: false,
        incDisabled: false,
        setDisabled: true,
        isDisplayValue: false,
        counterError: false,
        errorInputStart: false,
        errorInputMax: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_START:
            let valueStart = false;
            if (action.currentValue < 0 || action.currentValue >= state.startValue) {
                valueStart = true;
            }
            return {
                ...state,
                resetDisabled: true,
                incDisabled: true,
                startValue: action.currentValue,
                isDisplayValue: true,
                setDisabled:  valueStart,
                errorInputStart:  valueStart
            }
        case INPUT_MAX:
            let valueMax = false;
            if (action.currentVal < 0 || action.currentVal === state.startValue || action.currentVal < state.startValue) {
                valueMax = true;
            }
            return {
                ...state,
                resetDisabled: true,
                incDisabled: true,
                maxValue: action.currentVal,
                isDisplayValue: true,

                setDisabled: valueMax,
                errorInputMax: valueMax
            }
        case INPUT_SET:
            return {
                ...state,
                setDisabled: true,
                resetDisabled: false,
                incDisabled: false,
                isMaxvalue: true,
                counter: state.startValue,
                isDisplayValue: false
            }
        case INPUT_INC:
            let newCounter = state.counter + 1;
            if (state.counter >= state.maxValue) {
                return {
                    ...state,
                    incDisabled: true,
                    counterError: true,
                    resetDisabled: false
                }
            }
            return {
                ...state, counter: newCounter
            }

            case INPUT_RESET:
            return {
                ...state,
                counter: state.startValue,
                incDisabled: false,
                counterError: false,
                resetDisabled: true
            }
        case SET_STATE:
            return {
                ...action.state
            }

    }
    return state;
};

export const inputStartAC = (currentValue) => {
    return {type: INPUT_START, currentValue}
};

export const inputMaxAC = (currentVal) => {
    return {type: INPUT_MAX, currentVal}
};
export const inputSetAC = () => {
    return {type: INPUT_SET}
};
export const inputIncAC = () => {
    return {type: INPUT_INC}
};
export const inputResetAC = () => {
    return {type: INPUT_RESET}
};
export const setRestoreStateAC = (state) => {
    return {type: SET_STATE, state}
};