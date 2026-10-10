import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import DoctorCard from "../components/DoctorCard";
import { getDoctors } from "../services/api";

function HomePage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDoctors = async (searchValue = search, specialtyValue = specialty) => {
    try {
      setLoading(true);
      setError("");

      const data = await getDoctors(searchValue, specialtyValue);
      setDoctors(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors("", "");
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    loadDoctors();
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">MERN APPOINTMENT PLATFORM</span>
          <h1>Find the right doctor. Book with confidence.</h1>
          <p>
            Search by doctor name, specialty, or location and reserve an
            appointment in a few clicks.
          </p>

          <SearchBar
            search={search}
            setSearch={setSearch}
            specialty={specialty}
            setSpecialty={setSpecialty}
            onSearch={handleSearch}
          />
        </div>
      </section>

      <section className="container">
        <div className="results-header">
          <div>
            <span className="eyebrow">DISCOVER</span>
            <h2>Available doctors</h2>
          </div>
          <span className="results-count">{doctors.length} doctors</span>
        </div>

        {loading && <div className="empty-state">Loading doctors...</div>}

        {!loading && error && (
          <div className="empty-state error-box">
            {error}
            <button className="secondary-btn" onClick={() => loadDoctors()}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && doctors.length === 0 && (
          <div className="empty-state">
            No doctors found. Try a different search.
          </div>
        )}

        {!loading && !error && doctors.length > 0 && (
          <div className="doctor-grid">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
