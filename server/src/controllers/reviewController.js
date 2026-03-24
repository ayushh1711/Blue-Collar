import prisma from '../config/database.js';

export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { provider: { include: { providerProfile: true } } }
    });

    if (!booking || booking.customerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status !== 'COMPLETED') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    const review = await prisma.review.create({
      data: {
        bookingId,
        customerId: req.user.id,
        rating,
        comment
      }
    });

    const allReviews = await prisma.review.findMany({
      where: {
        booking: {
          providerId: booking.providerId
        }
      }
    });

    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.providerProfile.update({
      where: { userId: booking.providerId },
      data: {
        rating: avgRating,
        totalReviews: allReviews.length
      }
    });

    res.status(201).json({ review, message: 'Review submitted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};

export const getProviderReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        booking: {
          providerId: id
        }
      },
      include: {
        customer: {
          select: { name: true }
        },
        booking: {
          select: { service: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};
