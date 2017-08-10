exports.up = function (knex, Promise) {
    return knex.schema.table('clients', table => {
        table.string('firstName');
        table.string('lastName');
        table.string('babysName');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('clients', table => {
        table.dropColumn('firstName');
        table.dropColumn('lastName');
        table.dropColumn('babysName');
    });
};