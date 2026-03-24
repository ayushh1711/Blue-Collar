import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import api from '../../services/api';

const BookingForm = ({ onClose, onSuccess, preselectedService }) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: preselectedService?.id || '',
    scheduledDate: '',
    scheduledTime: '',
    address: '',
    addressLat: 0,
    addressLong: 0,
    totalAmount: preselectedService?.basePrice || 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  // Update form when preselected service changes
  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({
        ...prev,
        serviceId: preselectedService.id,
        totalAmount: preselectedService.basePrice
      }));
    }
  }, [preselectedService]);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const handleServiceChange = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    setFormData({
      ...formData,
      serviceId,
      totalAmount: service ? service.basePrice : 0
    });
  };

  // Handle changing from preselected service
  const handleChangeService = () => {
    setFormData(prev => ({ 
      ...prev, 
      serviceId: '', 
      totalAmount: 0 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/bookings', formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Book a Service
            </h2>
            {preselectedService && (
              <p className="text-sm text-gray-600 mt-1">
                Booking: {preselectedService.name}
              </p>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-xl mb-6 animate-slide-down">
            <p className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service
            </label>
            {preselectedService ? (
              <div className="w-full px-4 py-3 border-2 border-primary-200 bg-primary-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {preselectedService.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{preselectedService.name}</p>
                    <p className="text-sm text-gray-600">₹{preselectedService.basePrice}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleChangeService}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Change
                </button>
              </div>
            ) : (
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white hover:border-primary-300"
                value={formData.serviceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ₹{service.basePrice}
                  </option>
                ))}
              </select>
            )}
          </div>

          <Input
            label="Date"
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            icon={<Calendar className="w-5 h-5" />}
            required
          />

          <Input
            label="Time"
            type="time"
            value={formData.scheduledTime}
            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
            icon={<Clock className="w-5 h-5" />}
            required
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Address
            </label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white hover:border-primary-300"
              rows="3"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter your full address"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent flex items-center">
                ₹{formData.totalAmount}
              </p>
            </div>
            <div className="space-x-3">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking...
                  </span>
                ) : (
                  'Book Now'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
