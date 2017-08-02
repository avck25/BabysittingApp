import * as React from 'react';
import NotificationPanelLi from './NotificationPanelLI';
import PanelLiHeader from '../../common/PanelLiHeader';
import axios from 'axios';
import * as moment from 'moment';
import { Notification } from '../../../../types/notification';



export default class NotificationPanel extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {
            start: '',
            notifications: [],
            buttonText: 'All Messages',
            buttonClickFunctions: {
                'All Messages': this.setAllNotifications,
                'Todays Messages': this.setDayNotifications
            }

        }
    }

    setDayNotifications = async () => {
        let state = Object.assign({}, this.state);
        let today = moment().format('YYYY-MM-DD');
        //the 38 is the trainer id obviously thats not gonna be hard coded
        state.notifications = await this.getNotifications(today);
        state.buttonText = 'All Messages';
        this.setState(state);
    }

    setAllNotifications = async () => {
        let state = Object.assign({}, this.state);

        //the 38 is the trainer id obviously thats not gonna be hard coded
        state.notifications = await this.getAllNotifications();
        state.buttonText = 'Todays Messages';
        this.setState(state);
    }

    getNotifications = async (day: string) => {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { 'x-access-token': token }
        };
        //the 38 is the trainer id obviously thats not gonna be hard coded
        let response = await axios.get(`api/notifications/notifications/1/${day}`, config);

        return response.data;

    }

    getAllNotifications = async () => {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { 'x-access-token': token }
        };
        //the 38 is the trainer id obviously thats not gonna be hard coded
        let response = await axios.get(`api/notifications/notifications/1`, config);

        return response.data;
    }

    async componentDidMount() {

        await this.setDayNotifications();



    }

    display = () => {
        return (
            React.createElement(
                PanelLiHeader,
                {
                    key: 'today',
                    day: ''
                },
                this.state.notifications.map((notification: any) => {
                    return React.createElement(
                        NotificationPanelLi,
                        {
                            id: notification.id,
                            key: notification.id,
                            time: notification.time,
                            read: notification.isRead,
                            msgType: notification.messageType,
                            messageHeader: notification.messageHeader,
                            message: notification.message,
                            date: notification.date
                        }
                    )
                })
            )
        )
    }



    render() {
        let elements = this.display();

        return (
            <div id="notifications" className="trainer-dash-panel panel panel-danger">
                <div className="panel-heading notificationHeader">
                    <h3 className="text-center ">My Messages</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-offset-4 col-sm-4">
                            <button onClick={this.state.buttonClickFunctions[this.state.buttonText]} type="button" className="btn btn-primary getNoticationBtn">{this.state.buttonText}</button>
                        </div>
                    </div>
                    <ul className="media-list">
                        {elements}
                    </ul>
                </div>
            </div >
        )
    }
} 