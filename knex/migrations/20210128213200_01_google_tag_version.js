
exports.up = function(knex) {
    return knex.schema.createTable('google_tag_versions', (table) => {
        table.increments();
        table.string('account_id').notNullable();
        table.string('container_id').notNullable();
        table.string('workspace_id').notNullable();
        table.string('version_id').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('google_tag_versions');

};
