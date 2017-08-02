import * as React from 'react';
import * as moment from 'moment';
import NavBar from '../../common/NavBar';
import CalendarTableRow from './CalendarTableRow';
import WelcomeHeader from '../../common/WelcomeHeader';



export default class Calendar extends React.Component<any, any>{

    constructor() {
        super();
        this.state = {
            amountOfDays: 14
        }
    }

    render() {
        let today: any = moment();

        return (
            <div>


                <div className="container">
                    <div className="row header">
                        <div className="col-sm-4">
                            <WelcomeHeader text="Calendar" />
                        </div>
                        <div className="col-sm-offset-4 col-sm-2">

                        </div>
                    </div>
                    <div className="row">
                        <CalendarTableRow />
                    </div>

                </div>
            </div >



        )
    }
}