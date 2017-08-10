
exports.up = function (knex, Promise) {
    return knex.schema.table('clients', table => {
        table.boolean('archived');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('clients', table => {
        table.dropColumn('day');
    });
};
