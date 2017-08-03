exports.up = function (knex, Promise) {
    return knex.schema.table('owner', table => {
        table.unique('username');
        table.unique('email');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('owner', table => {
        table.dropUnique('username');
        table.dropUnique('email');
    });
};