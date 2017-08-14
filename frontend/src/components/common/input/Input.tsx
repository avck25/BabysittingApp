import * as React from 'react';
import { InputProps } from './inputPropAndStateTypes';
require('./input.css');

const Input = ({
    input,
    placeholder,
    type,
    meta: { touched, error, warning }
  }: any) => {
    console.log(touched);
    let hasError = error ? 'form-control-danger' : '';
    console.log(hasError);

    return (<div>
        <label htmlFor={placeholder} className="control-label col-sm-2">
            {placeholder}
        </label>
        <input id={placeholder} {...input} placeholder={placeholder} type={type} className={`form-control col-sm-4 align-middle ${hasError}`} />
        {touched &&
            ((error &&
                <h6 className="text-danger text-capitalize">
                    {error}
                </h6>))}
    </div>);

}


export default Input;