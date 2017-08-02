import { Validate } from '../types/validate'

export interface InputProps {
    label: string
    type: string;
    name: string;
    value: string;
    placeholder: string;
    required?: any;
    errorMessage?: string;
    hasError?: IError;
    changeHandler: (e: any) => void;
}

interface IError {
    hasError: boolean;
}