import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import cron from "node-cron";
import releaseExpiredLocks from "./jobs/releaseExpiredLocks.job.js";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Run every minute
  cron.schedule("* * * * *", async () => {
    try {
      await releaseExpiredLocks();
    } catch (err) {
      console.error("Cron error:", err.message);
    }
  });


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
