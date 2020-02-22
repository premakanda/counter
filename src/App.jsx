import React from 'react';
import './App.css';
import Number from './Number';
import Button from './Button';
import Item from './Item';
import {inputStartAC, inputMaxAC, inputSetAC, inputIncAC, inputResetAC, setRestoreStateAC} from "./reducer";
import {connect} from "react-redux";

class App extends React.Component {
    // state = {
    //     counter: 0,
    //     maxValue: 2,
    //     startValue: 0,
    //     resetDisabled: false,
    //     incDisabled: false,
    //     setDisabled: true,
    //     isDisplayValue: false,
    //     counterError: false,
    //     errorInputStart: false,
    //     errorInputMax: false
    // }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.props);
        localStorage.setItem("count", stateAsString)
    }

    restoreState = () => {
        let state = this.props;
        let stateAsString = localStorage.getItem("count");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        this.props.setRestoreState(state)
        // this.setState(state)
    }

    onChangeInputStart = (currentValue) => {
        this.props.onChangeInputStart(currentValue);
        // this.setState({
        //     setDisabled: false,
        //     resetDisabled: true,
        //     incDisabled: true,
        //     startValue: currentValue,
        //     isDisplayValue: true,
        //     errorInputStart: false
        // });
        // if (currentValue < 0 || currentValue >= this.state.startValue) {
        //     this.setState({
        //         setDisabled: true,
        //         errorInputStart: true
        //     });
        // }
    }

    onChangeInputMax = (currentVal) => {
        this.props.onChangeInputMax(currentVal);

        // this.setState({
        //     setDisabled: false,
        //     resetDisabled: true,
        //     incDisabled: true,
        //     maxValue: currentVal,
        //     isDisplayValue: true,
        //     errorInputMax: false
        // });
        // if (currentVal < 0 || currentVal === this.props.state.startValue || currentVal < this.props.state.startValue) {
        //     this.setState({
        //         setDisabled: true,
        //         errorInputMax: true
        //     });
        // }
    }

    changeSet = () => {
        this.props.changeSet();
        // this.setState({
        //     setDisabled: true,
        //     resetDisabled: false,
        //     incDisabled: false,
        //     isMaxvalue: true,
        //     counter: this.state.startValue,
        //     isDisplayValue: false
        // })
        this.saveState()
    }

    changeInc = () => {
        this.props.changeInc();
        // this.setState({
        //     counter: this.props.state.counter + 1
        // }, () => {
        //     if (this.props.state.counter >= this.props.state.maxValue) {
        //         this.setState({
        //             incDisabled: true,
        //             counterError: true,
        //             resetDisabled: false
        //         })
        //     }
        // });
    }

    changeReset = () => {
        this.props.changeReset();
        // this.setState({
        //     counter: this.props.startValue,
        //     incDisabled: false,
        //     counterError: false,
        //     resetDisabled: true
        // });
    }

    render = () => {
        return (
            <div className="App">
                <div className="counter">
                    <div className="counterInput">
                        <Item title={'max value:'}
                              value={this.props.maxValue}
                              error={this.props.error}
                              onChangeInput={this.onChangeInputMax}
                              inputError={this.props.errorInputMax}/>
                        <Item title={'start value:'}
                              value={this.props.startValue}
                              onChangeInput={this.onChangeInputStart}
                              inputError={this.props.errorInputStart}
                              error={this.props.error}
                        />
                    </div>
                    <div className="blockBtn">
                        <Button title={'set'} callback={this.changeSet} disabled={this.props.setDisabled}/>
                    </div>
                </div>
                <div className="counter">
                    <Number counterError={this.props.counterError}
                            counter={this.props.counter}
                            errorInputStart={this.props.errorInputStart}
                            errorInputMax={this.props.errorInputMax}
                            isDisplayValue={this.props.isDisplayValue}
                    />
                    <div className="counterBtn">
                        <Button title={'inc'} callback={this.changeInc} disabled={this.props.incDisabled}/>
                        <Button title={'reset'} callback={this.changeReset} disabled={this.props.resetDisabled}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        maxValue: state.maxValue,
        error: state.error,
        errorInputMax: state.errorInputMax,
        startValue: state.startValue,
        errorInputStart: state.errorInputStart,
        counterError: state.counterError,
        counter: state.counter,
        isDisplayValue: state.isDisplayValue,
        incDisabled: state.incDisabled,
        resetDisabled: state.resetDisabled,
        setDisabled: state.setDisabled
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeInputStart: (currentValue) => {
            const action = inputStartAC(currentValue);
            dispatch(action)
        },
        onChangeInputMax: (currentVal) => {
            const action = inputMaxAC(currentVal);
            dispatch(action)
        },
        changeSet: () => {
            const action = inputSetAC();
            dispatch(action)
        },
        changeInc: () => {
            const action = inputIncAC();
            dispatch(action)
        },
        changeReset: () => {
            const action = inputResetAC();
            dispatch(action)
        },
        setRestoreState: (state) => {
            const action = setRestoreStateAC(state);
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
