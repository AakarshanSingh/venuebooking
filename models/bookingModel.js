import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  venue: { type: String, required: true },
  timeFrom: { type: String, required: true },
  timeTo: { type: String, required: true },
  TimeInSecFrom: { type: Number, required: true },
  TimeInSecTo: { type: Number, required: true },
  date: { type: String, required: true },
  purpose: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;