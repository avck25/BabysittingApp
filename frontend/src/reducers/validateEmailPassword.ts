import * as types from '../actions/types';
import { ValidateEmailPassword } from '../types/validateEmailPassword';

const initialState = {
    isEmail: true,
    isStrongPass: true,
    password:{
        password: '',
        flag: false,
        error: false,
    }
}

export default function validateEmailPasswordReducer(state :any = initialState , action:any) {
    switch(action.type) {
        case types.ADD_EMAIL_PASSWORD_VALIDATE:
            let obj = Object.assign({}, state);
                obj = action.payload;
            return obj;
        case types.EMAIL_VALIDATE_SUCCESS:
            let emailObj = Object.assign({}, state);
                emailObj.isEmail = action.payload;
            return emailObj;  
        case types.PASSWORD_VALIDATE_SUCCESS:
            let passwordObj = Object.assign({}, state);
                passwordObj.password = action.payload;
            return passwordObj;
         case types.PASSWORD_STRENGTH_SUCCESS:
            let passStrengthObj = Object.assign({}, state);
                passStrengthObj.isStrongPass = action.payload;
            return passStrengthObj;           
        case types.REMOVE_EMAIL_PASSWORD_VALIDATE_SUCCESS:
            let removeObj = Object.assign({}, state);
                removeObj = action.payload;
            return removeObj;
        default:
            return state
    }
}