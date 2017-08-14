import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from '../common/input/Input';
import MyForm from '../common/form/Form';
import { isPristine, isSubmitting, Field, reduxForm } from 'redux-form';
require('../../index.css');

interface Errors {
    userName?: string;
    password?: any;

}

export default class LogIn extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            redirect: '',
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

    register = () => {
        let state = Object.assign({}, this.state);
        state.redirect = <Redirect to={'/signUp'} />
        this.setState(state);
    }



    render() {

        return (
            <div className="">
                <div className="row justify-content-center align-self-center my-auto">
                    <div className="col-sm-6">
                        <div className="login-panel text-center card panel-default align-middle">
                            <div className="card-header bg-primary text-white">
                                <h3 className="card-title">Sign In</h3>
                            </div>
                            <div className="card-text">
                                <MyForm validate={this.validate} form='logIn' onSubmit={this.submit}>
                                    <Field
                                        name="userName"
                                        component={Input}
                                        placeholder="username"
                                    />
                                    <Field name="password" component={Input} placeholder="password" type="password" />

                                    <button type="submit" className="btn btn-outline-success float-right">Submit</button>
                                    <button onClick={this.register} type="button" className="btn btn-outline-primary float-left">Register</button>
                                </MyForm>
                            </div>
                        </div>
                    </div>
                    {this.state.redirect}
                </div>
            </div>


        );
    }
}



