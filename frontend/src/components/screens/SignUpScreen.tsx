import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from '../common/input/Input';
import MyForm from '../common/form/Form';
import { isPristine, isSubmitting, Field, reduxForm } from 'redux-form';

interface Errors {
    userName?: string;
    password?: any;

}

export default class SignUp extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            person: {
                firstName: '',
                lastName: ''
            },
            errorMap: new Map()
        }
    }

    validate = (values: any) => {
        const errors: Errors = {}
        if (!values.userName) {
            errors.userName = 'username is Required'
        }
        if (!values.password) {
            errors.password = 'password is Required'
        }

        return errors
    }





    submit = async (values: any) => {

        await setTimeout(() => console.log('hello'), 5000)

        alert(JSON.stringify(values));
    }



    render() {

        return (
            <div>
                <div className="col-sm-6">
                    <div className="login-panel text-center card panel-default align-middle">
                        <div className="card-header">
                            <h3 className="card-title">Sign In</h3>
                        </div>
                        <div className="card-text">
                            <MyForm validate={this.validate} form='signUp' onSubmit={this.submit}>
                                <Field
                                    name="userName"
                                    component={Input}
                                    placeholder="username"
                                />
                                <Field name="password" component={Input} placeholder="password" type="password" />

                                <button type="submit" className="btn btn-outline-success">Register</button>

                            </MyForm>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}


function mapStateToProps(state: any) {

    return {
        form: state.form
    }
}

