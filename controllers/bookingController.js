import Booking from '../models/bookingModel.js';
import { timeToSeconds } from '../utils/timeUtils.js';

export const bookVenue = async (req, res) => {
  try {
    const { name, email, number, venue, timeFrom, timeTo, date, purpose } =
      req.body;
    const TimeInSecFrom = timeToSeconds(timeFrom);
    const TimeInSecTo = timeToSeconds(timeTo);

    const existingBooking = await Booking.findOne({
      date,
      venue,
      $or: [
        {
          TimeInSecFrom: { $lt: TimeInSecTo },
          TimeInSecTo: { $gt: TimeInSecFrom },
        },
      ],
    });

    if (existingBooking) {
      return res.render('venueBooking', {
        message: {
          type: 'danger',
          text: 'Venue is currently booked for this interval.',
        },
      });
    }

    const newBooking = new Booking({
      name,
      email,
      number,
      venue,
      timeFrom,
      timeTo,
      TimeInSecFrom,
      TimeInSecTo,
      date,
      purpose,
    });

    await newBooking.save();
    res.status(201).render('venueBooking', {
      message: {
        type: 'success',
        text: 'You will be informed via email about your booking.',
      },
    });
  } catch (error) {
    res.status(400).render('venueBooking', {
      message: {
        type: 'danger',
        text: 'An error occurred. Please try again later.',
      },
    });
  }
};
