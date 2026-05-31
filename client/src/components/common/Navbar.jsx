import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Wrench, LogOut, LayoutDashboard, List } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">BlueCollar</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {!user && (
              <Link
                to="/services"
                className={`text-sm font-medium transition-colors ${isActive('/services') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Services
              </Link>
            )}
            {user?.role === 'CUSTOMER' && (
              <>
                <Link
                  to="/services"
                  className={`text-sm font-medium transition-colors ${isActive('/services') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Services
                </Link>
                <Link
                  to="/customer/dashboard"
                  className={`text-sm font-medium transition-colors ${isActive('/customer/dashboard') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  My Bookings
                </Link>
              </>
            )}
            {user?.role === 'PROVIDER' && (
              <Link
                to="/provider/dashboard"
                className={`text-sm font-medium transition-colors ${isActive('/provider/dashboard') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Dashboard
              </Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link
                to="/admin/dashboard"
                className={`text-sm font-medium transition-colors ${isActive('/admin/dashboard') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-brand-700">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
