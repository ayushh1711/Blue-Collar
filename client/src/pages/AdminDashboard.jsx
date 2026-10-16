import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { 
  Layers, 
  Users, 
  Calendar, 
  IndianRupee, 
  Plus, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Star,
  ShieldCheck,
  Wrench,
  Search
} from 'lucide-react';

const statusConfig = {
  PENDING:     { label: 'Pending',     class: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  ACCEPTED:    { label: 'Accepted',    class: 'bg-blue-50 text-blue-700 border-blue-200' },
  ON_WAY:      { label: 'On Way',      class: 'bg-purple-50 text-purple-700 border-purple-200' },
  IN_PROGRESS: { label: 'In Progress', class: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  COMPLETED:   { label: 'Completed',   class: 'bg-green-50 text-green-700 border-green-200' },
  CANCELLED:   { label: 'Cancelled',   class: 'bg-red-50 text-red-700 border-red-200' },
};

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'services' | 'providers' | 'bookings'
  
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Service Modal State
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    basePrice: '',
    icon: 'Wrench'
  });
  const [submittingService, setSubmittingService] = useState(false);
  const [serviceError, setServiceError] = useState('');

  // Booking search filter
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [servicesRes, providersRes, bookingsRes] = await Promise.all([
        api.get('/services'),
        api.get('/providers'),
        api.get('/bookings')
      ]);

      setServices(servicesRes.data.services || []);
      setProviders(providersRes.data.providers || []);
      setBookings(bookingsRes.data.bookings || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    setServiceError('');
    setSubmittingService(true);
    try {
      await api.post('/services', {
        name: newService.name.trim(),
        description: newService.description.trim(),
        basePrice: parseFloat(newService.basePrice),
        icon: newService.icon
      });
      setShowAddService(false);
      setNewService({ name: '', description: '', basePrice: '', icon: 'Wrench' });
      // Refresh services
      const res = await api.get('/services');
      setServices(res.data.services || []);
    } catch (err) {
      setServiceError(err.response?.data?.message || 'Failed to create service');
    } finally {
      setSubmittingService(false);
    }
  };

  // Calculations
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
  const activeBookings = bookings.filter(b => ['ACCEPTED', 'ON_WAY', 'IN_PROGRESS'].includes(b.status));
  const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const availableProviders = providers.filter(p => p.isAvailable);

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = bookingStatusFilter === 'ALL' || b.status === bookingStatusFilter;
    const matchesSearch = 
      b.service?.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customer?.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.provider?.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.id?.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-100 text-brand-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-brand-200">
                Administration
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1">Platform Control Center</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user?.name}. Manage services, providers, and bookings.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddService(true)}
              className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-700 transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
            <button
              onClick={fetchDashboardData}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-300 px-3.5 py-2.5 rounded-lg hover:bg-gray-50 transition"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Platform Volume</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</p>
                <p className="text-xs text-green-600 font-medium mt-1">From {completedBookings.length} completed jobs</p>
              </div>
              <div className="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{bookings.length}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">{activeBookings.length} active in progress</p>
              </div>
              <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Providers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{providers.length}</p>
                <p className="text-xs text-brand-600 font-medium mt-1">{availableProviders.length} currently online</p>
              </div>
              <div className="w-11 h-11 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Service Catalog</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{services.length}</p>
                <p className="text-xs text-purple-600 font-medium mt-1">Active categories</p>
              </div>
              <div className="w-11 h-11 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'services', label: `Services (${services.length})` },
              { id: 'providers', label: `Providers (${providers.length})` },
              { id: 'bookings', label: `All Bookings (${bookings.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-500">Loading platform data...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings Overview */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-900">Recent Platform Activity</h2>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      View all →
                    </button>
                  </div>

                  {bookings.length === 0 ? (
                    <p className="text-sm text-gray-500 py-6 text-center">No bookings recorded yet.</p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {bookings.slice(0, 5).map(b => (
                        <div key={b.id} className="py-3 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{b.service?.name}</p>
                            <p className="text-xs text-gray-500">
                              Customer: {b.customer?.name} {b.provider?.name ? `• Provider: ${b.provider?.name}` : '• No provider assigned'}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[b.status]?.class || 'bg-gray-100'}`}>
                              {b.status.replace('_', ' ')}
                            </span>
                            <p className="text-xs font-bold text-gray-900 mt-1">₹{b.totalAmount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Top Services Overview */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-900">Services Catalog Preview</h2>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Manage services →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.slice(0, 6).map(s => (
                      <div key={s.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm text-gray-900">{s.name}</p>
                          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                            ₹{s.basePrice}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Configured Services</h2>
                  <Button onClick={() => setShowAddService(true)} size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Add Service
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map(s => (
                    <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-card transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center font-bold">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          ₹{s.basePrice}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{s.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{s.description}</p>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>Icon: {s.icon}</span>
                        <span>Added: {new Date(s.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROVIDERS TAB */}
            {activeTab === 'providers' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-base font-bold text-gray-900">Verified Service Providers</h2>
                  <p className="text-xs text-gray-500">List of all providers with their skill sets and platform ratings.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
                      <tr>
                        <th className="px-5 py-3">Provider</th>
                        <th className="px-5 py-3">Skills</th>
                        <th className="px-5 py-3">Rate</th>
                        <th className="px-5 py-3">Rating</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {providers.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3.5">
                            <p className="font-semibold text-gray-900">{p.user?.name}</p>
                            <p className="text-xs text-gray-500">{p.user?.email} • {p.user?.phone}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex flex-wrap gap-1">
                              {p.skills?.map((s, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 font-medium text-gray-900">
                            ₹{p.hourlyRate}/hr
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="flex items-center gap-1 font-medium text-gray-900">
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                              {p.rating?.toFixed(1) || '0.0'} ({p.totalReviews})
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              p.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {p.isAvailable ? 'Available' : 'Offline'}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                              p.verifiedStatus ? 'text-green-700' : 'text-gray-500'
                            }`}>
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {p.verifiedStatus ? 'Verified' : 'Unverified'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {/* Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings, users..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {['ALL', 'PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map(st => (
                      <button
                        key={st}
                        onClick={() => setBookingStatusFilter(st)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                          bookingStatusFilter === st
                            ? 'bg-brand-600 text-white border-brand-600'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
                        <tr>
                          <th className="px-5 py-3">Service</th>
                          <th className="px-5 py-3">Customer</th>
                          <th className="px-5 py-3">Provider</th>
                          <th className="px-5 py-3">Schedule</th>
                          <th className="px-5 py-3">Amount</th>
                          <th className="px-5 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-500">
                              No bookings match your current filter.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map(b => (
                            <tr key={b.id} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3.5 font-semibold text-gray-900">
                                {b.service?.name}
                              </td>
                              <td className="px-5 py-3.5">
                                <p className="font-medium text-gray-900">{b.customer?.name}</p>
                                <p className="text-xs text-gray-500">{b.customer?.phone}</p>
                              </td>
                              <td className="px-5 py-3.5">
                                {b.provider ? (
                                  <>
                                    <p className="font-medium text-gray-900">{b.provider?.name}</p>
                                    <p className="text-xs text-gray-500">{b.provider?.phone}</p>
                                  </>
                                ) : (
                                  <span className="text-xs text-gray-400 italic">Unassigned</span>
                                )}
                              </td>
                              <td className="px-5 py-3.5 text-xs text-gray-600">
                                <p>{new Date(b.scheduledDate).toLocaleDateString()}</p>
                                <p>{b.scheduledTime}</p>
                              </td>
                              <td className="px-5 py-3.5 font-bold text-gray-900">
                                ₹{b.totalAmount}
                              </td>
                              <td className="px-5 py-3.5">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[b.status]?.class || 'bg-gray-100'}`}>
                                  {b.status.replace('_', ' ')}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Service Modal */}
      <Modal
        isOpen={showAddService}
        onClose={() => setShowAddService(false)}
        title="Add New Service"
      >
        {serviceError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg mb-4">
            {serviceError}
          </div>
        )}

        <form onSubmit={handleCreateService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Appliance Repair"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
            <input
              type="number"
              required
              min="0"
              placeholder="e.g. 500"
              value={newService.basePrice}
              onChange={(e) => setNewService({ ...newService, basePrice: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows="3"
              placeholder="Short description of what the service covers"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Keyword</label>
            <input
              type="text"
              placeholder="e.g. Wrench, Zap, Sparkles"
              value={newService.icon}
              onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddService(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submittingService}
            >
              {submittingService ? 'Creating...' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
