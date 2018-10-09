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
        let newState: any = Object.assign({}, this.state);
        newState.redirect = <Redirect to={'/signUp'} />
        this.setState(newState);
    }



    render() {

        return (
            <div>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="card ">

                            <div className="card-content">
                                <h3 className="card-title center">Sign In</h3>

                                <div className="card-text">
                                    <MyForm validate={this.validate} form='logIn' onSubmit={this.submit}>
                                        <div className="row">
                                            <div className="input-field">
                                                <Field name="userName" component={Input} id="username" type="text" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field">
                                                <Field name="password" component={Input} id="password" type="password" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card-action">
                                                    <button type="submit" className="btn green ligthen-2 right">Sign In</button>
                                                    <button onClick={this.register} type="button" className="btn blue lighten-2">Register</button>
                                                </div>
                                            </div>
                                        </div>
                                    </MyForm>
                                </div>
                            </div>

                        </div>
                    </div>
                    {this.state.redirect}
                </div>
            </div>


        );
    }
}



