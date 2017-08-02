import { isBoolean } from 'util';

export interface Register{
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
    verifyPassword: string;
    id: number;
    isAdmin: boolean;
}