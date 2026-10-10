import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createAppointment = async (req, res, next) => {
  try {
    const {
      doctorId,
      patientName,
      patientEmail,
      patientPhone,
      date,
      time,
      reason,
    } = req.body;

    if (
      !doctorId ||
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        message: "Please fill all required appointment fields.",
      });
    }

    if (!emailRegex.test(patientEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    if (!/^\d{10,15}$/.test(patientPhone)) {
      return res.status(400).json({
        message: "Phone number must contain 10 to 15 digits.",
      });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      doctor: doctorId,
      patientName,
      patientEmail,
      patientPhone,
      date,
      time,
      reason,
    });

    const populatedAppointment = await Appointment.findById(
      appointment._id
    ).populate("doctor", "name specialty location consultationFee");

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment: populatedAppointment,
    });
  } catch (error) {
    // MongoDB duplicate key error from the unique doctor/date/time index.
    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "This time slot has already been booked. Please choose another slot.",
      });
    }

    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;
    const query = {};

    if (doctorId) {
      query.doctor = doctorId;
    }

    if (date) {
      query.date = date;
    }

    const appointments = await Appointment.find(query)
      .populate("doctor", "name specialty")
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    next(error);
  }
};
