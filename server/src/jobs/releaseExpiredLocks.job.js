import ShowSeat from "../modules/booking/showSeat.model.js";

const releaseExpiredLocks = async () => {
  const now = new Date();

  const result = await ShowSeat.updateMany(
    {
      status: "LOCKED",
      lockedUntil: { $lt: now }
    },
    {
      status: "AVAILABLE",
      lockedUntil: null
    }
  );

  if (result.modifiedCount > 0) {
    console.log(
      `[CRON] Released ${result.modifiedCount} expired seat locks at ${now.toISOString()}`
    );
  }
};

export default releaseExpiredLocks;
