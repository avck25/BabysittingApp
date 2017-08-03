
exports.up = function (knex, Promise) {
    return knex.schema.createTable('regDayHours', table => {
        table.increments('id').primary();
        table.integer('clientId');
        table.time('from');
        table.time('to');
        table.integer('hours');
        table.integer('minutes');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('regDayHours');
};
