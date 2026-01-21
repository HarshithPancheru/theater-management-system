import Theater from "./theater.model.js";

/**
 * Create a new theater
 */
export const createTheater = async (data) => {
  const {
    name,
    location,
    amenities,
    contactNumber,
    openingTime,
    closingTime
  } = data;

  if (!name || !location) {
    throw new Error("Theater name and location are required");
  }

  const theater = await Theater.create({
    name,
    location,
    amenities,
    contactNumber,
    openingTime,
    closingTime
  });

  return theater;
};

/**
 * Get all theaters with search & filter
 */
export const getTheaters = async (query) => {
  const filter = {};

  if (query.location) {
    filter.location = { $regex: query.location, $options: "i" };
  }

  if (query.status) {
    filter.status = query.status;
  }

  const theaters = await Theater.find(filter).sort({ createdAt: -1 });

  return theaters;
};

/**
 * Update theater details
 */
export const updateTheater = async (theaterId, data) => {
  const theater = await Theater.findById(theaterId);

  if (!theater) {
    throw new Error("Theater not found");
  }

  Object.assign(theater, data);

  await theater.save();

  return theater;
};

/**
 * Activate / Deactivate theater
 */
export const toggleTheaterStatus = async (theaterId) => {
  const theater = await Theater.findById(theaterId);

  if (!theater) {
    throw new Error("Theater not found");
  }

  theater.status = theater.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  await theater.save();

  return theater;
};

export const deleteTheater = async (theaterId) => {
  const theater = await Theater.findById(theaterId);

  if (!theater) {
    throw new Error("Theater not found");
  }

  await theater.deleteOne();

  return theater;
};
