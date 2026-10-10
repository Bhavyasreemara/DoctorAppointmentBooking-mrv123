import React from "react"
function SearchBar({ search, setSearch, specialty, setSpecialty, onSearch }) {
  return (
    <form className="search-panel" onSubmit={onSearch}>
      <div className="field-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Doctor, specialty or location"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="specialty">Specialty</label>
        <select
          id="specialty"
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
        >
          <option value="">All specialties</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Neurologist">Neurologist</option>
        </select>
      </div>

      <button className="primary-btn" type="submit">
        Search Doctors
      </button>
    </form>
  );
}

export default SearchBar;
