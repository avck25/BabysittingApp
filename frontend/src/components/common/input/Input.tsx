import * as React from 'react';
import { InputProps } from './inputPropAndStateTypes';
require('./input.css');

const Input = ({
    input,
    id,
    type,
    label,
    meta: { touched, error, warning }

  }: any) => {




    return (<div>


        <input id={id} {...input} type={type} />
        <label htmlFor={id}>{id}</label>

        {touched &&
            ((error &&
                <h6 className="red-text text-lighten-2 text-capitalize">

                    {error}
                </h6>))}

    </div>);

}


export default Input;