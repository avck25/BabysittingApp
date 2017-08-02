import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as renderNavActions from '../../actions/renderNavActions';
import Form from '../../common/Form'
import Header from '../../common/Header';
import Input from '../../common/Input';
import { Login } from '../../../../types/user';
import { LoginState } from '../../types/login';
import Button from '../../common/Button';
import axios from 'axios';
import * as reducerActions from '../../actions/actions';


class LoginScreen extends React.Component<any, LoginState> {
    constructor() {
        super();
        this.state = {
            user: {
                hasToken: false,
                roll: '',
                isAdmin: false
            },
            render:{
                renderThis: ''
            },
            errors:{
                errorMessage: ''
            },
            login: {
                username: '',
                password: ''
            }
        }
    }

    changeHandler = (e: any) => {
        let login = Object.assign({}, this.state.login);
        login[e.target.name] = e.target.value;
        this.setState({ login });
    }

    
    submit = async(e: any) => {
        
        console.log('here')
        let state = Object.assign({}, this.state);
        try{
            let response = await axios.post('auth/login', {username: this.state.login.username, password: this.state.login.password});
            state.errors.errorMessage = ''; 
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('isAdmin', response.data.isAdmin)
            localStorage.setItem('roll', response.data.table);
            state.render.renderThis = <Redirect to={'/trainerdashboard'}/>;
            this.setState(state);
        }
        catch(e) {
            this.props.removeValidateSuccess();
            this.props.removeEmailPasswordValidateSuccess();
            state.errors.errorMessage = <p className='invalidMsg text-center text-danger'>Enter valid username/password</p>;
            this.setState(state);
        }
    }

    componentWillMount(){
        let user = Object.assign({}, this.state.user);
        if(localStorage.getItem('authToken')){
            let roll = localStorage.getItem('roll');
            user.hasToken = true;
        }
        if(localStorage.getItem('isAdmin')){
            user.isAdmin = true;
        }
        if(localStorage.getItem('roll') === 'trainers'){
            user.roll = 'trainers'
        }else if(localStorage.getItem('roll') === 'clients'){
            user.roll = 'clients';
        }
        this.setState({user});
    }

    componentDidMount() {
        this.props.render(false);

    }

    componentWillUnmount() {
        this.props.render(true);
    }


    render() {
        let login;  
        
        if(this.state.user.hasToken && this.state.user.roll === 'trainers' && this.state.user.isAdmin){
            login = <Redirect to={'/trainerdashboard'}/>;
        }else if(this.state.user.hasToken && this.state.user.roll === 'trainers' && !this.state.user.isAdmin){
            login = <Redirect to={'/trainerstaffdashboard'}/>;
        }else if(this.state.user.hasToken && this.state.user.roll === 'clients' && !this.state.user.isAdmin){
            login = <Redirect to={'/clientdashboard'}/>;
        }else{
           login = <div> 
                <div className='pageTitle'>
                    <Header text='Train-EZ Login' />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-3 col-md-6">
                            {this.state.errors.errorMessage}
                            <Form
                                submit={this.submit}
                                className=''
                            >
                                <div className='login-box'>
                                    <div className="panel panel-default">
                                        <div className="panel-heading text-center">
                                            <span><b>Login</b></span>
                                        </div>

                                        <div className="panel-body">
                                            <div className="form-group has-primary has-feedback">
                                                <Input
                                                    label='User Name'
                                                    value={this.state.login.username}
                                                    type='text'
                                                    name='username'
                                                    placeholder='Enter Username'
                                                    changeHandler={this.changeHandler}
                                                    required
                                                    errorMessage='Enter Valid User Name'
                                                />
                                                <span className="glyphicon glyphicon-user form-control-feedback" aria-hidden="true"></span>
                                            </div>
                                            <div className="form-group has-primary has-feedback">
                                                <Input
                                                    label='Password'
                                                    value={this.state.login.password}
                                                    type='password'
                                                    name='password'
                                                    placeholder='Enter Password'
                                                    changeHandler={this.changeHandler}
                                                    required
                                                    errorMessage='Enter Valid Password'
                                                />
                                                <span className="glyphicon glyphicon-lock form-control-feedback" aria-hidden="true"></span>
                                            </div>
                                        </div>

                                        <div className="panel-footer">
                                            <Button
                                                className='btn btn-success'
                                                text='Sign In'
                                            />
                                            {this.state.render.renderThis}
                                            <Link to="/register">
                                                <Button
                                                    className='btn btn-warning pull-right'
                                                    text='Register'
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                            <div className="text-center">
                                <Link to="ForgotPassword">Forgot password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        }
           return <div>{login}</div>
    }
}


function mapStateToProps(state: any) {

    return {
        renderNav: state.renderNav,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        render: (trueOrFalse: boolean) => dispatch(renderNavActions.render(trueOrFalse)),
        removeValidateSuccess: () => dispatch(reducerActions.removeValidateSuccess()),
        removeEmailPasswordValidateSuccess: () => dispatch(reducerActions.removeEmailPasswordValidateSuccess())
    
    }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LoginScreen);

