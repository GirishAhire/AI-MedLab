import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
import diseaseRoute from "./Routes/disease.js";
import adminRoute from "./Routes/admin.js";
import contactRoute from "./Routes/contact.js";
import forgotPassRoute from "./Routes/forgot-password.js";
import healthRoute from "./Routes/healthPredict.js";

dotenv.config(); // Ensure .env variables are loaded

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET, POST, PUT, DELETE", // Allow required HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allow specific headers
};

app.get("/", (req, res) => {
  res.send("API is working");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose connected");
  } catch (error) {
    console.log("Mongoose connection failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Route handling
app.use("/api/v1/auth", authRoute); // Authentication (login/register)
app.use("/api/v1/users", userRoute); // User routes
app.use("/api/v1/doctors", doctorRoute); // Doctor routes
app.use("/api/v1/reviews", reviewRoute); // Review routes
app.use("/api/v1/bookings", bookingRoute); // Booking routes
app.use("/api/v1/", diseaseRoute); // Disease routes
app.use("/api/v1/admin", adminRoute); // Admin routes
app.use("/api/v1/", contactRoute); // Contact routes
app.use("/api/v1/", forgotPassRoute); // Forgot password routes
app.use("/api/v1/", healthRoute); // Health prediction routes

// Start server and connect to DB
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
