import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LogIn from './components/screens/LoginScreen';
import SignUp from './components/screens/SignUpScreen';

import * as jwtDecode from 'jwt-decode';



export default class App extends React.Component<any, any> {

  /*checkWebToken = (token: any) => {
    const jwt: any = jwtDecode(token);

    if (jwt.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }*/

  /* componentWillMount() {
     if (localStorage.getItem('authToken') !== null) {
       const token: any = localStorage.getItem('authToken');
       if (this.checkWebToken(token)) {
         localStorage.removeItem('authToken');
       }
     }
 
   }*/


  render() {

    return (
      <div>
        <Router>
          <div className="container">
            <Route exact path="/" component={LogIn} />
            <Route exact path="/signUp" component={SignUp} />
          </div>
        </Router>

      </div>
    );
  }
}
/*function mapStateToProps(state: any) {
  return {
    renderNav: state.renderNav,
  }
}*/





