import * as types from '../actions/types';
import {Validate} from '../types/validate';

const initialState = {
    wasClicked: false,
    wasValidated: true,
    inputs: []
}

export default function validateReducer(state :Validate = initialState , action:any) {
    switch(action.type) {
        case types.CLICK_SUCCESS:
            let clickObj = Object.assign({}, state);
            clickObj.wasClicked = action.payload;
            return clickObj;  
        case types.WAS_VALIDATED_SUCCESS:
            let validateObj = Object.assign({}, state);
            validateObj.wasValidated = action.payload;
            return validateObj;    
        case types.ADD_VALIDATE_SUCCESS:   
            let addObj = Object.assign({}, state);
            let addArray = [...addObj.inputs];
            addArray = action.payload;
            addObj.inputs.push(addArray);
            return addObj;  
        case types.CHANGE_VALIDATE_SUCCESS:
            let validationObj = Object.assign({}, state);
            let array = [...validationObj.inputs];
            let currentIndex = array.findIndex(o => o.name === action.payload.name);
            let current = array[currentIndex];
            let copIedObj = Object.assign({}, current);
            copIedObj = action.payload;
            array[currentIndex] = copIedObj;
            validationObj.inputs = array;
            return validationObj;
        case types.REMOVE_VALIDATE_SUCCESS:
            let removeObj = Object.assign({}, state);
            removeObj = action.payload;
            return removeObj;
        default:
            return state
    }
}