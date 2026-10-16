import prisma from '../config/database.js';
import { getIO } from '../config/socket.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, scheduledDate, scheduledTime, address, addressLat, addressLong, totalAmount } = req.body;

    const booking = await prisma.booking.create({
      data: {
        customerId: req.user.id,
        serviceId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        address,
        addressLat,
        addressLong,
        totalAmount,
        status: 'PENDING'
      },
      include: {
        service: true,
        customer: {
          select: { id: true, name: true, phone: true }
        }
      }
    });

    res.status(201).json({ booking });

    // Notify all connected providers about the new booking request
    getIO().emit('booking:new', booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};

    if (req.user.role === 'CUSTOMER') {
      where.customerId = req.user.id;
    } else if (req.user.role === 'PROVIDER') {
      where.OR = [
        { providerId: req.user.id },
        { status: 'PENDING', providerId: null }
      ];
    }

    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        service: true,
        customer: {
          select: { id: true, name: true, phone: true }
        },
        provider: {
          select: { id: true, name: true, phone: true }
        },
        review: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        customer: {
          select: { id: true, name: true, phone: true, email: true }
        },
        provider: {
          select: { id: true, name: true, phone: true, email: true }
        },
        review: true
      }
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch booking', error: error.message });
  }
};

export const acceptBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        providerId: req.user.id,
        status: 'ACCEPTED'
      },
      include: {
        service: true,
        customer: {
          select: { id: true, name: true, phone: true }
        }
      }
    });

    res.json({ booking, message: 'Booking accepted' });

    // Notify the customer their booking was accepted
    getIO().to(booking.customerId).emit('booking:updated', booking);
    // Notify all providers to refresh their list
    getIO().emit('booking:updated', booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept booking', error: error.message });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });

    res.json({ booking, message: 'Booking rejected' });

    // Notify the customer their booking was rejected
    getIO().to(booking.customerId).emit('booking:updated', booking);
    getIO().emit('booking:updated', booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject booking', error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const data = { status };
    if (status === 'COMPLETED') {
      data.completedAt = new Date();
    }

    const booking = await prisma.booking.update({
      where: { id },
      data,
      include: {
        service: true,
        customer: {
          select: { id: true, name: true, phone: true }
        }
      }
    });

    res.json({ booking, message: `Status updated to ${status}` });

    // Notify customer of status change
    getIO().to(booking.customerId).emit('booking:updated', booking);
    getIO().emit('booking:updated', booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.update({
      where: { id, customerId: req.user.id },
      data: { status: 'CANCELLED' }
    });

    res.json({ booking, message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
};
