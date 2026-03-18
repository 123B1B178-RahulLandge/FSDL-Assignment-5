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

// app.get("/api/bookings", async (req, res) => {

//     try {

//         const bookings = await Booking.find()

//         res.json(bookings)

//     } catch (error) {

//         res.status(500).json({ message: error.message })

//     }

// })

// app.get("/api/bookings/:id", async (req, res) => {

//     try {

//         const booking = await Booking.findById(req.params.id)

//         if (!booking) {

//             return res.status(404).json({ message: "Booking not found" })
//         }

//         res.json(booking)

//     } catch (error) {

//         res.status(500).json({ message: error.message })

//     }

// })

// app.delete("/api/bookings/:id", async (req, res) => {

//     try {

//         await Booking.findByIdAndDelete(req.params.id)

//         res.json({
//             message: "Booking cancelled"
//         })

//     } catch (error) {

//         res.status(500).json({ message: error.message })

//     }

// })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`)

})

