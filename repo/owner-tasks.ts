import knex from './config';
import * as bcrypt from 'bcryptjs';
import { Owner } from '../types/owner';


async function addOwner(owner: Owner) {

    let hashPw = await bcrypt.hash(owner.password, 10);
    owner.password = hashPw;

    return await knex('owner').returning('id').insert(owner).catch((err: any) => err.code);

}

async function verifyTempToken(tempToken: string) {
    let result = await knex('owner').select('id').where('tempToken', tempToken).first();

    return result;

}

function updateOwner(id: number, fields: object) {
    return knex('owner').where('id', id).update(fields).catch((err: any) => err.code);
}

async function getCurrentClients(ownerId: number) {
    return await knex('clients').select().where({ 'ownerId': ownerId, 'archived': 0 });
}

async function getAllClients(ownerId: number) {
    return await knex('clients').select().where('ownerId', ownerId);
}


async function getOwner(id: number) {

    let owner: Owner = await knex('owner').select().where('id', id).first();
    return owner;
}


export {
    addOwner,
    verifyTempToken,
    getCurrentClients,
    getOwner,
    updateOwner,
    getAllClients
}