import Screen from "./screen.model.js";
import Theater from "./theater.model.js";

/**
 * Add a screen to a theater
 */
export const addScreen = async (theaterId, data) => {
  const { name, type, capacity } = data;

  if (!name || !type || !capacity) {
    throw new Error("All screen fields are required");
  }

  // Check if theater exists
  const theater = await Theater.findById(theaterId);
  if (!theater) {
    throw new Error("Theater not found");
  }

  const screen = await Screen.create({
    theaterId,
    name,
    type,
    capacity
  });

  return screen;
};

/**
 * Get all screens for a theater
 */
export const getScreensByTheater = async (theaterId) => {
  const theater = await Theater.findById(theaterId);
  if (!theater) {
    throw new Error("Theater not found");
  }

  const screens = await Screen.find({ theaterId }).sort({ createdAt: 1 });
  return screens;
};

/**
 * Activate / Deactivate screen
 */
export const toggleScreenStatus = async (screenId) => {
  const screen = await Screen.findById(screenId);

  if (!screen) {
    throw new Error("Screen not found");
  }

  screen.status = screen.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  await screen.save();

  return screen;
};
