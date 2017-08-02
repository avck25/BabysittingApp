export interface PasswordValidate{
    passwordObj:{
        password: string,
        isSinglePass: boolean,
        flag: boolean,
        error: boolean,
        isStrongPass: boolean
    }
}