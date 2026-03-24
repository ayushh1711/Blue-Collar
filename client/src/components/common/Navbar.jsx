import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Home, LogOut, User, Sparkles } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles className="w-7 h-7 text-primary-600 group-hover:text-primary-700 transition-colors" />
              <div className="absolute inset-0 bg-primary-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              BlueCollar
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {user.role === 'CUSTOMER' && (
                  <Link 
                    to="/services" 
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group"
                  >
                    Services
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
                <Link 
                  to={`/${user.role.toLowerCase()}/dashboard`}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-primary-50 to-accent-50 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/services" 
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group"
                >
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="shadow-lg shadow-primary-500/30">Sign Up</Button>
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
