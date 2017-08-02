import { combineReducers } from 'redux';
import validate from './validate';
import validateEmailPassword from './validateEmailPassword';
import renderNav from './renderNav';
import appointments from './appointmentReducer/appointmentReducer';


const rootReducer = combineReducers({
    validateEmailPassword,
    validate,
    renderNav,
    appointments
});

export default rootReducer;