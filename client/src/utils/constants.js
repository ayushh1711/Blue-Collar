export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  ON_WAY: 'ON_WAY',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  PROVIDER: 'PROVIDER',
  ADMIN: 'ADMIN'
};

export const SERVICES = [
  { name: 'Plumbing', icon: 'Wrench', description: 'Professional plumbing services' },
  { name: 'Electrical', icon: 'Zap', description: 'Licensed electricians' },
  { name: 'Cleaning', icon: 'Sparkles', description: 'Home and office cleaning' },
  { name: 'AC Repair', icon: 'Wind', description: 'AC installation and repair' },
  { name: 'Carpentry', icon: 'Hammer', description: 'Furniture and woodwork' },
  { name: 'Painting', icon: 'Paintbrush', description: 'Interior and exterior painting' }
];

export const CURRENCY = {
  symbol: '₹',
  code: 'INR',
  name: 'Indian Rupee'
};
