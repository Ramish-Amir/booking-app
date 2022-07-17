import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


export const createRoom = async (req, res) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            const hotelAdded = await Hotel.findByIdAndUpdate(hotelId,
                { $push: { rooms: savedRoom?._id } },
                {new: true}
            )
            console.log(hotelAdded)
        } catch (err) {
            res.status(500).json({ err })
        }
        res.status(200).json({
            message: 'Room saved',
            data: savedRoom
        })
    } catch (err) {
        res.status(500).json({ err })
    }
}

export const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: 'Room not found!'
            })
        }
        res.status(500).json({
            error
        })
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req?.params?.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatedRoom)
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: 'Room not found!'
            })
        }
        res.status(500).json(error)
    }
}

export const deleteRoom = async (req, res) => {
    const hotelId = req.params?.hotelId
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id)
        if (deletedRoom) {
            try {
                await Hotel.findByIdAndUpdate(hotelId, 
                    {
                        $pull: { rooms: req.params?.id}
                    })
            } catch (error) {
                res.status(500).json({error})
            }
            res.status(200).json('Room has been deleted.')
        } else {
            return res.status(404).json({
                error: 'Room not found!'
            })
        }
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: 'Room not found!'
            })
        }
        res.status(500).json({error})
    }
}