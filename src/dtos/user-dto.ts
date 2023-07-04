
import User from "@/models/User"


export default class UserDto {
    email: string
    phone?: string
    id: number

    constructor(model: User) {
        this.email = model.email
        this.id = model.id
        if (model.phone) this.phone = model.phone
    }
}