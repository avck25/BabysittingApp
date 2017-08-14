import * as React from 'react'
import { Field, reduxForm } from 'redux-form';
import Input from '../input/Input';
import { MyFormProps } from './formProps';
import { ConfigProps, FormProps } from 'redux-form';
interface Errors {
    username?: string;
    email?: any;
    age?: any;
}

type AllFormProps = FormProps & any & ConfigProps;


const submit = async (values: any) => {
    await alert(JSON.stringify(values));
}





class MyForm extends React.Component<AllFormProps, any> {

    render() {
        return (
            <form className='form' onSubmit={this.props.handleSubmit(this.props.submit)}>
                {this.props.children}
                <div>

                </div>
            </form>
        )
    }
}

export default reduxForm({
    // <--- validation function given to redux-form

})(MyForm)