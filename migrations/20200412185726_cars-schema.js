
exports.up = function(knex) {
    return knex.schema.createTable('cars-migration', tbl => {
        tbl.increments('id');
        tbl.text('vin', 17).unique().notNullable();
        tbl.text('make').notNullable();
        tbl.text('model').notNullable();
        tbl.integer('mileage').notNullable();
        tbl.text('titleStatus');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars-migration');
};
