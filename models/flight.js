import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"], 
    default: "DEN" // <-- UNSURE
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date, default: Date.now() + 365*24*60*60000 // <-- UNSURE
  }
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight
}