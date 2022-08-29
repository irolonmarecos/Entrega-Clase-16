
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('chat', (table) => {
        table.increments('id').primary().notNullable();
        table.string('email', 255).notNullable();
        table.string('mensaje', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('chat')

};