import express from 'express'
import { addHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js'

const router = express.Router()

// GET
router.get('/:id', getHotel)

// GET ALL
router.get('/', getHotels)

// ADD
router.post('/', addHotel)

// UPDATE
router.put('/:id', updateHotel)

// DELETE
router.delete('/:id', deleteHotel)

export default router