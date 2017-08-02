export interface InputState {
    error: IError;
}

interface IError {
    hasError: boolean;
    invalidMsg: any;
}