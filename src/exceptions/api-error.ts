import { ValidationError } from "express-validator"


export default class ApiError extends Error {
    status: number
    message: string
    errors?: ValidationError[]

    constructor(status: number, message: string, errors?: ValidationError[]) {

        super(message) 
        this.message = message
        this.status = status 
        if (errors) this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не авторизован")
    }

    static BadRequest(message: string, errors: ValidationError[] = []) {
        return new ApiError(400, message, errors)
    }
}