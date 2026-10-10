import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();

app.use(
  cors({
    origin: [
       "http://localhost:5173",
       "http://localhost:5174",
    ],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Doctor Appointment Booking API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
