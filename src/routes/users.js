import {Router} from 'express'
import {signin, signup, getUsers, deleteUser} from '../controller/User.js'
const router = Router()

router.post('/register', signup)
router.post('/signin', signin)
router.get('/getusers',  getUsers )
router.delete('/user/:id', deleteUser)


export default router