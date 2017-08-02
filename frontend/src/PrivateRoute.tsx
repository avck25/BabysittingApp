import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



export default function PrivateRoute (Component:any, allowedTypes:any, isAdmin:any = false){

  class WithAuthorization extends React.Component<any,any> {
    constructor(){
    super();
      this.state = {
          isLoggedIn: false,
          role:''
      }
  }

  componentWillMount() {
    let state = Object.assign({}, this.state)
    const token:any = localStorage.getItem('authToken');
    if(token){
      state.isLoggedIn = true;
    }
    this.setState(state);
  }

    render() {
      const  role  = localStorage.getItem('roll');
      
      if (allowedTypes.includes(role) && this.state.isLoggedIn && (localStorage.getItem('isAdmin')==isAdmin)) {
        return <Component {...this.props} />
      } else {
        return <Redirect to={'/'}/>;
      }
    }
    
  }
  return WithAuthorization;
}

