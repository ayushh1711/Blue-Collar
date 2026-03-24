import prisma from '../config/database.js';

export const getAllProviders = async (req, res) => {
  try {
    const { skill, minRating, isAvailable } = req.query;

    const where = {};
    if (skill) where.skills = { has: skill };
    if (minRating) where.rating = { gte: parseFloat(minRating) };
    if (isAvailable !== undefined) where.isAvailable = isAvailable === 'true';

    const providers = await prisma.providerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    res.json({ providers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch providers', error: error.message });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await prisma.providerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json({ provider });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch provider', error: error.message });
  }
};

export const updateProviderProfile = async (req, res) => {
  try {
    const { skills, hourlyRate, experience, documentUrl } = req.body;

    const profile = await prisma.providerProfile.update({
      where: { userId: req.user.id },
      data: {
        ...(skills && { skills }),
        ...(hourlyRate && { hourlyRate }),
        ...(experience && { experience }),
        ...(documentUrl && { documentUrl })
      }
    });

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;

    const profile = await prisma.providerProfile.update({
      where: { userId: req.user.id },
      data: { isAvailable }
    });

    res.json({ profile, message: `Status updated to ${isAvailable ? 'Available' : 'Busy'}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update availability', error: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { lat, long } = req.body;

    const profile = await prisma.providerProfile.update({
      where: { userId: req.user.id },
      data: {
        currentLat: lat,
        currentLong: long
      }
    });

    res.json({ profile, message: 'Location updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update location', error: error.message });
  }
};
