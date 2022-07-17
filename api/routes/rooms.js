import express from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/room.js'
import { verifyAdmin } from '../utils/authUser.js'


const router = express.Router()

// ADD HOTEL
router.post('/:hotelId', createRoom )

// GET ALL ROOMS
router.get('/', getRooms)

// GET ROOM
router.get('/:id', getRoom)

// UPDATE ROOM
router.put('/:id/:hotelId',  updateRoom)

// DELETE ROOM
router.delete('/:id/:hotelId',  deleteRoom)

export default router