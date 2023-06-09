import { Router } from 'express'
import users from '../controllers/users'

const router: Router = Router()

router.route('/tenant')
    .get(users.get.tenant)
    .put(users.update.tenant)
    .delete(users.delete.tenant)




router.route('/staff')
    .get(users.get.staff)
    .put(users.update.staff)
    .delete(users.delete.staff)
    .post(users.add.staff)

export default router