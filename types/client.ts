export interface Client {
    id?: number;
    ownerId?: number;
    homePhoneNumber: string;
    email: string;
    cellPhoneNumber: string;
    hasText: boolean;
}