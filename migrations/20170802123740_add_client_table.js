
exports.up = function (knex, Promise) {
    return knex.schema.createTable('clients', table => {
        table.increments('id').primary();
        table.integer('ownerId');
        table.string('homePhoneNumber');
        table.string('email');
        table.string('cellPhoneNumber');
        table.boolean('hasText');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('clients');
};
