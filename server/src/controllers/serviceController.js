import prisma from '../config/database.js';

export const getAllServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' }
    });
    res.json({ services });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ service });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch service', error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, icon, basePrice } = req.body;

    const service = await prisma.service.create({
      data: { name, description, icon, basePrice }
    });

    res.status(201).json({ service });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
};
