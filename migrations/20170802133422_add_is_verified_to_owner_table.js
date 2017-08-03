exports.up = function (knex, Promise) {
    return knex.schema.table('owner', table => {
        table.boolean('isVerified');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('owner', table => {
        table.dropColumn('isVerified');
    });
};