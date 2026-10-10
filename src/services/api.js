const API_URL = "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const getDoctors = (search = "", specialty = "") => {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (specialty.trim()) {
    params.set("specialty", specialty.trim());
  }

  const query = params.toString();

  return request(`/doctors${query ? `?${query}` : ""}`);
};

export const getDoctor = (id) =>
  request(`/doctors/${id}`);

export const bookAppointment = (appointmentData) =>
  request("/appointments", {
    method: "POST",
    body: JSON.stringify(appointmentData),
  });