exports.up = knex =>
  knex.schema.alterTable('files', table => table.renameColumn('id', 'fileid'));

exports.down = knex =>
  knex.schema.alterTable('files', table => table.renameColumn('fileid', 'id'));
