import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Zap, Sparkles, Wind, Hammer, Paintbrush, ArrowRight, Star, Users, Shield, Clock, TrendingUp, DollarSign, Calendar, Award } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuthStore } from '../store/authStore';

const Landing = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const services = [
    { name: 'Plumbing', icon: Wrench, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Electrical', icon: Zap, color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50' },
    { name: 'Cleaning', icon: Sparkles, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
    { name: 'AC Repair', icon: Wind, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-50' },
    { name: 'Carpentry', icon: Hammer, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
    { name: 'Painting', icon: Paintbrush, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50' }
  ];

  const customerFeatures = [
    { icon: Star, title: 'Top Rated Professionals', description: 'Verified experts with 4.5+ ratings' },
    { icon: Shield, title: 'Secure & Safe', description: 'Background checked service providers' },
    { icon: Clock, title: 'Quick Response', description: 'Get matched within minutes' },
    { icon: Users, title: 'Trusted by Thousands', description: '10,000+ happy customers' }
  ];

  const providerBenefits = [
    { icon: DollarSign, title: 'Earn More', description: 'Set your own rates and maximize earnings', color: 'from-green-500 to-green-600' },
    { icon: Calendar, title: 'Flexible Schedule', description: 'Work when you want, where you want', color: 'from-blue-500 to-blue-600' },
    { icon: Users, title: 'Growing Customer Base', description: 'Access thousands of potential clients', color: 'from-purple-500 to-purple-600' },
    { icon: Award, title: 'Build Your Reputation', description: 'Get reviews and grow your business', color: 'from-orange-500 to-orange-600' }
  ];

  const providerStats = [
    { value: '10,000+', label: 'Active Customers', icon: Users },
    { value: '₹2,00,000', label: 'Avg Monthly Earnings', icon: DollarSign },
    { value: '4.8/5', label: 'Platform Rating', icon: Star },
    { value: '95%', label: 'Job Acceptance Rate', icon: TrendingUp }
  ];

  // Provider Homepage
  if (user && user.role === 'PROVIDER') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
        <Navbar />
        
        {/* Provider Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-primary-700 to-accent-600">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Welcome Back, {user.name}!
                <span className="block bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent mt-2">
                  Ready to Earn Today?
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto">
                Manage your jobs, track earnings, and grow your business all in one place
              </p>
              <div className="flex gap-4 justify-center flex-wrap animate-slide-up">
                <Button 
                  size="lg" 
                  className="inline-flex items-center space-x-2 bg-white text-primary-600 hover:bg-gray-50"
                  onClick={() => navigate('/provider/dashboard')}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Go to Dashboard</span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="inline-flex items-center space-x-2 border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/provider/dashboard')}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>View Earnings</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Provider Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Platform at a Glance</h2>
              <p className="text-gray-600">See how BlueCollar is growing</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {providerStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card 
                    key={stat.label} 
                    gradient
                    className="text-center animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                    <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Provider Benefits */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Why Providers Love Us
              </h2>
              <p className="text-xl text-gray-600">Everything you need to succeed</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {providerBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card 
                    key={benefit.title} 
                    hover 
                    gradient
                    className="flex items-start space-x-4 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Working?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Check your dashboard for new job requests and start earning today!
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary-600 hover:bg-gray-50 shadow-2xl"
              onClick={() => navigate('/provider/dashboard')}
            >
              View Job Requests
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-bold text-white">BlueCollar</span>
            </div>
            <p className="text-gray-400">© 2026 BlueCollar. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // Customer/Guest Homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Professional Home Services
              <span className="block bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                at Your Doorstep
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto">
              Book trusted professionals for all your home service needs in just a few clicks
            </p>
            <div className="flex gap-4 justify-center flex-wrap animate-slide-up">
              <Link to="/services">
                <Button size="lg" variant="secondary" className="inline-flex items-center space-x-2">
                  <span>Browse Services</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              {!user && (
                <Link to="/signup">
                  <Button size="lg" className="inline-flex items-center space-x-2 bg-white text-primary-600 hover:bg-gray-50">
                    <span>Get Started Free</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customerFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title} 
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4 shadow-lg shadow-primary-500/30">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">Professional solutions for every home need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.name} 
                  hover 
                  gradient
                  className="text-center group animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">Professional and reliable service</p>
                  <div className="flex items-center justify-center space-x-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">(4.8)</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Join as a Service Provider
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Grow your business by connecting with thousands of customers in your area. Start earning more today!
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50 shadow-2xl">
              Become a Partner
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary-400" />
            <span className="text-xl font-bold text-white">BlueCollar</span>
          </div>
          <p className="text-gray-400">© 2026 BlueCollar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
