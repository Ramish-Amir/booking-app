import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import hotelRoutes from './routes/hotels.js'
import roomRoutes from './routes/rooms.js'


const PORT = process.env.PORT || 8000
const MONGO_USERNAME = `admin`
const MONGO_PASSWORD = `2LAlMm9q0WkoFMMZ`
const MONGO_APP = 'booking-app'

const MONGO = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.7tl22.mongodb.net/${MONGO_APP}?retryWrites=true&w=majority`

const app = express()

const connect = async () => {
    try {
        await mongoose.connect(MONGO);
        console.log('Mongo DB connected')
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log('Mongo DB disconnected')
})

mongoose.connection.on("connected", () => {
    console.log('Mongo DB connected')
})

app.use(express.json())

// Middlewares
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/rooms', roomRoutes)

app.use((req, res) => {
    res.status(404).json({
        message: 'No route found'
    })
})


app.listen(PORT, () => {
    connect()
    console.log(`Server is listening on port: ${PORT}`)
})