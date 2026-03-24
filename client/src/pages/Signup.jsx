import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, User, Phone, Briefcase, DollarSign, Award } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Signup = () => {
  const [role, setRole] = useState('CUSTOMER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    skills: '',
    hourlyRate: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role
      };

      if (role === 'PROVIDER') {
        userData.providerData = {
          skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
          hourlyRate: parseFloat(formData.hourlyRate),
          experience: parseInt(formData.experience)
        };
      }

      const data = await signup(userData);
      const userRole = data.user.role.toLowerCase();
      navigate(`/${userRole}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-scale-in">
          <Card className="shadow-2xl border-0">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4 shadow-lg shadow-primary-500/30">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-gray-600 mt-2">Join our platform today</p>
            </div>
            
            <div className="flex gap-3 mb-6">
              <Button
                type="button"
                variant={role === 'CUSTOMER' ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setRole('CUSTOMER')}
              >
                Customer
              </Button>
              <Button
                type="button"
                variant={role === 'PROVIDER' ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setRole('PROVIDER')}
              >
                Provider
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-xl mb-6 animate-slide-down">
                <p className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                icon={<User className="w-5 h-5" />}
                placeholder="John Doe"
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={<Mail className="w-5 h-5" />}
                placeholder="you@example.com"
                required
              />
              
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                icon={<Phone className="w-5 h-5" />}
                placeholder="+91 98765 43210"
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                icon={<Lock className="w-5 h-5" />}
                placeholder="••••••••"
                required
              />

              {role === 'PROVIDER' && (
                <>
                  <Input
                    label="Skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    icon={<Briefcase className="w-5 h-5" />}
                    placeholder="Plumbing, Electrical, Carpentry"
                    required
                  />
                  
                  <Input
                    label="Hourly Rate (₹)"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    icon={<DollarSign className="w-5 h-5" />}
                    placeholder="500"
                    required
                  />
                  
                  <Input
                    label="Years of Experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    icon={<Award className="w-5 h-5" />}
                    placeholder="5"
                    required
                  />
                </>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
