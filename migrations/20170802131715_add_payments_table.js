
exports.up = function (knex, Promise) {
    return knex.schema.createTable('payments', table => {
        table.increments('id').primary();
        table.integer('clientId');
        table.date('dateOfPayment');
        table.string('extraMinutes');
        table.boolean('check');
        table.boolean('cash');
        table.integer('checkNumber')

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('payments');
};
