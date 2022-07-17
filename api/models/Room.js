import mongoose from "mongoose";
const { Schema } = mongoose

const RoomModal = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [
        {
            number: {
                type: Number
            },
            unavailableDates: {
                type: [Date]
            }
        }
    ]
},
    { timestamps: true }
)

export default mongoose.model('Room', RoomModal)