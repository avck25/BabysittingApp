import * as React from 'react';
import Header from '../../common/Header';
import { connect } from 'react-redux';
import * as renderNavActions from '../../actions/renderNavActions';
import Form from '../../common/Form';
import Input from '../../common/Input';
import Button from '../../common/Button';
import axios from 'axios';
import PasswordsPanel from '../../common/PasswordsPanel';

class ForgotPasswordScreen extends React.Component<any,
    any> {

    constructor() {
        super();
        this.state = {
            email: '',
            success: false,
            submitted: false

        }

    }

    changeHandler = (e: any) => {
        let forgotPassword = Object.assign({}, this.state);
        forgotPassword[e.target.name] = e.target.value;
        this.setState(forgotPassword);
    }

    submit = async (e: any) => {
        let forgotPassword = Object.assign({}, this.state.email);
        forgotPassword = await axios.post('/auth/forgotPassword/forgotPassword', { email: this.state.email });
        if (forgotPassword.data.success) {
            this.setState(forgotPassword.data);
        }

        let submitted = Object.assign({}, this.state.submitted);
        submitted = true;
        this.setState({ submitted });
    }
    componentDidMount() {
        this.props.render(false);

    }

    componentWillUnmount() {
        this.props.render(true);
    }

    render() {
        let isSubmit;
        if (!this.state.submitted) {
            isSubmit = <div>
                <Form
                    submit={this.submit}
                    className="">
                    <PasswordsPanel text='Enter your email'>
                        <Input
                            label='Email'
                            value={this.state.email}
                            type='text'
                            name='email'
                            placeholder='Enter Email'
                            changeHandler={this.changeHandler}
                            required
                            errorMessage='Enter Valid Email' />
                        <div className="forgotPasswordBtn text-center">
                            <Button className='btn btn-success' text='Submit' />
                        </div>
                    </PasswordsPanel>
                </Form>
            </div>
        } else {
            isSubmit = <div className='login-box'>
                <PasswordsPanel text="Thank You">
                    <h4 className="text-center">An email has been sent to you</h4>
                </PasswordsPanel>
            </div>
        }

        return (
            <div>
                <div className='pageTitle'>
                    <Header text='Train-EZ' />
                    <h4>Forgot password</h4>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-3 col-md-6">
                            {isSubmit}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {

    return {
        renderNav: state.renderNav,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        render: (trueOrFalse: boolean) => dispatch(renderNavActions.render(trueOrFalse))

    }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
