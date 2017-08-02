import { Login } from '../../../types/user';
export interface LoginState {
    user: {
        hasToken: boolean,
        roll: string,
        isAdmin: boolean
    };
    render:{
        renderThis: any;

    };
    login: Login;
    errors:{
        errorMessage: any;
    }
    
}