import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/Header';
import Form from '../../common/Form';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { RedirectProps } from '../../types/redirectProps';
import PasswordsPanel from '../../common/PasswordsPanel';
import axios from 'axios';
import { Redirect, RouteComponentProps } from 'react-router-dom';

export class ResetPasswordScreen extends React.Component<RouteComponentProps<RedirectProps>, any> {
    constructor() {
        super();
        this.state = {
            success: false,
            renderThis: '',
            login: {
                password: '',
                confirmPassword: ''
            },
            email: '',
            tableName: '',
        }
    }
    changeHandler = (e: any) => {
        let state = Object.assign({}, this.state);
        state.login[e.target.name] = e.target.value;
        this.setState({ state });

    }

    submit = (e: any) => {
        let state = Object.assign({}, this.state);
        axios.post('/auth/forgotPassword/updatePassword', {
            password: this.state.login.password,
            tempToken: this.props.match.params.token,
            email: state.email,
            tableName: state.tableName
        });

        state.renderThis = <Redirect to={'/'} />
        this.setState(state);
    }

    async componentDidMount() {
        let state = Object.assign(this.state);
        let response = await axios.post('/auth/forgotPassword/compareTempToken',
            { tempToken: this.props.match.params.token });
        if (!response.data.success) {
            state.renderThis = <Redirect to={'/forgotPassword'} />;
        } else {
            state.email = response.data.email;
            state.tableName = response.data.tableName;
        }
        this.setState(state);
    }


    render() {
        console.log()
        return (
            <div>
                <div className='pageTitle'>
                    <Header text='Train-EZ' />
                    <h4>Reset password</h4>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-3 col-md-6">
                            <Form
                                submit={this.submit}
                                className=''>
                                <PasswordsPanel text="Reset your password">
                                    <div className="form-group has-primary has-feedback">
                                        <Input
                                            label='Enter new password'
                                            value={this.state.login.password}
                                            type='password'
                                            name='password'
                                            placeholder='Enter Password'
                                            changeHandler
                                            ={this.changeHandler}
                                            required
                                            errorMessage='Enter Valid Password' />
                                        <span
                                            className="glyphicon glyphicon-lock form-control-feedback"
                                            aria-hidden="true"></span>
                                    </div>
                                    <div className="form-group has-primary has-feedback">
                                        <Input
                                            label='Confirm Password'
                                            value={this.state.login.confirmPassword}
                                            type='password'
                                            name='confirmPassword'
                                            placeholder='Confirm Password'
                                            changeHandler
                                            ={this.changeHandler}
                                            required
                                            errorMessage="Passwords Don't match" />
                                        <span
                                            className="glyphicon glyphicon-lock form-control-feedback"
                                            aria-hidden="true"></span>
                                    </div>
                                    <div className="resetPasswordBtn text-center">
                                        <Button className='btn btn-success' text='Submit' />
                                        {this.state.renderThis}
                                    </div>
                                </PasswordsPanel>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}