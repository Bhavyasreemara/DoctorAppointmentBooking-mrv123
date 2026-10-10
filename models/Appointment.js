import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    patientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    patientPhone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 15,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    status: {
      type: String,
      enum: ["Booked", "Completed", "Cancelled"],
      default: "Booked",
    },
  },
  { timestamps: true }
);

// Prevent two bookings for the same doctor, date and time.
appointmentSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
