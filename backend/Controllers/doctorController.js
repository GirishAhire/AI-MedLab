import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Update a doctor's own record
export const updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating Doctor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update doctor",
      error: error.message,
    });
  }
};

// Delete a doctor's own record
export const deleteDoctor = async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
};

// Fetch a single doctor (public)
export const getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("reviews")
      .select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to find doctor",
      error: error.message,
    });
  }
};

// Fetch all doctors, with optional search by name or specialization
export const getAllDoctors = async (req, res) => {
  const { query } = req.query;
  try {
    const filter = {
      isApproved: "approved", // ✅ Corrected to match your schema
      ...(query && {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }),
    };

    const doctors = await Doctor.find(filter).select("-password");
    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

// Fetch the logged-in doctor’s own profile, including their appointments
export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId; // set by authentication middleware
  try {
    const doctor = await Doctor.findById(doctorId).select("-password");
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "Profile info retrieved",
      data: { ...doctor._doc, appointments },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message,
    });
  }
};
