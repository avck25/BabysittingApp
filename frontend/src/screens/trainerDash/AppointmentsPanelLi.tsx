import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppointmentsPanelLiProps } from '../../types/appointmentsPanelLiProps';
import { connect } from 'react-redux';
import { Appointment } from '../../../../types/appointment';
import * as appointmentActions from '../../actions/appointments/appointmentActions';
import axios from 'axios';




class AppointmentsPanelLi extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {
            canceled: false,
            completed: true
        }
    }

    componentDidMount() {
        let state = Object.assign({}, this.state);
        state.completed = this.props.completed;
        state.canceled = this.props.canceled;
        this.setState(state);
    }

    editClick = async (e: any) => {

        await this.props.completeAppointment(this.props.id, true);
        let state = Object.assign({}, this.state);
        state.completed = true;

        this.setState(state);

    }
    cancelClick = async (e: any) => {
        await this.props.cancelAppointment(this.props.id, true);
        let state = Object.assign({}, this.state);
        state.canceled = true;

        this.setState(state);
    }


    render() {
        let theAppointment: any;


        let completed = this.state.completed ? 'completed' : null;
        let canceled = this.state.canceled ? 'canceled' : null;
        let buttons = null;
        if (!completed && !canceled) {
            buttons =
                <span>
                    <a onClick={this.cancelClick}><span className="glyphicon glyphicon-trash delete"></span></a>
                    <a onClick={this.editClick}><span className="glyphicon glyphicon-pencil edit"></span></a>
                </span>
        }

        return (
            <div>
                <h4 className={"media-heading " + completed + ' ' + canceled} >
                    {this.props.startTime} - {this.props.endTime}
                    {buttons}
                </h4>
                <p className={"" + completed + ' ' + canceled}>Session with {this.props.firstName} {this.props.lastName} @ {this.props.location}</p>
            </div>
        );
    }

}

function mapStateToProps(state: any) {

    return {
        state: state.appointments
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        cancelAppointment: (id: number, cancel: boolean) => dispatch(appointmentActions.cancelAppointment(id, cancel)),
        completeAppointment: (id: number, complete: boolean) => dispatch(appointmentActions.completeAppointment(id, complete))
        //getAppointment: (id: number) => dispatch(appointmentActions.getAppointment(id))
    }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AppointmentsPanelLi);
