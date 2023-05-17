const prisma = require('../config/database');

// Create a new location
exports.createLocation = async (req, res) => {
  const { latitude, longitude, userId } = req.body;

  try {
    const location = await prisma.location.create({
      data: { latitude, longitude, userId },
    });

    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a location' });
  }
};

// Get all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching locations' });
  }
};

// Get locations by user
exports.getLocationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const locations = await prisma.location.findMany({
      where: { userId },
    });

    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching locations' });
  }
};
