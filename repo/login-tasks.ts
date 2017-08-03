import knex from './config';
import { Owner } from '../types/owner';
import { Login } from '../types/login';
import * as utils from '../utils';




async function login(login: Login) {
    let user: Owner;
    console.log(login);



    user = await knex('owner').select().where('username', login.username).first();

    if (user) {
        if (await utils.utilities.comparePassword(login.password, user.password)) {
            return user;
        } else {
            return 'invalid password'
        }
    } else {
        return 'invalid Username';
    }
}

export { login }