import knex from './config';
import * as bcrypt from 'bcryptjs';
import { Client } from '../types/client';


async function getOwnerMissedDays(ownerId: number, dateFrom: string, dateTo: string) {
    return await knex('ownerMissedDays').where('ownerId', ownerId).andWhereBetween('date', [dateFrom, dateTo])
        .select('date');

}

async function getClientMissedDays(clientId: number, dateFrom: string, dateTo: string) {
    return await knex('calculations').select('date').where({ clientId: clientId, missed: 1 }).andWhereBetween('date', [dateFrom, dateTo]);

}

async function getClientextraMinutes(clientId: number, dateFrom: string, dateTo: string) {
    return await knex('calculations').where({ clientId: clientId, missed: 0 }).andWhereBetween('date', [dateFrom, dateTo]).sum('extraMinutes as extraMinutes').first();
}

async function getHourlyRate(ownerId: number) {
    return await knex('owner').where('id', ownerId).select('hourlyRate').first();
}


export {
    getOwnerMissedDays,
    getClientMissedDays,
    getClientextraMinutes,
    getHourlyRate

}