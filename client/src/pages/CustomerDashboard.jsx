import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { bookingService } from '../services/bookingService';
import { connectSocket, disconnectSocket, socket } from '../services/socket';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import BookingForm from '../components/customer/BookingForm';
import BookingList from '../components/customer/BookingList';
import ReviewModal from '../components/customer/ReviewModal';
import { Plus, Calendar, CheckCircle, Clock } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();

    // Connect socket and join user's room for real-time updates
    connectSocket(user?.id);

    socket.on('booking:new', fetchBookings);
    socket.on('booking:updated', fetchBookings);

    return () => {
      socket.off('booking:new', fetchBookings);
      socket.off('booking:updated', fetchBookings);
      disconnectSocket();
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getBookings();
      setBookings(data.bookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWriteReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleReviewSuccess = () => {
    fetchBookings(); // Refresh bookings to show the new review
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300',
      ACCEPTED: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300',
      ON_WAY: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300',
      IN_PROGRESS: 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-300',
      COMPLETED: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300',
      CANCELLED: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active',
      value: bookings.filter(b => ['ACCEPTED', 'ON_WAY', 'IN_PROGRESS'].includes(b.status)).length,
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Completed',
      value: bookings.filter(b => b.status === 'COMPLETED').length,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-2">Manage your service bookings</p>
            </div>
            <Button
              onClick={() => setShowBookingForm(true)}
              className="flex items-center space-x-2 shadow-lg shadow-primary-500/30"
            >
              <Plus className="w-5 h-5" />
              <span>Book Service</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.title} 
                gradient
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bookings List */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h2>
          {loading ? (
            <Card>
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            </Card>
          ) : (
            <BookingList 
              bookings={bookings} 
              getStatusColor={getStatusColor} 
              onWriteReview={handleWriteReview}
            />
          )}
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          onSuccess={fetchBookings}
          preselectedService={null}
        />
      )}

      {showReviewModal && selectedBooking && (
        <ReviewModal
          booking={selectedBooking}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedBooking(null);
          }}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
