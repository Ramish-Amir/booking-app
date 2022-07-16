import express from 'express'
import { login, register } from '../controllers/auth.js'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'
import { verifyUser } from '../utils/authUser.js'

const router = express.Router()

// GET ALL USERS
router.get('/', getUsers)

// GET USER
router.get('/:id', verifyUser, getUser)

// ADD NEW USER
router.post('/register', register)

// LOGIN USER
router.post('/login', login)

// UPDATE USER
router.put('/:id', updateUser)

// DELETE USER
router.delete('/:id', deleteUser)



export default router