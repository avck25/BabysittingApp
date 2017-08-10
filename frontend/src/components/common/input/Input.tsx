import * as React from 'react';
import { InputProps } from './inputPropAndStateTypes';
require('./input.css');

export default class Input extends React.Component<InputProps, any> {
    constructor() {
        super();
        this.state = {
            error: false,
            errorMessage: this.props.errorMessage
        }
    }

    componentDidMount() {
        let state = Object.assign({}, this.state);
        state.error = this.props.hasError;
        this.setState(state);

    }
    render() {
        let inputClassName = this.state.error ? 'has-danger' : '';
        return (
            <div>
                <input
                    type={this.props.type}
                    className={`form-control ${inputClassName}`}
                />
            </div>
        );
    }
}