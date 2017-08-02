import * as React from 'react';
import Header from '../../common/Header';
import NavBar from '../../common/NavBar';
import AppointmentsPanel from './AppointmentPanel';
import NotificationPanel from './NotificationPanel';
import WelcomeHeader from '../../common/WelcomeHeader';
import { capitalizeFirstLetter } from '../../utils/utilFunctions';

export default class TrainerDashScreen extends React.Component<any, any>{

    constructor() {
        super();
    }

    render() {
        return (
            <div>


                <div className="container">
                    <div className="row header">
                        <div className="col-sm-4">
                            <WelcomeHeader text="Dashboard" />
                        </div>
                        <div className="col-sm-offset-5 col-sm-3">
                            <button type="button" className="btn btn-default btn-lg btn-block schedule">Schedule Appointment</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-sm-offset-9">
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-sm-6">
                            <AppointmentsPanel />
                        </div>
                        <div className="col-sm-offset-2 col-sm-4">
                            <NotificationPanel />
                        </div>
                    </div>

                </div>
            </div>



        )
    }
}