import jwt from "jsonwebtoken"
import Token from "@/models/Token"
import config from "@/config/index"
import UserDto from "@/dtos/user-dto"


export const generateTokens = (payload: string | object | Buffer) => {
    const accessToken: string = jwt.sign(payload, config.jwt.access_secret, {expiresIn: config.jwt.access_expiration})
    const refreshToken: string = jwt.sign(payload, config.jwt.refresh_secret, {expiresIn: config.jwt.refresh_expiration})

    return {
        accessToken,
        refreshToken
    }
} 

export const saveToken = async (userId: number, refreshToken: string) => {
    const tokenData = await Token.query().findOne('user_id', userId)

    if (tokenData) {

        await tokenData.$query().updateAndFetch({refreshToken})

        return tokenData
    }

    const token = await Token.query().insertAndFetch({user_id: userId, refreshToken})
    return token
}

export const removeToken = async (refreshToken: string) => {
    const tokenData = await Token.query().findOne({refreshToken}).delete()
    
    return tokenData
}


export const findToken = async (refreshToken: string) => {
    const tokenData = await Token.query().findOne({refreshToken})
    return tokenData
}


export const validateAccessToken = (token: string): UserDto | null => {
    try {

        const userData = jwt.verify(token, config.jwt.access_secret)

        return userData as UserDto

    } catch (e) {

        return null
    }
}

export const validateRefreshToken = (token: string): UserDto | null => {
    try {
        const userData = jwt.verify(token, config.jwt.refresh_secret)

        return userData as UserDto
        
    } catch (e) {
        console.log(e)
        return null
    }
}
