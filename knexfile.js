// Update with your config settings.

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: "content/data/ghost-dev.db"
    },
    migrations: {
      directory: "./knex/migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: "./knex/seeds",
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./knex/migrations",
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./knex/migrations",
      tableName: 'knex_migrations'
    }
  }

};
