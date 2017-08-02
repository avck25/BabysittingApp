import * as types from './types';
import {InputValidate} from '../types/inputValidate';
import {PasswordValidate} from '../types/passwordValidate';

function clickedSuccess(isClicked: boolean) {
    return {
        type: types.CLICK_SUCCESS,
        payload: isClicked
    }
}

function loginSuccess(loggedInObj: {} ){
    return{
        type: types.LOGIN_SUCCESS,
        payload: loggedInObj
    }
}

function wasValidatedSuccess(wasValidated: boolean) {
    return {
        type: types.WAS_VALIDATED_SUCCESS,
        payload: wasValidated
    }
}

function addValidateSuccess(validateObj:InputValidate) {
    return {
        type: types.ADD_VALIDATE_SUCCESS,
        payload: validateObj
    }
}

function changeValidateSuccess(validateObj:InputValidate) {
    return {
        type: types.CHANGE_VALIDATE_SUCCESS,
        payload: validateObj
    }
}

function passwordValidateSuccess(passwordObj: PasswordValidate){
    return{
        type: types.PASSWORD_VALIDATE_SUCCESS,
        payload: passwordObj
    }
}

function passwordStrengthSuccess(isSingle: boolean){
    return{
        type: types.PASSWORD_STRENGTH_SUCCESS,
        payload: isSingle
    }
}


function initializeEmailPasswordSuccess(obj:any){
     return{
        type: types.ADD_EMAIL_PASSWORD_VALIDATE,
        payload: obj
    }
}

function emailValidateSuccess(isEmail: boolean){
    return{
        type: types.EMAIL_VALIDATE_SUCCESS,
        payload: isEmail
    }
}



function removeEmailPasswordValidateSuccess() {
    return {
        type: types.REMOVE_EMAIL_PASSWORD_VALIDATE_SUCCESS,
        payload: {
            isEmail: true,
            isStrong: true,
            password:{
                password: '',
                flag: false,
                error: false
            }
        }
    }
}

function removeValidateSuccess() {
    return {
        type: types.REMOVE_VALIDATE_SUCCESS,
        payload: {
            wasClicked: false,
            wasValidated: true,
            inputs: []
        }
    }
}

export {
    clickedSuccess,
    loginSuccess,
    wasValidatedSuccess,
    addValidateSuccess,
    changeValidateSuccess,
    removeValidateSuccess,
    initializeEmailPasswordSuccess,
    emailValidateSuccess,
    passwordValidateSuccess,
    passwordStrengthSuccess,
    removeEmailPasswordValidateSuccess
    
}



