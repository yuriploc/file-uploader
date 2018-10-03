exports.up = knex =>
  knex.schema.createTable('files', table => {
    table.increments();
    table.string('filename');
    table.binary('file');
  });

exports.down = knex => knex.schema.dropTable('files');
