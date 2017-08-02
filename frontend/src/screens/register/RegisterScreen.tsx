import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RegisterState } from '../../types/registerState';
import Button from '../../common/Button';
import Form from '../../common/Form';
import Header from '../../common/Header';
import Input from '../../common/Input';
import { Register } from '../../types/register';



export class RegisterScreen extends React.Component<any,RegisterState>{

    constructor(){
        super();
        this.state = {
            success:{
                isSubmitted: false
            },
            register: {
                firstName: '',
                lastName: '',
                companyName: '',
                email: '',
                username: '',
                phoneNumber: '',
                password: '',
                verifyPassword: '',
                id: 0,
                isAdmin: true
            }
        }
    }

    changeHandler = (e : any) => {
        let register = Object.assign({}, this.state.register);
        register[e.target.name] = e.target.value;
        this.setState({register});
    }

    submit = async() => {       
        let state = Object.assign({}, this.state);
        let initiateCompany = await axios.post('auth/companies/createCompany',{name: this.state.register.companyName, phoneNumber: this.state.register.phoneNumber});
        state.register.id = initiateCompany.data;
        this.setState(state)

        let trainer = {
            companyId: this.state.register.id,
            firstName: this.state.register.firstName,
            lastname: this.state.register.lastName,
            username: this.state.register.username,
            password: this.state.register.password,
            email: this.state.register.email,
            phoneNumber: this.state.register.phoneNumber,
            isAdmin: this.state.register.isAdmin
        }
        let initiateTrainer = await axios.post('auth/trainers/addTrainer', {trainer: trainer});

        if(initiateTrainer.data === 'success'){
            state.success.isSubmitted = true;
            this.setState(state);
        }   
    }

    render(){
        let render;
        if(!this.state.success.isSubmitted){
            render = <div>
                <div className="pageTitle text-center">
                    <Header text='Trainer Sign Up'/>
                </div>
                 <div className="container">
                    <div className="row">
                        <div className="col-md-offset-3 col-md-6">
                            <Form 
                                submit = {this.submit}
                                className = ''
                            >
                                <div className="panel panel-default">
                                    <div className="panel-heading text-center">
                                        <span><b>Train-EZ Sign Up Form</b></span>
                                    </div>
                                    <div className="row">
                                        <div className="panel-body">
                                             <div className="col-sm-6">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'First Name'
                                                        value={this.state.register.firstName}
                                                        type='text'
                                                        name='firstName'
                                                        placeholder='Enter First Name'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Enter Valid First Name'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'Last Name'
                                                        value={this.state.register.lastName}
                                                        type='text'
                                                        name='lastName'
                                                        placeholder='Enter Last Name'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Enter Valid Last Name'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'Company Name'
                                                        value={this.state.register.companyName}
                                                        type='text'
                                                        name='companyName'
                                                        placeholder='Enter Company Name'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Enter Valid Company Name'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'Phone Number'
                                                        value={this.state.register.phoneNumber}
                                                        type='text'
                                                        name='phoneNumber'
                                                        placeholder='(xxx)-xxx-xxxx'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Enter Valid Phone Number'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-offset-1 col-sm-10">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'Email'
                                                        value={this.state.register.email}
                                                        type='text'
                                                        name='email'
                                                        placeholder='Enter Email'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Enter Valid Email'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-offset-1 col-sm-10">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'Choose Username'
                                                        value={this.state.register.username}
                                                        type='text'
                                                        name='username'
                                                        placeholder='Enter Username'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Enter Valid Username'
                                                    />
                                                </div>
                                            </div> 
                                            <div className="col-sm-offset-1 col-sm-10">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'Password'
                                                        value={this.state.register.password}
                                                        type='password'
                                                        name='password'
                                                        placeholder='Enter Password'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Enter Valid Password'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-offset-1 col-sm-10">    
                                                <div className="form-group">
                                                    <Input
                                                        label = 'Verify Password'
                                                        value={this.state.register.verifyPassword}
                                                        type='password'
                                                        name='verifyPassword'
                                                        placeholder='Verify Password'
                                                        changeHandler ={this.changeHandler}
                                                        required
                                                        errorMessage ='Passwords Must Match'
                                                    />
                                                </div>
                                            </div>    
                                        </div>                                                                                     
                                        <div className="text-center registerButton">
                                            <Button
                                                className='btn btn-success'
                                                text= 'Register'
                                            />    
                                        </div>
                                    </div>    
                               </div> 
                            </Form>   
                        </div>
                    </div>
                </div>
            </div>
        }else{
            render = 
                <div className="text-center registerMessage">
                    <h1>Thank You For signing up</h1>
                    <h2>Please confirm your email to finish account setup</h2>
                </div>
        }
            
        return(
            <div>
                 {render}
             </div>   
               
        )
    }


}