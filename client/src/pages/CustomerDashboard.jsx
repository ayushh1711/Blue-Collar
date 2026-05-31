import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { bookingService } from '../services/bookingService';
import { connectSocket, disconnectSocket, socket } from '../services/socket';
import Navbar from '../components/common/Navbar';
import BookingForm from '../components/customer/BookingForm';
import BookingList from '../components/customer/BookingList';
import ReviewModal from '../components/customer/ReviewModal';
import { Plus, Calendar, CheckCircle, Clock } from 'lucide-react';

const statusConfig = {
  PENDING:     { label: 'Pending',     class: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  ACCEPTED:    { label: 'Accepted',    class: 'bg-blue-50 text-blue-700 border-blue-200' },
  ON_WAY:      { label: 'On the way',  class: 'bg-purple-50 text-purple-700 border-purple-200' },
  IN_PROGRESS: { label: 'In progress', class: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  COMPLETED:   { label: 'Completed',   class: 'bg-green-50 text-green-700 border-green-200' },
  CANCELLED:   { label: 'Cancelled',   class: 'bg-red-50 text-red-700 border-red-200' },
};

const CustomerDashboard = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
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

  const getStatusColor = (status) => statusConfig[status]?.class || 'bg-gray-100 text-gray-700 border-gray-200';

  const stats = [
    { label: 'Total',     value: bookings.length,                                                                    icon: Calendar,     color: 'text-blue-600',   bg: 'bg-blue-50' },
    { label: 'Active',    value: bookings.filter(b => ['ACCEPTED','ON_WAY','IN_PROGRESS'].includes(b.status)).length, icon: Clock,        color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'COMPLETED').length,                               icon: CheckCircle,  color: 'text-green-600',  bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-sm text-gray-500 mt-0.5">Hello, {user?.name}</p>
          </div>
          <button
            onClick={() => setShowBookingForm(true)}
            className="flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Book a service
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bookings */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <BookingList
            bookings={bookings}
            getStatusColor={getStatusColor}
            onWriteReview={(b) => { setSelectedBooking(b); setShowReviewModal(true); }}
          />
        )}
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
          onClose={() => { setShowReviewModal(false); setSelectedBooking(null); }}
          onSuccess={fetchBookings}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
