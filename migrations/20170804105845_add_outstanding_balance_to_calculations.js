exports.up = function (knex, Promise) {
    return knex.schema.table('calculations', table => {
        table.float('balance');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('calculations', table => {
        table.dropColumn('balance');
    });
};