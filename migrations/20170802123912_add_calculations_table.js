
exports.up = function (knex, Promise) {
    return knex.schema.createTable('calculations', table => {
        table.increments('id').primary();
        table.integer('clientId');
        table.date('date');
        table.integer('extraMinutes');
        table.boolean('missed');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('calculations');
};
