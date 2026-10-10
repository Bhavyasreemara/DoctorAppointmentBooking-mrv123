import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DoctorDetails from "../components/DoctorDetails";
import AppointmentForm from "../components/AppointmentForm";
import { getDoctor } from "../services/api";

function DoctorDetailsPage() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDoctor(id);

        if (active) {
          // Support either a direct doctor object or { doctor: ... }
          const doctorData = data?.doctor ?? data;

          if (!doctorData || !doctorData._id) {
            setError("Doctor details were not found.");
          } else {
            setDoctor(doctorData);
          }
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "Failed to load doctor details.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDoctor();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container page-space empty-state">
        Loading doctor details...
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container page-space">
        <div className="empty-state error-box">
          <p>{error || "Doctor details were not found."}</p>
          <Link to="/" className="secondary-btn">
            Back to doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-space">
      <Link to="/" className="back-link">
        ← Back to doctors
      </Link>

      <DoctorDetails doctor={doctor} />
      <AppointmentForm doctor={doctor} />
    </div>
  );
}

export default DoctorDetailsPage;