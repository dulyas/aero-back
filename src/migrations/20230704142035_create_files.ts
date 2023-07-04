import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('files', function (table) {
        table.increments('id');
        table.string('originalname').notNullable()
        table.string('filename').notNullable()
        table.string('encoding').notNullable()
        table.string('mimetype').notNullable()
        table.string('path').notNullable()
        table.integer('size').notNullable()
        table.timestamp("date_added").defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("files");
}

