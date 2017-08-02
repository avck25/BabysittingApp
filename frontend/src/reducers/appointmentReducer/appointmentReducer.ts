import * as types from '../../actions/appointments/appointmentTypes';


const initialState = {
    appointment: null,
    appointments: []
}

export default function appointmentReducer(state = initialState, action: any) {
    let newState: any;
    switch (action.type) {

        case types.GET_ALL_APPOINTMENTS_SUCCESS:
            newState = Object.assign({}, state);
            newState.appointments = action.payload
            return newState;
        case types.REDUCE_ALL_APPOINTMENTS_SUCCESS:
            newState = Object.assign({}, state);
            newState.appointments = action.payload
            return newState;

        case types.SET_CANCELED_SUCCESS:
            newState = Object.assign({}, state);

            newState.appointments.find((e: any) => {
                return e.events.find((a: any) => {
                    if (a.id === action.payload) {
                        a.canceled = true;
                        return a;
                    }
                });
            });

            return newState;
        case types.SET_COMPLETED_SUCCESS:
            newState = Object.assign({}, state);
            newState.appointments.find((e: any) => {
                return e.events.find((a: any) => {
                    if (a.id === action.payload) {
                        a.completed = true;
                        return a;
                    }

                })
            });

            return newState;

        default:
            return state;
    }
}

