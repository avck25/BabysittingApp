import * as React from 'react';
import { CustomizeSessions } from '../../types/customizeSessions';
import Header from '../../common/Header';
import Form from '../../common/Form';
import Button from '../../common/Button';
import NumberInput from '../../common/NumberInput';
import SessionSetup from '../../common/SessionSetup';
import DiscountPackages from '../../common/DiscountPackages';
import SessionWell from '../../common/SessionWell';
import DiscountPackagesWell from '../../common/DiscountPackagesWell';
import CancelationPolicy from '../../common/CancelationPolicy'
import RequireMinSessions from '../../common/RequireMinSessions';
import NotificationsPriorToSession from '../../common/NotificationsPriorToSession';
import AdvancedBooking from '../../common/AdvancedBooking';
import NotifyDerelictClient from '../../common/NotifyDerelictClient';
import AllowInstallmentPayments from '../../common/AllowInstallmentPayments';
import TimePicker from '../../common/TimePicker';



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Legal Holidays'];

export default class TrainerSetupScreen extends React.Component<any, CustomizeSessions>{

    constructor() {
        super();
        this.state = {
            flag: {
                is$: false,
            },
            sessionLength: 0,
            timeBtwApp: 0,
            sessionPrice: 0,
            numberOfSessions: 0,
            sessionSetupComponent: [],
            discountPackagesComponent: [],
            val: '',
            isChecked: false
        }
    }


    componentWillMount() {
        let state = Object.assign({}, this.state);
        state.sessionSetupComponent.push(<SessionSetup clickHandler={this.clickHandler} />)
        state.discountPackagesComponent.push(<DiscountPackages discountClickHandler={this.discountClickHandler} />)
        this.setState(state);

    }


    submit = (e: any) => {
        alert('Added Successfully');
    }

    clickHandler = () => {
        let state = Object.assign({}, this.state);
        state.sessionSetupComponent.push(<SessionSetup clickHandler={this.clickHandler} />)
        this.setState(state);

    }

    discountClickHandler = () => {
        let state = Object.assign({}, this.state);
        state.discountPackagesComponent.push(<DiscountPackages discountClickHandler={this.discountClickHandler} />)
        this.setState(state);
    }

    logChange = (e: any) => {
        this.setState({ val: e })
    }

    handleChange = (e: any) => {
        this.setState({ isChecked: e.target.checked })
    }

    render() {
        let popUp = <div></div>;
        if (this.state.isChecked === true) {
            popUp = <div>
                <div className="col-md-5">
                    <label>From</label>
                    <TimePicker />
                </div>
                <div className="col-md-5">
                    <label>To</label>
                    <TimePicker />
                </div>
            </div>
        }

        const daysArray = days.map((day, i) => {
            // let bind = this.handleChange.bind(this, i);
            return <div className="row " key={i}>
                <div className="col-md-11">
                    <label><input type="checkbox" onChange={this.handleChange} />{day}</label>
                    {popUp}
                </div>
            </div>
        });
        return (
            <div className="container">
                <div className='pageTitle'>
                    <Header text='Account Setup' />
                </div>
                <Form
                    submit={this.submit}
                    className="">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title text-center">Days available</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="checkbox">
                                        {daysArray}
                                    </div>
                                    <div className="text-center">
                                        <a href="/AdvancedOptions">Advanced options</a>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-info" type="button">Edit Profile <span className="glyphicon glyphicon-pencil"></span></button>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <SessionWell>
                                {this.state.sessionSetupComponent}
                            </SessionWell>
                            <DiscountPackagesWell>
                                {this.state.discountPackagesComponent}
                            </DiscountPackagesWell>
                            <div className="row">
                                <CancelationPolicy />
                                <RequireMinSessions />
                                <NotificationsPriorToSession />
                            </div>
                            <div className="row">
                                <AdvancedBooking />
                                <NotifyDerelictClient />
                                <AllowInstallmentPayments />
                            </div>
                        </div>
                    </div>

                    <div className="text-center registerButton secondRow col-md-offset-4">
                        <Button
                            className='btn btn-success'
                            text='Submit'
                        />
                    </div>
                </Form>
            </div>
        )
    }
}