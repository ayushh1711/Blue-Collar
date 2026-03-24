import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { bookingService } from '../services/bookingService';
import { providerService } from '../services/providerService';
import { connectSocket, disconnectSocket, socket } from '../services/socket';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import StatusToggle from '../components/provider/StatusToggle';
import JobRequest from '../components/provider/JobRequest';
import ScheduleList from '../components/provider/ScheduleList';
import WorkHistory from '../components/provider/WorkHistory';

const ProviderDashboard = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [isAvailable, setIsAvailable] = useState(user?.providerProfile?.isAvailable || false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'

  useEffect(() => {
    fetchBookings();

    // Connect socket for real-time job request updates
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

  const handleToggleAvailability = async () => {
    try {
      await providerService.toggleAvailability(!isAvailable);
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      await bookingService.acceptBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error('Failed to accept booking:', error);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await bookingService.rejectBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error('Failed to reject booking:', error);
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await bookingService.updateStatus(bookingId, status);
      fetchBookings();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'PENDING' && !b.providerId);
  const activeBookings = bookings.filter(b => ['ACCEPTED', 'ON_WAY', 'IN_PROGRESS'].includes(b.status));
  const completedBookings = bookings.filter(b => ['COMPLETED', 'CANCELLED'].includes(b.status));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
          </div>
          <StatusToggle isAvailable={isAvailable} onToggle={handleToggleAvailability} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold mb-2">Rating</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {user?.providerProfile?.rating?.toFixed(1) || '0.0'} ⭐
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
            <p className="text-3xl font-bold text-primary-600">
              {user?.providerProfile?.totalReviews || 0}
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{activeBookings.length}</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Completed Jobs</h3>
            <p className="text-3xl font-bold text-green-600">
              {completedBookings.filter(b => b.status === 'COMPLETED').length}
            </p>
          </Card>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {pendingBookings.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">New Job Requests</h2>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <JobRequest
                      key={booking.id}
                      booking={booking}
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'active'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Active Jobs ({activeBookings.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'history'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Work History ({completedBookings.length})
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'active' ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Active Jobs</h2>
                <ScheduleList bookings={activeBookings} onUpdateStatus={handleUpdateStatus} />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Work History</h2>
                <WorkHistory bookings={completedBookings} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
