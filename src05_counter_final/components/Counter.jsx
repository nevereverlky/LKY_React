import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * UI组件 
 * 主要做显示与用户交互
 * 代码中没有任何redux相关代码
*/
export default class Counter extends Component {

    // state = {
    //     count: 0
    // }

    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
        // store: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.numberRef = React.createRef()
    }

    increment = () => {
        const number = this.numberRef.current.value * 1
        this.props.increment(number)
        // this.props.store.dispatch(increment(number))
        // this.props.store.dispatch({type: 'INCREMENT', data: number})
        // this.setState(state => ({count: state.count + number}))
    }
    decrement = () => {
        const number = this.numberRef.current.value * 1
        this.props.decrement(number)
        // this.props.store.dispatch(decrement(number))
        // this.props.store.dispatch({type: 'DECREMENT', data: number})
        // this.setState(state => ({count: state.count - number}))
    }
    incrementIfOdd = () => {
        const number = this.numberRef.current.value * 1
        if(this.props.count % 2 === 1) {
            this.props.increment(number)
            // this.props.store.dispatch(increment(number))
        }
        // if(this.state.count % 2 === 1){
        //     this.setState(state => ({count: state.count + number}))
        // }
    }
    incrementAsync = () => {
        const number = this.numberRef.current.value * 1
        this.props.incrementAsync(number)
        // setTimeout(() => {
        //     this.props.increment(number)
        // }, 1000)
        // setTimeout(() => {
        //     this.props.store.dispatch(increment(number))
        // }, 1000)
        // setTimeout(() => {
        //     this.setState(state => ({count: state.count + number}))
        // }, 1000)
    }

    render() {
        // const count = this.state.count
        // const count = this.props.store.getState()
        const count = this.props.count
        return (
            <div>
                <p>click {count} times</p>
                <div>
                    <select ref={this.numberRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                    <button onClick={this.incrementAsync}>increment async</button>&nbsp;&nbsp;
                </div>
            </div>
        )
    }
}