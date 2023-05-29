npx knex init - Initializes Knex in the project. Creates knexfile.js with database configurations.
npx knex migrate:make [name] - Creates a new migration file in the migrations directory.
npx knex migrate:latest - Runs all migrations that have not yet been run.

npx knex migrate:up [name] - Runs the next chronological migration that has not yet been run.
npx knex migrate:rollback - Rolls back the latest batch of migrations.
npx knex migrate:down [name] - Undo the last batch of migrations.
npx knex migrate:currentVersion - View the current migration version.
npx knex migrate:list - List all migrations with status.
npx knex seed:make [name] - Creates a new seed file in the seed directory.
npx knex seed:run - Runs all seed files in the seed directory.
