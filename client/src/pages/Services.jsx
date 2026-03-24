import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/common/Navbar';
import ServiceCard from '../components/customer/ServiceCard';
import BookingForm from '../components/customer/BookingForm';
import Card from '../components/common/Card';
import api from '../services/api';

const Services = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const handleBookService = (service) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'CUSTOMER') {
      alert('Only customers can book services. Providers cannot book services.');
      return;
    }
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    navigate('/customer/dashboard');
  };

  // Redirect providers to dashboard
  useEffect(() => {
    if (user && user.role === 'PROVIDER') {
      navigate('/provider/dashboard');
    }
  }, [user, navigate]);

  // Don't render for providers
  if (user && user.role === 'PROVIDER') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
          <p className="text-gray-600 mt-2">Choose from our wide range of professional services</p>
        </div>

        {user && user.role === 'ADMIN' && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <p className="text-blue-800">
              You are logged in as an Admin. Service booking is available for customers only.
            </p>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={handleBookService}
            />
          ))}
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          onSuccess={handleBookingSuccess}
          preselectedService={selectedService}
        />
      )}
    </div>
  );
};

export default Services;
