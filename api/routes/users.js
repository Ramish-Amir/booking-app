import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Users router reached')
})

export default router