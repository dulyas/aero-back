
import { Result, ValidationError, validationResult } from "express-validator"
import ApiError from "@/exceptions/api-error"
import { NextFunction, Request, Response } from 'express';
import { User } from "@/models";
import * as authService from '@/services/auth'
import config from "@/config";
import { validateAccessToken } from "@/services/token";

export const registration = async (req: Request, res: Response, next: NextFunction) => {



    try {
        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
        }

        const {email, password, phone} = req.body

        const userData = await authService.registration(email, password, phone)
        // res.cookie('refreshToken', userData.refreshToken, {
        //     maxAge: +config.jwt.refresh_expiration || 360000,
        //     httpOnly: true
        // })
        return res.json(userData)
    } catch (e) {
        next(e)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {id, password} = req.body
        const userData = await authService.login(id, password)

        // res.cookie('refreshToken', userData.refreshToken, {
        //     maxAge: +config.jwt.refresh_expiration || 360000,
        //     httpOnly: true
        // })
        return res.json(userData)
    } catch (e){

        next(e)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // console.log(req)
        // const {refreshToken} = req.cookies

        const {user} = req

        if (!user) throw ApiError.UnauthorizedError()
        // console.log(user)

        const token = await authService.logout(user.id)
        // res.clearCookie('refreshToken')
        return res.json(token)
    } catch (e){
        next(e)
    }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {


    try {
        // const {refreshToken} = req.cookies
        const {refreshToken} = req.body

        const userData = await authService.refresh(refreshToken)
        // res.cookie('refreshToken', userData.refreshToken, {
        //     maxAge: +config.jwt.refresh_expiration || 360000,
        //     httpOnly: true
        // })
        return res.json(userData)
    } catch (e){
        next(e)
    }
}


export const info = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req?.user) throw ApiError.UnauthorizedError()

        return res.json(req?.user.id)

    } catch (e){
        next(e)
    }
}
