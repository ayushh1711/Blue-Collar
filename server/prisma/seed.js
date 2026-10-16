import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create services
  const services = [
    { name: 'Plumbing', description: 'Professional plumbing services', icon: 'Wrench', basePrice: 500 },
    { name: 'Electrical', description: 'Licensed electricians', icon: 'Zap', basePrice: 600 },
    { name: 'Cleaning', description: 'Home and office cleaning', icon: 'Sparkles', basePrice: 400 },
    { name: 'AC Repair', description: 'AC installation and repair', icon: 'Wind', basePrice: 700 },
    { name: 'Carpentry', description: 'Furniture and woodwork', icon: 'Hammer', basePrice: 550 },
    { name: 'Painting', description: 'Interior and exterior painting', icon: 'Paintbrush', basePrice: 450 }
  ];

  const createdServices = [];
  for (const service of services) {
    const createdService = await prisma.service.upsert({
      where: { name: service.name },
      update: {},
      create: service
    });
    createdServices.push(createdService);
  }

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create a test customer
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      name: 'John Customer',
      email: 'customer@test.com',
      password: hashedPassword,
      phone: '9876543210',
      role: 'CUSTOMER'
    }
  });

  // Create a test admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      phone: '9999988888',
      role: 'ADMIN'
    }
  });

  // Create a test provider
  const provider = await prisma.user.upsert({
    where: { email: 'provider@test.com' },
    update: {},
    create: {
      name: 'Mike Provider',
      email: 'provider@test.com',
      password: hashedPassword,
      phone: '9876543211',
      role: 'PROVIDER',
      providerProfile: {
        create: {
          skills: ['Plumbing', 'Electrical'],
          hourlyRate: 500,
          experience: 5,
          rating: 4.5,
          totalReviews: 12,
          verifiedStatus: true,
          isAvailable: true
        }
      }
    }
  });

  // Create some completed bookings for work history
  const completedBookings = [
    {
      customerId: customer.id,
      providerId: provider.id,
      serviceId: createdServices[0].id, // Plumbing
      status: 'COMPLETED',
      scheduledDate: new Date('2026-02-10'),
      scheduledTime: '10:00',
      address: '123 Main St, Mumbai',
      addressLat: 19.0760,
      addressLong: 72.8777,
      totalAmount: 500,
      completedAt: new Date('2026-02-10T12:00:00Z')
    },
    {
      customerId: customer.id,
      providerId: provider.id,
      serviceId: createdServices[1].id, // Electrical
      status: 'COMPLETED',
      scheduledDate: new Date('2026-02-08'),
      scheduledTime: '14:00',
      address: '456 Park Ave, Mumbai',
      addressLat: 19.0760,
      addressLong: 72.8777,
      totalAmount: 600,
      completedAt: new Date('2026-02-08T16:30:00Z')
    },
    {
      customerId: customer.id,
      providerId: provider.id,
      serviceId: createdServices[2].id, // Cleaning
      status: 'CANCELLED',
      scheduledDate: new Date('2026-02-05'),
      scheduledTime: '09:00',
      address: '789 Oak St, Mumbai',
      addressLat: 19.0760,
      addressLong: 72.8777,
      totalAmount: 400
    }
  ];

  const existingBookings = await prisma.booking.count();
  if (existingBookings === 0) {
    for (const booking of completedBookings) {
      await prisma.booking.create({
        data: booking
      });
    }

    // Create reviews for completed bookings
    const completedBookingRecords = await prisma.booking.findMany({
      where: { status: 'COMPLETED' }
    });

    for (const booking of completedBookingRecords) {
      await prisma.review.create({
        data: {
          bookingId: booking.id,
          customerId: booking.customerId,
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          comment: 'Great service! Very professional and timely.'
        }
      });
    }
  }

  console.log('Database seeded successfully!');
  console.log('Test accounts created:');
  console.log('Customer: customer@test.com / password123');
  console.log('Provider: provider@test.com / password123');
  console.log('Admin:    admin@test.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
