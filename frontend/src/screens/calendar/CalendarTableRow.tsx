import * as React from 'react';
import * as DayPicker from 'react-day-picker';
import { connect } from 'react-redux';
import * as appointmentActions from '../../actions/appointments/appointmentActions';
import * as moment from 'moment';
import axios from 'axios';
import { Appointment } from '../../../../types/appointment';
import AppointmentsPanel from '../trainerDash/AppointmentPanel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DayzTestComponent from '../bookAppointment/BookAppointmentScreen';
import 'react-day-picker/lib/style.css';
import 'react-tabs/style/react-tabs.css';







class CalendarTableRow extends React.Component<any, any>{

    constructor() {
        super();
        this.state = {
            renderPanel: '',
        }
    }




    async componentDidMount() {
        let state = Object.assign({}, this.state)
        //let start = state.start;

        let start = moment().date(1);
        let end = start.clone().add(30, 'days');

        await this.props.reduceAllAppointments(start, end);
        let date = moment().format('YYYY-MM-DD');
        console.log(date);
        this.setRenderPanel(date);

    }




    setRenderPanel = (day: any) => {
        let state = Object.assign({}, this.state);
        const date = moment(day);

        let theday = this.props.state.appointments.find((c: any) => {
            return c.index === date.clone().format('YYYY-MM-DD')
        });


        state.renderPanel = <AppointmentsPanel key={date.clone().format('YYYY-MM-DD')} date={date.clone().format('YYYY-MM-DD')} calendar appointment={theday} />

        this.setState(state);


    }



    render() {

        let renderDay = (day: any) => {
            const date = moment(day);

            let theday = this.props.state.appointments.find((c: any) => c.index === date.format('YYYY-MM-DD'));
            let canceled = 0;
            let completed = 0;
            if (theday) {
                theday.events.forEach((e: any) => {
                    if (e.canceled) {
                        canceled++;
                    } else if (e.completed) {
                        completed++;
                    }
                })
            }
            return (
                <div>
                    {date.date()}
                    <div>
                        {
                            theday ?
                                <div>
                                    active: {theday.events.length - canceled - completed} <br />
                                    {completed > 0 ? 'completed : ' + completed : ''} <br />
                                    {canceled > 0 ? 'canceled : ' + canceled : ''} <br />
                                </div> : ''
                        }
                    </div>
                </div>
            );
        }

        let clickDay = (day: any) => {

            this.setRenderPanel(day);
        }

        let onMonthChange = async (month: any) => {
            let start = moment(month);
            let end = start.clone().add(30, 'days');
            await this.props.reduceAllAppointments(start, end);
        }

        return (
            <div>

                <Tabs>
                    <TabList>
                        <Tab>Calendar</Tab>
                        <Tab>Book Appointment</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="col-sm-8">
                            <DayPicker onMonthChange={onMonthChange} onDayClick={clickDay} todayButton="Go to Today" renderDay={renderDay} />
                        </div>
                        <div className="col-sm-4">
                            {this.state.renderPanel}
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className="col-sm-12">
                            <DayzTestComponent
                            />
                        </div>
                    </TabPanel>
                </Tabs>



            </div >
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

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CalendarTableRow);
