
exports.up = function (knex, Promise) {
    return knex.schema.table('owner', table => {
        table.dropColumn('street');
    });
};

exports.down = function (knex, Promise) {

};
