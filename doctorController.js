import Doctor from "../models/Doctor.js";

export const getDoctors = async (req, res, next) => {
  try {
    const { search = "", specialty = "" } = req.query;

    const query = {};

    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: regex },
        { specialty: regex },
        { location: regex },
      ];
    }

    if (specialty.trim()) {
      query.specialty = new RegExp(`^${specialty.trim()}$`, "i");
    }

    const doctors = await Doctor.find(query).sort({ rating: -1, name: 1 });

    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    next(error);
  }
};
