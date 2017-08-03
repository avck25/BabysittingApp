
exports.up = function (knex, Promise) {
    return knex.schema.createTable('owner', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('address');
        table.string('street');
        table.string('city');
        table.string('state');
        table.string('zipCode');
        table.string('phoneNumber');
        table.integer('hourlyRate');
        table.string('email');
        table.string('temptoken');
        table.string('username');
        table.string('password');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('owner');
};
