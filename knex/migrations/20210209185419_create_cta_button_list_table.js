
exports.up = function(knex) {
  return knex.schema.createTable('cta_button_list', function(table) {
    table.increments('id');
    table.string('cta_name').notNullable();
    table.text('cta').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cta_button_list');
};
