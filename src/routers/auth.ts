import { Router } from 'express'
import { auth } from '../controllers/auth'

const router: Router = Router()

router.route('/tenant/register').post(auth.register.tenant)
router.route('/staff/register').post(auth.register.staff)


router.route('/login').post(auth.login)



export default router