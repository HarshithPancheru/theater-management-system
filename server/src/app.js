import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import theaterRoutes from "./routes/theater.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import showRoutes from "./routes/show.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import pricingRoutes from "./routes/pricing.routes.js";
import userRoutes from "./routes/user.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", reviewRoutes);
app.use("/uploads/movies", express.static("uploads/movies"));
app.use("/uploads/users", express.static("uploads/users"));
app.use("/api/payment", paymentRoutes);

/* Health Check */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

/* Error Handler */
app.use(errorMiddleware);

export default app;
