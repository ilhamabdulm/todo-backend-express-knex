exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .then(() => {
      return knex.schema.createTable('projects', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.timestamps(true, true);
      });
    })
    .then(() => {
      return knex.schema.createTable('projects_users', function (table) {
        table.increments('id').primary();
        table.integer('project_id').unsigned().notNullable();
        table
          .foreign('project_id')
          .references('projects.id')
          .onDelete('CASCADE');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.timestamps(true, true);
      });
    })
    .then(() => {
      return knex.schema.createTable('todos', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.integer('order').defaultTo(0);
        table.boolean('completed').defaultTo(false);
        table.integer('project_id').unsigned().notNullable();
        table
          .foreign('project_id')
          .references('projects.id')
          .onDelete('CASCADE');
        table.integer('user_id').unsigned().nullable();
        table.foreign('user_id').references('users.id').onDelete('SET NULL');
        table.timestamps(true, true);
      });
    });
};

exports.down = function (knex) {
  // Drop tables in reverse order to avoid foreign key constraint errors
  return knex.schema
    .dropTableIfExists('todos')
    .then(() => knex.schema.dropTableIfExists('projects'))
    .then(() => knex.schema.dropTableIfExists('users'));
};
