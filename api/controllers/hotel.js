import Hotel from "../models/Hotel.js"



export const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: 'Hotel not found!'
            })
        }
        res.status(500).json({
            error
        })
    }
}

export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addHotel = async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

export const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req?.params?.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatedHotel)
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: 'Hotel not found!'
            })
        }
        res.status(500).json(error)
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        if (deletedHotel) {
            res.status(200).json('Hotel has been deleted.')
        } else {
            return res.status(404).json({
                error: 'Hotel not found!'
            })
        }
    } catch (error) {
        console.log(error)
        if (error.name === "CastError") {
            return res.status(404).json({
                error: 'Hotel not found!'
            })
        }
        res.status(500).json(error)
    }
}

