import express from 'express'
// import dotenv from 'dotenv'
import mongoose from 'mongoose'


const PORT = process.env.PORT || 8000
const MONGO_USERNAME = `admin`
const MONGO_PASSWORD = `2LAlMm9q0WkoFMMZ`
const MONGO_APP = 'booking-app'

const MONGO = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.7tl22.mongodb.net/${MONGO_APP}?retryWrites=true&w=majority`
// dotenv.config()

const app = express()

const connect = async () => {
    console.log(MONGO)
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


app.listen(PORT, () => {
    connect()
    console.log(`Server is listening on port: ${PORT}`)
})