import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Wrench } from 'lucide-react';

const Signup = () => {
  const [role, setRole] = useState('CUSTOMER');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '',
    skills: '', hourlyRate: '', experience: ''
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = {
        name: formData.name, email: formData.email,
        password: formData.password, phone: formData.phone, role
      };
      if (role === 'PROVIDER') {
        userData.providerData = {
          skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
          hourlyRate: parseFloat(formData.hourlyRate),
          experience: parseInt(formData.experience)
        };
      }
      const data = await signup(userData);
      navigate(`/${data.user.role.toLowerCase()}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BlueCollar</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-card px-8 py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
          <p className="text-sm text-gray-500 mb-6">Join BlueCollar today.</p>

          {/* Role toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            {['CUSTOMER', 'PROVIDER'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                  role === r
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r === 'CUSTOMER' ? 'I need services' : 'I provide services'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Full name</label>
              <input type="text" value={formData.name} onChange={set('name')} placeholder="John Doe" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={formData.email} onChange={set('email')} placeholder="you@example.com" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone number</label>
              <input type="tel" value={formData.phone} onChange={set('phone')} placeholder="98765 43210" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" value={formData.password} onChange={set('password')} placeholder="Min. 8 characters" required className={inputClass} />
            </div>

            {role === 'PROVIDER' && (
              <div className="pt-2 border-t border-gray-100 space-y-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Professional details</p>
                <div>
                  <label className={labelClass}>Skills <span className="text-gray-400 font-normal">(comma separated)</span></label>
                  <input type="text" value={formData.skills} onChange={set('skills')} placeholder="Plumbing, Electrical" required className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Hourly rate (₹)</label>
                    <input type="number" value={formData.hourlyRate} onChange={set('hourlyRate')} placeholder="500" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Experience (yrs)</label>
                    <input type="number" value={formData.experience} onChange={set('experience')} placeholder="3" required className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 text-white font-semibold py-2.5 rounded-lg hover:bg-brand-700 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
