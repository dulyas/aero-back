import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tokens', function (table) {
        table.increments('id');
        table.integer('user_id').notNullable();
        table.string('refreshToken', 255).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("tokens");
}

