import knex from "knex";
import knexfile from "../knexfile";
import { Model } from "objection";

const connectDatabase = () => {
    

    const db = knex(knexfile.development)


    Model.knex(db);
}

export default connectDatabase