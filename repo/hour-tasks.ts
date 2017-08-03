import knex from './config';
import * as bcrypt from 'bcryptjs';
import { ClientHours } from '../types/clientHours';
import * as utils from '../utils';


async function addHours(clientHours: ClientHours) {
    let regDay = utils.utilities.getHoursAndMinutes(clientHours.regDay);
    let id = await knex('regdayhours').returning('id').insert(regDay);

    if (clientHours.specialDay) {
        let specialDay = utils.utilities.getHoursAndMinutes(clientHours.specialDay);
        id = await knex('specialdayhours').returning('id').insert(specialDay);
    }

    if (clientHours.friday) {
        let friday = utils.utilities.getHoursAndMinutes(clientHours.friday);
        id = await knex('fridayhours').returning('id').insert(friday);
    }

    return id;
}

async function getHours(id: number) {
    let clientHours: ClientHours = {
        regDay: await knex('regdayhours').select().where('clientId', id).first(),
        specialDay: await knex('specialdayhours').select().where('clientId', id).first(),
        friday: await knex('fridayhours').select().where('clientId', id).first()
    };

    return clientHours;
}


export {
    addHours,
    getHours

}