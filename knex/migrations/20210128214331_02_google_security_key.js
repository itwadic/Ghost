
exports.up = function(knex) {
    return knex.schema.createTable('google_security_keys', (table) => {
        table.increments();
        table.string('json_sec_key').notNullable();
        table.boolean('status').notNullable().defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('google_security_keys');
};
