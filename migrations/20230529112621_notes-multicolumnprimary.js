/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("notes", (table) => {
        table.dropPrimary();
        table.primary(["id", "user_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("notes", (table) => {
        table.dropPrimary();
        table.primary("id");
    });
};
