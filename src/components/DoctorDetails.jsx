import React from "react";
function DoctorDetails({ doctor }) {
  return (
    <section className="doctor-detail-card">
      <img
        className="detail-image"
        src={doctor.image}
        alt={doctor.name}
      />

      <div className="detail-content">
        <div className="card-top-line">
          <span className="verified-badge">Verified Doctor</span>
          <span className="rating">★ {doctor.rating}</span>
        </div>

        <h1>{doctor.name}</h1>
        <p className="detail-specialty">{doctor.specialty}</p>
        <p className="muted">📍 {doctor.location}</p>

        <div className="stats-row">
          <div>
            <strong>{doctor.experience}+</strong>
            <span>Years experience</span>
          </div>
          <div>
            <strong>₹{doctor.consultationFee}</strong>
            <span>Consultation</span>
          </div>
        </div>

        <p className="detail-bio">{doctor.bio}</p>
      </div>
    </section>
  );
}

export default DoctorDetails;
