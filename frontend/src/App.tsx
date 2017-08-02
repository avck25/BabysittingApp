import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginScreen from './screens/login/LoginScreen'
import VerifyToken from './components/VerifyToken';


import { ResetPasswordScreen } from './screens/resetPassword/ResetPasswordScreen';
import ForgotPasswordScreen from './screens/forgotPassword/ForgotPasswordScreen';

import { RegisterScreen } from './screens/register/RegisterScreen';
import TrainerDashScreen from './screens/trainerDash/TrainerDashScreen';
import TrainerSetupScreen from './screens/trainerSetup/TrainerSetupScreen';
import AdvancedOptions from './screens/trainerSetup/AdvancedOptions';

import PrivateRoute from './PrivateRoute';
import * as jwtDecode from 'jwt-decode';
import CalendarScreen from './screens/calendar/CalendarScreen'
import NavBar from './common/NavBar';


class App extends React.Component<any, any> {

  checkWebToken = (token: any) => {
    const jwt: any = jwtDecode(token);

    if (jwt.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (localStorage.getItem('authToken') !== null) {
      const token: any = localStorage.getItem('authToken');
      if (this.checkWebToken(token)) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('roll');
        localStorage.removeItem('isAdmin');
      }
    }

  }


  render() {

    let navBar: any = this.props.renderNav.renderNav ? <NavBar fields={[{ name: 'Dashboard', url: '/trainerdashboard' }, { name: 'Calendar', url: 'calendar' }, { name: 'Clients', url: 'trainerClients' }, { name: 'Staff', url: 'staff' }, { name: 'Payments', url: 'payments' }]}></NavBar> : '';
    return (
      <div>
        <Router>
          <div>
      {navBar}
            <Route exact path="/" component={LoginScreen} />
            <Route path="/verifytoken/:token" component={VerifyToken} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/resetpassword/:token" component={ResetPasswordScreen} />
            <Route path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route path="/accountSetup" component={TrainerSetupScreen} />
            <Route path="/AdvancedOptions" component={AdvancedOptions} />
            <Route path='/trainerdashboard' component={PrivateRoute(TrainerDashScreen, ['trainers'], true)} />
            <Route path="/calendar" component={PrivateRoute(CalendarScreen, ['trainers'], true)} />
            {navBar}

          </div>

        </Router>

      </div >
    );
  }
}
function mapStateToProps(state: any) {
  return {
    renderNav: state.renderNav,
  }
}



export default connect<any, any, any>(mapStateToProps)(App);


