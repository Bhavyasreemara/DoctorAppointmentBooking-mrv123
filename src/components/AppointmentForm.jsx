import React, { useMemo, useState } from "react";
import { bookAppointment } from "../services/api";

function AppointmentForm({ doctor }) {
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    date: "",
    time: "",
    reason: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const minDate = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.time) {
      setStatus({
        type: "error",
        message: "Please select an appointment time.",
      });
      return;
    }

    try {
      const response = await bookAppointment({
        doctorId: doctor._id,
        ...form,
      });

      setStatus({
        type: "success",
        message: `Appointment booked successfully for ${form.date} at ${form.time}.`,
      });

      setForm({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <section className="booking-card">
      <div className="section-heading">
        <span className="eyebrow">BOOK APPOINTMENT</span>
        <h2>Reserve your consultation</h2>
        <p>Select a date and one of the doctor&apos;s available time slots.</p>
      </div>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field-group">
            <label htmlFor="patientName">Patient name *</label>
            <input
              id="patientName"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="patientEmail">Email *</label>
            <input
              id="patientEmail"
              name="patientEmail"
              type="email"
              value={form.patientEmail}
              onChange={handleChange}
              placeholder="patient@example.com"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="patientPhone">Phone *</label>
            <input
              id="patientPhone"
              name="patientPhone"
              type="tel"
              value={form.patientPhone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="date">Appointment date *</label>
            <input
              id="date"
              name="date"
              type="date"
              min={minDate}
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="time">Time slot *</label>
          <select
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          >
            <option value="">Select a time slot</option>
            {doctor.availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="reason">Reason for visit</label>
          <textarea
            id="reason"
            name="reason"
            rows="4"
            value={form.reason}
            onChange={handleChange}
            placeholder="Briefly describe the reason for your visit"
          />
        </div>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

        <button className="primary-btn full-width" type="submit">
          Confirm Appointment
        </button>
      </form>
    </section>
  );
}

export default AppointmentForm;
