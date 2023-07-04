import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('email', 255).notNullable();
        table.string('phone', 255);
        table.string('password', 255).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("users");
}

