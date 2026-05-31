import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Zap, Sparkles, Wind, Hammer, Paintbrush, Star, Shield, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { useAuthStore } from '../store/authStore';

const services = [
  { name: 'Plumbing',   icon: Wrench,     bg: 'bg-blue-50',   color: 'text-blue-600',   desc: 'Leaks, pipes & fixtures' },
  { name: 'Electrical', icon: Zap,        bg: 'bg-yellow-50', color: 'text-yellow-600', desc: 'Wiring, switches & more' },
  { name: 'Cleaning',   icon: Sparkles,   bg: 'bg-purple-50', color: 'text-purple-600', desc: 'Home & office cleaning' },
  { name: 'AC Repair',  icon: Wind,       bg: 'bg-cyan-50',   color: 'text-cyan-600',   desc: 'Installation & servicing' },
  { name: 'Carpentry',  icon: Hammer,     bg: 'bg-orange-50', color: 'text-orange-600', desc: 'Furniture & woodwork' },
  { name: 'Painting',   icon: Paintbrush, bg: 'bg-pink-50',   color: 'text-pink-600',   desc: 'Interior & exterior' },
];

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '500+',    label: 'Verified Professionals' },
  { value: '4.8★',    label: 'Average Rating' },
  { value: '50+',     label: 'Cities Covered' },
];

const howItWorks = [
  { step: '1', title: 'Choose a service', desc: 'Browse from our wide range of home services.' },
  { step: '2', title: 'Book a slot',       desc: 'Pick a date and time that works for you.' },
  { step: '3', title: 'Get it done',       desc: 'A verified professional arrives at your door.' },
];

const Landing = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Provider landing
  if (user?.role === 'PROVIDER') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome back, {user.name}</h1>
          <p className="text-gray-500 mb-8 text-lg">Manage your jobs and grow your business.</p>
          <button
            onClick={() => navigate('/provider/dashboard')}
            className="bg-brand-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-brand-200">
              <CheckCircle className="w-3.5 h-3.5" /> Trusted by 10,000+ customers
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Home services,<br />done right.
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Book verified professionals for plumbing, electrical, cleaning, and more — at transparent prices, right at your doorstep.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={user ? '/services' : '/signup'}
                className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors text-sm"
              >
                Book a service
              </Link>
              <Link
                to="/services"
                className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Browse services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {stats.map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular services</h2>
            <Link to="/services" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.name}
                  to="/services"
                  className="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-card-hover transition-all duration-200 bg-white text-center"
                >
                  <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Verified professionals', desc: 'Every provider is background-checked and skill-verified before joining.' },
              { icon: Star,   title: 'Rated & reviewed',       desc: 'Real reviews from real customers after every completed job.' },
              { icon: Clock,  title: 'On-time guarantee',      desc: 'Professionals arrive on time or we reschedule at no extra cost.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Are you a service professional?</h2>
          <p className="text-brand-100 mb-8 text-sm">Join thousands of professionals earning on their own schedule.</p>
          <Link
            to="/signup"
            className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm inline-block"
          >
            Join as a partner
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold">BlueCollar</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 BlueCollar. All rights reserved.</p>
          <div className="flex gap-5 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
