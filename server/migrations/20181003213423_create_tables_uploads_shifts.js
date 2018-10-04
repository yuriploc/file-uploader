exports.up = knex =>
  knex.schema
    .createTable('uploads', table => {
      table.increments('uploadId');
      table.string('filename');
    })
    .createTable('shifts', table => {
      table.integer('uploadId').notNullable();
      table.string('yardCode').notNullable();
      table.integer('employeeCode').notNullable();
      table.timestamp('clockIn');
      table.timestamp('clockOut');
      // table.primary(['uploadId', 'employeeCode])

      table
        .foreign('uploadId')
        .references('uploadId')
        .inTable('uploads');
    });

exports.down = knex => knex.schema.dropTable('shifts').dropTable('uploads');
