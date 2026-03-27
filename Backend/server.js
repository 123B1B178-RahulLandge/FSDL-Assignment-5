const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

const bookingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    departureCity: String,

    destination: String,

    travelDate: Date,

    travelers: Number,

    packageType: String,

    notes: String,

    bookingDate: {
        type: Date,
        default: Date.now
    }

})

const Booking = mongoose.model("Booking", bookingSchema)

app.post("/api/book", async (req, res) => {

    try {

        const booking = new Booking(req.body)

        await booking.save()

        res.json({
            success: true,
            message: "Booking successful",
            booking
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`)

})

