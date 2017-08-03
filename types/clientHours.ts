import { FromTo } from './fromTo';

export interface ClientHours {
    regDay: FromTo;
    friday?: FromTo;
    specialDay?: FromTo;
}