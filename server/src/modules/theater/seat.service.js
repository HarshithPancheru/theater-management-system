import Seat from "./seat.model.js";
import Screen from "./screen.model.js";

/**
 * Bulk create seats using OLD schema
 * layout example:
 * [
 *   { rowLabel: "A", count: 10, category: "GOLD" },
 *   { rowLabel: "B", count: 12, category: "SILVER" }
 * ]
 */
export const createSeatsForScreen = async (screenId, layout) => {
  if (!Array.isArray(layout) || layout.length === 0) {
    throw new Error("Seat layout is required");
  }

  const screen = await Screen.findById(screenId);
  if (!screen) {
    throw new Error("Screen not found");
  }

  const seatsToCreate = [];

  for (const rowConfig of layout) {
    const { rowLabel, count, category } = rowConfig;

    if (!rowLabel || !count || !category) {
      throw new Error("Invalid seat layout format");
    }

    for (let i = 1; i <= count; i++) {
      seatsToCreate.push({
        screenId,
        rowLabel,
        seatLabel: `${rowLabel}${i}`,
        category
      });
    }
  }

  try {
    return await Seat.insertMany(seatsToCreate, { ordered: false });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Some seats already exist for this screen");
    }
    throw error;
  }
};

/**
 * Get seats for a screen
 */
export const getSeatsByScreen = async (screenId) => {
  const screen = await Screen.findById(screenId);
  if (!screen) {
    throw new Error("Screen not found");
  }

  const seats = await Seat.find({ screenId });

seats.sort((a, b) => {
  if (a.rowLabel !== b.rowLabel) {
    return a.rowLabel.localeCompare(b.rowLabel);
  }
  const numA = parseInt(a.seatLabel.replace(a.rowLabel, ""));
  const numB = parseInt(b.seatLabel.replace(b.rowLabel, ""));
  return numA - numB;
});

return seats;

};
