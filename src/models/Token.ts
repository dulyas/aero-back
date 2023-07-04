import { Model } from "objection";


export default class Token extends Model {
    id!: number
    user_id!: number
    refreshToken!: string

    static get tableName() {
        return 'tokens'
    }
}