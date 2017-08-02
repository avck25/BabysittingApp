import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as appointmentActions from '../../actions/appointments/appointmentActions';
import * as moment from 'moment';
import { Appointment } from '../../../../types/appointment';
import AppointmentsPanelLi from './AppointmentsPanelLi';
import PanelLiHeader from '../../common/PanelLiHeader';

type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

class AppointmentsPanel extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            start: '',

            end: '',
            daystart: 0,
            dayend: 5
        }
    }

    getAppointments = async (daystart: any, dayend: any) => {
        let start = moment().add(daystart, 'days');
        let end = moment().add(dayend, 'days');
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { 'x-access-token': token }
        };
        //the 38 is the trainer id obviously thats not gonna be hard coded
        let response = await axios.get(`api/appointments/appointments/2/${start.format("YYYY-MM-DD")}/${end.format("YYYY-MM-DD")}`, config);
        return response.data;
    }

    click = async (e: any) => {
        e.preventDefault();
        let state = Object.assign({}, this.state);
        state.daystart = state.daystart + 5;
        state.dayend = state.dayend + 5;
        await this.props.reduceAllAppointments(state.daystart, state.dayend);
        this.setState(state);
    }

    clickPrev = async (e: any) => {
        e.preventDefault();
        let state = Object.assign({}, this.state);
        state.daystart = state.daystart - 5;
        state.dayend = state.dayend - 5;
        await this.props.reduceAllAppointments(state.daystart, state.dayend);
        this.setState(state);
    }
    thisWeek = async (e: any) => {
        e.preventDefault();
        let state = Object.assign({}, this.state);
        state.daystart = 0;
        state.dayend = 5;
        await this.props.reduceAllAppointments(state.daystart, state.dayend);
        this.setState(state);
    }

    async componentDidMount() {
        if (!this.props.calendar) {
            await this.props.reduceAllAppointments(this.state.daystart, this.state.dayend);
        }

    }

    getTimes = (date: any, start: any, sessionLength: any) => {

        let theDate = moment(date).format('YYYY-MM-DD');
        let time = moment(theDate + 'T' + start);
        let times = {
            startTime: time.format('h:mm a'),
            endTime: moment(time.add(sessionLength, 'minutes')).format('h:mm a')
        };

        return times;
    }

    getDay = (day: any) => {
        let nameOfDay;
        switch (day) {
            case 0: nameOfDay = 'Sunday'; break;
            case 1: nameOfDay = 'Monday'; break;
            case 2: nameOfDay = 'Tuesday'; break;
            case 3: nameOfDay = 'Wednesday'; break;
            case 4: nameOfDay = 'Thursday'; break;
            case 5: nameOfDay = 'Friday'; break;
            case 6: nameOfDay = 'Saturday'; break;
        }
        return nameOfDay;
    }


    display = (theDate: string, i: number = -1) => {
        let incrementedDate: any;
        let calendar = '';
        if (i >= 0) {
            incrementedDate = moment(theDate).add(i, 'days');
           
        } else {
            incrementedDate = moment(theDate);
            calendar  = 'calendar';
        }
        let day = moment(incrementedDate).day();
        let dayDisplay;
        if (i === 0) {
            dayDisplay = 'Today';
        } else if (i === 1) {
            dayDisplay = 'Tomorrow';
        } else {
            dayDisplay = this.getDay(day);
        }
        let appointment = this.props.appointment ? this.props.appointment : this.props.state.appointments.find((event: any) => {
            return event.index === incrementedDate.format('YYYY-MM-DD')
        });

        let panelLi;
        if (appointment) {
            panelLi = appointment.events.map((apt: Appointment) => {
                let times = this.getTimes(apt.sessionDate, apt.startTime, apt.sessionLength);
                return <AppointmentsPanelLi
                    id={apt.id}
                    key={apt.id}
                    startTime={times.startTime}
                    endTime={times.endTime}
                    completed={apt.completed}
                    firstName={apt.firstName}
                    lastName={apt.lastName}
                    location={apt.inStudio ? 'studio' : apt.address}
                    canceled={apt.canceled}
                />
            });
        } else {
            panelLi = <p className = {"no-appointments " + calendar} >No Appointments</p>
        }
        return (
            <PanelLiHeader
                key={incrementedDate.format('YYYY-MM-DD')}
                day={dayDisplay}
                date={incrementedDate.format('M/DD')}
            >
                {panelLi}
            </PanelLiHeader>

        )
    }




    render() {
        let items = [];
        let calendar = this.props.calendar;
         if (calendar) {
            items.push(this.display(moment(this.props.date).format('YYYY-MM-DD')))
        } else {
            for (let i = this.state.daystart; i < this.state.dayend; i++) {
                items.push(this.display(moment().format('YYYY-MM-DD'), i));
            }
        }

        let buttonPrevious = this.state.daystart > 0 ? <div><a onClick={this.clickPrev} className="col-sm-4 btn btn-default ">Previous Events</a><a onClick={this.thisWeek} className="col-sm-4 trainer-dash-btn btn btn-default ">This Week</a> </div> : null;
        let col4 = this.state.daystart > 0 ? 'col-sm-4' : ' btn-block';
        return (
            <div>
                <div className="trainer-dash-panel panel panel-default">

                    <div className="panel-heading">
                        <h3 className="text-center">
                            <span className="glyphicon glyphicon-calendar"></span> {this.props.calendar? 'Todays Appointments' : 'Upcoming Appointments'}</h3>
                    </div>
                    <div className="panel-body">
                        <ul className="media-list">
                            {items}
                        </ul>


                        {!this.props.calendar ?
                            <div className="row">

                                {buttonPrevious}
                                <a onClick={this.click} className={col4 + " btn btn-default "}>More Events »</a>
                            </div>

                            : ''
                        }
                    </div>
                </div >

            </div>
        )
    }
}

function mapStateToProps(state: any) {

    return {
        state: state.appointments
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        getAllAppointments: (dayFrom: any, dayTo: any) => dispatch(appointmentActions.getAllAppointments(dayFrom, dayTo)),
        reduceAllAppointments: (dayFrom: any, dayTo: any) => dispatch(appointmentActions.reduceAppointments(dayFrom, dayTo))
    }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AppointmentsPanel);
