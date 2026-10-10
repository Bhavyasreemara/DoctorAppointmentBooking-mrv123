import "dotenv/config";
import { connectDB } from "../config/db.js";
import Doctor from "../models/Doctor.js";

const doctors = [
  {
    name: "Dr. Ananya Rao",
    specialty: "Cardiologist",
    location: "Hyderabad",
    experience: 12,
    consultationFee: 800,
    rating: 4.9,
    bio: "Experienced cardiologist focused on preventive heart care and adult cardiology.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
    availableSlots: ["09:00 AM", "10:30 AM", "12:00 PM", "03:30 PM", "05:00 PM"],
  },
  {
    name: "Dr. Rahul Mehta",
    specialty: "Dermatologist",
    location: "Bengaluru",
    experience: 9,
    consultationFee: 650,
    rating: 4.7,
    bio: "Dermatology specialist providing care for common skin, hair and nail conditions.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80",
    availableSlots: ["09:30 AM", "11:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"],
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    location: "Chennai",
    experience: 11,
    consultationFee: 700,
    rating: 4.8,
    bio: "Pediatrician helping children and parents with preventive and general pediatric care.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",
    availableSlots: ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:30 PM"],
  },
  {
    name: "Dr. Arjun Verma",
    specialty: "Orthopedic",
    location: "Mumbai",
    experience: 15,
    consultationFee: 900,
    rating: 4.9,
    bio: "Orthopedic specialist with a focus on joint, sports injury and mobility care.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80",
    availableSlots: ["08:30 AM", "10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM"],
  },
  {
    name: "Dr. Sneha Iyer",
    specialty: "Gynecologist",
    location: "Hyderabad",
    experience: 10,
    consultationFee: 850,
    rating: 4.8,
    bio: "Gynecologist providing compassionate women's health and routine care.",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=700&q=80",
    availableSlots: ["09:00 AM", "11:00 AM", "01:30 PM", "04:00 PM", "05:30 PM"],
  },
  {
    name: "Dr. Karthik Reddy",
    specialty: "Neurologist",
    location: "Pune",
    experience: 13,
    consultationFee: 1000,
    rating: 4.6,
    bio: "Neurologist specializing in evaluation and management of common neurological conditions.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=80",
    availableSlots: ["08:00 AM", "10:00 AM", "01:00 PM", "03:30 PM", "06:00 PM"],
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Doctor.deleteMany();
    await Doctor.insertMany(doctors);
    console.log("Sample doctors inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
