import * as React from 'react';
import * as moment from 'moment';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { NotificationPanelLiProps } from '../../types/notificationPanelLiProps';



export default class NotificationPanelLi extends React.Component<NotificationPanelLiProps, any> {
    constructor(props: NotificationPanelLiProps) {
        super(props);


    }


    render() {
        let today = moment().format('YYYY-MM-DD');
        let date = moment(this.props.date).format('YYYY-MM-DD') === today ? 'Today' : moment(this.props.date).format('MM/DD');
        let time = moment(today + 'T' + this.props.time).format('h:mm a');


        return (
            <div>
                <span className="label label-pill label-default">{date + ' ' + time}</span>
                {!this.props.read ? <span className="label label-pill label-warning">new</span> : ''}
                <h4 className={"media-heading " + this.props.msgType}>
                    {this.props.messageHeader}
                    <a><span className="glyphicon glyphicon-trash delete"></span></a>
                </h4>
                <p className={this.props.msgType}>{this.props.message}</p>
            </div>
        );
    }
}