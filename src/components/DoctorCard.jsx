import React from "react";
import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <img
        className="doctor-image"
        src={doctor.image}
        alt={doctor.name}
        loading="lazy"
      />

      <div className="doctor-card-body">
        <div className="card-top-line">
          <span className="verified-badge">Verified</span>
          <span className="rating">★ {doctor.rating}</span>
        </div>

        <h3>{doctor.name}</h3>
        <p className="specialty">{doctor.specialty}</p>
        <p className="muted">📍 {doctor.location}</p>
        <p className="muted">{doctor.experience} years experience</p>

        <div className="card-bottom">
          <strong>₹{doctor.consultationFee}</strong>
          <Link className="secondary-btn" to={`/doctor/${doctor._id}`}>
            View & Book
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DoctorCard;
