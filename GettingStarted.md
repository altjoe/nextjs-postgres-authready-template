These are the thigns you will need to edit when starting a new application:

1. docker compose file:
    - container_name: <name of the container>
    - ports: <port on host>:<port on container>
    - volumes: <path on host>:<path on container>

2. Run docker compose to startup database:
    - docker compose up -d
    - When running compose file on windows pc, you will need to run 'docker compose up -d' in cmd or powershell

3. You will need to run all database migrations to create schema:
    - npx knex migrate:latest

4. Adjust knexfile to match docker compose enviroment:
    - really only need to change the production environment
    