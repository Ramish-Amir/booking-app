import express from 'express'
import { login, register } from '../controllers/auth.js'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'
import { verifyAdmin, verifyUser } from '../utils/authUser.js'

const router = express.Router()

// GET ALL USERS
router.get('/', verifyAdmin, getUsers)

// GET USER
router.get('/:id', verifyUser, getUser)

// REGISTER USER
router.post('/register', register)

// LOGIN USER
router.post('/login', login)

// UPDATE USER
router.put('/:id', verifyUser, updateUser)

// DELETE USER
router.delete('/:id', verifyUser, deleteUser)

export default router