import { Model } from "objection";
import UserDto from "@/dtos/user-dto";


export type UserWithTokens = {
    refreshToken: string
    accessToken: string
    user: UserDto
}


export default class User extends Model {
    id!: number
    email!: string
    password!: string
	phone?: string


    static get tableName() {
        return 'users'
    }


}