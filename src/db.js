const {development, production} = require("../knexfile");
const knex = require("knex")(development)   

module.exports = knex;