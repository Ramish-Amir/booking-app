import express from 'express'
import { addHotel, countByCities, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/authUser.js'

const router = express.Router()

// GET
router.get('/:id', getHotel)

// GET ALL
router.get('/', getHotels)

// ADD
router.post('/', verifyAdmin, addHotel)

// UPDATE
router.put('/:id', verifyAdmin, updateHotel)

// DELETE
router.delete('/:id', verifyAdmin, deleteHotel)

// GET COUNT BY CITIES
router.get('/count/countByCity', countByCities)

export default router