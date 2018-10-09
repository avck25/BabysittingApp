import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from '../common/input/Input';
import MyForm from '../common/form/Form';
import { submit, isPristine, isSubmitting, Field, reduxForm } from 'redux-form';
import { Owner } from '../../../../types/owner'
const emailValid = require('valid-email');

interface Errors {
    firstName?: string;
    lastName?: string;
    address?: any;
    city?: any;
    state?: any;
    zipCode?: any;
    userName?: any;
    password?: any;
    confirmPassword?: any;
    email?: any;
    hourlyRate?: any;
    phoneNumber?: any;


}

class SignUp extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            renderthis: '',
            success: false,
            redirect: ''
        }
    }

    validate = (values: any) => {
        const errors: Errors = {}

        if (!values.firstName) {
            errors.firstName = 'first name is Required'
        }
        if (!values.lastName) {
            errors.lastName = 'last name name is Required'
        }
        if (!values.hourlyRate) {
            errors.hourlyRate = 'rate is Required'
        } else if (isNaN(Number(values.hourlyRate))) {
            errors.hourlyRate = 'rate must be a number';
        }
        if (!values.userName) {
            errors.userName = 'username is required';
        }
        if (!values.password) {
            errors.password = 'password is required';
        } else if (values.password < 8) {
            errors.password = 'password must contain 8 characters';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'must confirm password';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'passwords dont match';
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = 'must have a phoneNumber';
        } else if (isNaN(Number(values.phoneNumber))) {
            errors.phoneNumber = 'please use only numbers';
        }
        if (!values.email) {
            errors.email = 'must have an email ';
        } else if (!emailValid(values.email)) {
            errors.email = 'not a valid email format';
        }


        return errors
    }

    asyncValidate = async (values: any) => {

        let response = await axios.post('auth/owner/verifyUserName', { values });

        if (!response.data.success) {
            throw { userName: response.data.message }
        }

        response = await axios.post('auth/owner/verifyEmail', { values });
        if (!response.data.success) {
            throw { email: response.data.message }
        }

    }

    submit = async (values: any) => {
        let owner: Owner = {
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            zipCode: values.zip,
            state: values.state,
            city: values.city,
            hourlyRate: values.hourlyRate,
            username: values.userName,
            password: values.password,
            email: values.email,
            phoneNumber: '+1' + values.phoneNumber

        }

        let response = await axios.post('auth/owner/addOwner', { owner });
        let state = Object.assign({}, this.state);
        if (response.data.success) {
            state.redirect = <Redirect to="addClients" />
        } else {
            state.redirect = 'sorry something went wrong please fill out the info again'
        }
        this.setState(state);

    }

    render() {

        return (
            <div>
                <div className="row ">
                    <div className="col s6 offset-s3">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Register</span>
                                <MyForm asyncValidate={this.asyncValidate} validate={this.validate} form='signUp' onSubmit={this.submit}>

                                    <div className="row">
                                        <div className="input-field col s6">
                                            <Field id="first name" name="firstName" component={Input} type="text" />

                                        </div>
                                        <div className="input-field col s6">
                                            <Field name="lastName" component={Input} id="last name" type="text" />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-field col s3">
                                            <Field name="address" component={Input} id="address" type="text" />
                                        </div>
                                        <div className="input-field col s3">
                                            <Field name="city" component={Input} id="city" type="text" />
                                        </div>
                                        <div className="input-field col s3">
                                            <Field name="state" component={Input} id="state" type="text" />
                                        </div>
                                        <div className="input-field col s3">
                                            <Field name="zip" component={Input} id="zip" type="text" />
                                        </div>

                                    </div>

                                    <div className="row ">
                                        <div className="input-field col s4">
                                            <Field name="userName" component={Input} id="username" type="text" />
                                        </div>
                                        <div className="input-field col s4">
                                            <Field name="password" component={Input} id="password" type="password" />
                                        </div>
                                        <div className="input-field col s4">
                                            <Field name="confirmPassword" component={Input} id="confirm password" type="password" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s4">
                                            <Field name="email" component={Input} id="email" type="text" />
                                        </div>
                                        <div className="input-field col s4">
                                            <Field name="phoneNumber" component={Input} id="phone number" type="text" />
                                        </div>
                                        <div className="input-field col s4">
                                            <Field name="hourlyRate" component={Input} id="hourly rate" type="text" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="submit" className="btn left">Next</button>
                                    </div>

                                </MyForm>
                            </div>
                        </div>
                    </div>

                </div >
                {this.state.redirect}
            </div>

        );
    }
}


function mapStateToProps(state: any) {

    return {
        form: state.form
    }
}

export default connect<any, any, any>(mapStateToProps)(SignUp)

