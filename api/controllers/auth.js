
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_ID } from "../utils/config.js";

export const register = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body?.password, salt);
    try {
        const newUser = new User({
            username: req.body?.username,
            email: req.body?.email,
            password: hash
        })
        await newUser.save()
        res.status(201).json(
            {
                message: 'User has been registered.'
            }
        )
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: `[${error?.keyValue?.username || error?.keyValue?.email}] is already registered`
            })
        }
        res.status(500).json({
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req?.body?.username })
        if (user) {
            const isPasswordCorrect = bcrypt.compare(req?.body?.password, user?.password)
            if (isPasswordCorrect) {
                const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_ID)
                const { password, isAdmin, ...userDetails } = user._doc
                res.status(200).json({ token })
            } else {
                res.status(400).json({
                    error: 'Invalid credentials'
                })
            }
        } else {
            res.status(404).json({
                error: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}