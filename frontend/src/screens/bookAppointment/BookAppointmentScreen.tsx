import * as React from 'react';
import { connect } from 'react-redux';
import * as appointmentActions from '../../actions/appointments/appointmentActions';
import BigCalendar from 'react-big-calendar';
import Views from 'react-big-calendar';
import * as moment from 'moment';
import axios from 'axios';
const Modal = require('react-modal/lib');
import { Appointment } from '../../../../types/appointment';
require('./sample.css');



// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
let events = [{
    title: 'Birthday Party',
    startDate: moment().hour(7).toDate(),
    endDate: moment().hour(10).toDate()
}, {
    title: 'meeting at bitbean',
    startDate: moment().hour(4).toDate(),
    endDate: moment().hour(5).toDate()
}];
let allViews = Object.keys(Views).map(k => Views[k])


let viewChange = (e: any) => {
    console.log('hello view Change');
}

class DayzTestComponent extends React.Component<any, any>{
    constructor() {
        super();
        this.state = {
            events: [],
            modal: false
        }
    }

    selectSlot = (eventInfo: any) => {
        let state = Object.assign({}, this.state)
        state.modal = true;
        this.setState(state);
    }

    async componentDidMount() {
        let state = Object.assign({}, this.state);
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { 'x-access-token': token }
        };
        let response = await axios.get(`api/appointments/appointments/2/${moment().startOf('week').format("YYYY-MM-DD")}/${moment().endOf('week').format("YYYY-MM-DD")}/${false}`, config);
        console.log(response.data);
        response.data.forEach((appt: any) => {
            appt.events.forEach((e: Appointment) => {

                let time = e.startTime.toString().split(':');
                let startTime = parseInt(time[0]);
                console.log(startTime);
                if (!e.canceled) {
                    console.log(e.sessionDate);
                    state.events.push({
                        title: `${e.firstName} ${e.lastName} `,
                        startDate: moment(e.sessionDate).hour(startTime).toDate(),
                        endDate: moment(e.sessionDate).hour(startTime).add(e.sessionLength, 'm').toDate()
                    });
                }

            });
        });
        this.setState(state);
    }

    render() {
        console.log('hello');
        return (
            <div>

                <BigCalendar
                    events={this.state.events}
                    // onSelectSlot={this.selectSlot}
                    //onView={viewChange}
                    //onSelectEvent={(event: any) => console.log(event)}
                    //popup={true}
                    //selectable={true}

                    //defaultView='week'
                    startAccessor='startDate'
                    endAccessor='endDate'

                />
                <Modal
                    isOpen={this.state.modal}
                    contentLabel="Modal"
                >
                    <h1>Modal Content</h1>
                    <p>Etc.</p>
                </Modal>
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

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DayzTestComponent);


// import * as React from 'react';
// const Dayz = require("dayz");
// import * as moment from 'moment';
// import { extendMoment } from 'moment-range';
// //require('moment-range');
// import './sample.css';
// const theMoment = extendMoment(moment);

// let COUNT = 1;

// class DayzTestComponent extends React.Component<any, any>{

//     constructor() {
//         super();

//         const date = moment();
//         this.state = {
//             date,
//             display: 'week',
//             events: new Dayz.EventsCollection([
//                 {
//                     content: 'A short event',
//                     range: theMoment.range(date.clone(),
//                         date.clone().add(1, 'day'))
//                 },
//                 {
//                     content: 'Two Hours ~ 8-10',
//                     range: theMoment.range(date.clone().hour(8),
//                         date.clone().hour(10))
//                 },
//                 {
//                     content: "A Longer Event",
//                     range: theMoment.range(date.clone().subtract(2, 'days'),
//                         date.clone().add(8, 'days'))
//                 }
//             ])
//         };
//     }

//     changeDisplay = (ev: any) => {
//         this.setState({ display: ev.target.value });
//     }

//     onEventClick = (ev: any, event: any) => {
//         // event.set({ editing: !event.isEditing() });
//         console.log(ev, event);
//     }
//     onEventResize = (ev: any, event: any) => {
//         const start = event.start().format('hh:mma');
//         const end = event.end().format('hh:mma');
//         event.set({ content: `${start} - ${end} (resizable)` });
//     }
//     addEvent = (ev: any, date: any) => {
//         console.log(ev, date);
//     }

//     editComponent = (props: any) => {
//         const onBlur = function () { props.event.set({ editing: false }); };
//         const onChange = function (ev: any) { props.event.set({ content: ev.target.value }); };
//         const onDelete = function () { props.event.remove(); };
//         return (
//             <div className="edit">
//                 <input type="text" autoFocus
//                     value={props.event.content()}
//                     onChange={onChange}
//                     onBlur={onBlur}
//                 />
//                 <button onClick={onDelete}>X</button>
//             </div>
//         );
//     }

//     render() {

//         return (
//             <div className="dayz-test-wrapper">

//                 <div className="tools">
//                     <label>
//                         Month: <input type="radio"
//                             name="style" value="month" onChange={this.changeDisplay}
//                             checked={this.state.display === 'month'} />
//                     </label><label>
//                         Week: <input type="radio"
//                             name="style" value="week" onChange={this.changeDisplay}
//                             checked={this.state.display === 'week'} />
//                     </label><label>
//                         Day: <input type="radio"
//                             name="style" value="day" onChange={this.changeDisplay}
//                             checked={this.state.display === 'day'} />
//                     </label>
//                 </div>
//                 <div className="dayz-official">
//                     <Dayz
//                         date={this.state.date}
//                         events={this.state.events}
//                         display={this.state.display}

//                         onEventResize={this.onEventResize}
//                         editComponent={this.editComponent}
//                         onDayClick={this.addEvent}
//                         onEventClick={this.onEventClick}

//                     >
//                     </Dayz>
//                 </div>
//             </div>
//         );
//     }
// }

// export default DayzTestComponent;