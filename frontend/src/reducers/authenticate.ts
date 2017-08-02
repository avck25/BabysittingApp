import * as types from '../actions/types';

let user = {
    isAdmin: false,
    type: ''
}

export default function authenticateReducer(state :any = user , action:any) {
    switch(action.type) {
        case types.LOGIN_SUCCESS:
            let loginObj = Object.assign({}, state);
                loginObj= action.payload;
            return loginObj;
        default:
            return state
    }
}