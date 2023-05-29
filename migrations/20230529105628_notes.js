/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable("notes", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("content").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.json("tags");
        table.integer("user_id").unsigned().references("id").inTable("users");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("notes");
};
