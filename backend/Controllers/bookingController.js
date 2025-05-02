import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

// Create booking without Stripe
export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      // Optionally add: timeSlot, date, etc.
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: booking,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: err.message,
    });
  }
};
