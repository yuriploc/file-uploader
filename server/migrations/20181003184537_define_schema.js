exports.up = knex.schema.createTable('files', tb => {
  // fileid
  // filename
  // fileblob
});

exports.down = knex => knex.schema.dropTable('files');
