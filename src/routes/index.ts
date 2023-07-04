
import { Router } from "express";
import auth from './auth'
import file from './file'

const router = Router()

router.use('', auth)
router.use('', file)


export default router