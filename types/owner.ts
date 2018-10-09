import { Client } from './client';


export interface Owner {
    id?: number;
    firstName: string;
    lastName: string;
    isVerified?: boolean;
    temptoken?: any;
    address: any;
    city: any;
    state: any;
    zipCode: any;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    hourlyRate: any;
    clients?: Array<Client>;
}
