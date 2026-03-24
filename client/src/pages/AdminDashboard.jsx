import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import { useAuthStore } from '../store/authStore';

const AdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <Card>
          <p className="text-center text-gray-600">
            Admin features coming soon...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
