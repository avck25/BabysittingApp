exports.up = function (knex, Promise) {
    return knex.schema.table('payments', table => {
        table.float('paymentAmount');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('payments', table => {
        table.dropColumn('paymentAmount');
    });
};