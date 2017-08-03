import knex from './config';
import * as bcrypt from 'bcryptjs';
import { Client } from '../types/client';


async function addClient(client: Client) {
    let id = await knex('clients').returning('id').insert(client);
    return id;
}

async function getClient(id: number) {
    let client: Client = await knex('clients').select().where('id', id).first();
    return client;
}


export {
    addClient,
    getClient

}