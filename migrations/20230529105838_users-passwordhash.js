/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    // change column [password] on table [users] to [passwordhash]
    return knex.schema.table("users", (table) => {
        table.renameColumn("password", "passwordhash");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    // change column [passwordhash] on table [users] to [password]
    return knex.schema.table("users", (table) => {
        table.renameColumn("passwordhash", "password");
    });
};
