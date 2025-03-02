import express from "express";
import { bookVenue } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/booking", (req, res) => res.render("venueBooking", { message: null }));
router.post("/booking", bookVenue);

export default router;