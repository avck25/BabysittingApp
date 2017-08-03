exports.up = function (knex, Promise) {
    return knex.schema.table('specialdayhours', table => {
        table.string('day');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('specialdayhours', table => {
        table.dropColumn('day');
    });
};