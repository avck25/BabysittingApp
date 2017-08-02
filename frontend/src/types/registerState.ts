import { AdvancedBooking } from '../../../types/advancedBooking';
import register from '../registerServiceWorker';
import { Register } from './register';

export interface RegisterState{
    success:{
        isSubmitted: boolean
    };
    register: Register;
}