import { Client } from './client';


export interface Owner {
    id?: number;
    firstName: string;
    lastname: string;
    isVerified?: boolean;
    tempToken?: any;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    clients?: Array<Client>;
}
