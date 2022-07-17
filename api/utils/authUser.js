import jwt from 'jsonwebtoken'
import { JWT_ID } from './config.js'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
        jwt.verify(token, JWT_ID, (err, user) => {
            if (err) return res.sendStatus(403)
            req.body.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.body?.user?.id === req.params?.id || req.body?.user?.isAdmin) {
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.body?.user?.isAdmin) {
            next()
        } else {
            res.sendStatus(403)
        }
    })
}