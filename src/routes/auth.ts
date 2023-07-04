
// import authMiddleware from "@/middleware/auth-middleware";
import { body } from "express-validator";
import { info, registration, login, logout, refresh } from "@/controllers/auth";
import { NextFunction, Request, Response, Router } from "express";
import authMiddleware from "@/middleware/auth-middleware";

const router = Router()


router.post('/signup',
    body('email').isEmail().isLength({min: 6, max: 50}),
    body('password').isLength({min: 6, max: 50}),
    (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'Register New User'
        /* #swagger.parameters['email'] = {
        description: 'user email',
        type: 'string',
        required: true
        } */
        /* #swagger.parameters['password'] = {
        description: 'user password',
        type: 'string',
        required: true
        } */
        /* #swagger.responses[200] = {
        description: 'User with Refresh and Acess tokens',
        schema: { $ref: '#/definitions/UserWithTokens' }
        } */
        registration(req, res, next)
    })

router.post('/signin', (req: Request, res: Response, next: NextFunction) => {
    
    // #swagger.description = 'User Login'
    /* #swagger.parameters['email'] = {
    description: 'user email',
    type: 'string',
    required: true
    } */
    /* #swagger.parameters['password'] = {
    description: 'user password',
    type: 'string',
    required: true
    } */
    /* #swagger.responses[200] = {
    description: 'User with Refresh and Acess tokens',
    schema: { $ref: '#/definitions/UserWithTokens' }
    } */
    login(req, res, next)
})

router.post('/signin/new_token', (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'update refresh token from refresh token'
    /* #swagger.parameters['refreshToken'] = {
    description: 'user refreshToken',
    type: 'string',
    required: true
    } */
    /* #swagger.responses[200] = {
    description: 'User with Refresh and Acess tokens',
    schema: { $ref: '#/definitions/UserWithTokens' }
    } */

    refresh(req, res, next)
})

// router.get('/user/', getUsers)

router.get('/logout', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'logout from refresh token'
    logout(req, res, next)
})

router.get('/info', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'get User Id from refresh token '
    /* #swagger.responses[200] = {
        id: '1'
    } */
    info(req, res, next)
})





export default router;