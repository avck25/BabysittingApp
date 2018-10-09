import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LogIn from './components/screens/LoginScreen';
import SignUp from './components/screens/SignUpScreen';
import VerifyToken from './components/screens/VerifyToken';
import AddClients from './components/screens/AddClients';
import Times from './components/common/time/Times';
require('./index.css');

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
            <Route path="/signUp" component={SignUp} />
            <Route path="/verifytoken/:token" component={VerifyToken} />
            <Route path="/addClients" component={AddClients} />
            <Route path="/addTime" component={Times} />
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





