exports.up = function (knex, Promise) {
    return knex.schema.createTable('ownerMissedDays', table => {
        table.increments('id').primary();
        table.integer('ownerId');
        table.date('date');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ownerMissedDays');
};
