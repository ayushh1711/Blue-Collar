import { Wrench, Zap, Sparkles, Wind, Hammer, Paintbrush, Star } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAuthStore } from '../../store/authStore';

const iconMap = {
  Wrench,
  Zap,
  Sparkles,
  Wind,
  Hammer,
  Paintbrush
};

const colorMap = {
  Wrench: 'from-blue-500 to-blue-600',
  Zap: 'from-yellow-500 to-yellow-600',
  Sparkles: 'from-purple-500 to-purple-600',
  Wind: 'from-cyan-500 to-cyan-600',
  Hammer: 'from-orange-500 to-orange-600',
  Paintbrush: 'from-pink-500 to-pink-600'
};

const ServiceCard = ({ service, onBook }) => {
  const { user } = useAuthStore();
  const Icon = iconMap[service.icon] || Wrench;
  const gradient = colorMap[service.icon] || 'from-primary-500 to-primary-600';

  return (
    <Card hover gradient className="text-center group">
      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
        <span className="ml-2 text-gray-600 text-sm">(4.8)</span>
      </div>
      <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6">
        Starting at ₹{service.basePrice}
      </p>
      {(!user || user.role === 'CUSTOMER') && (
        <Button onClick={() => onBook(service)} className="w-full">
          Book Now
        </Button>
      )}
      {user && user.role === 'PROVIDER' && (
        <div className="text-sm text-gray-500 italic py-2 px-4 bg-gray-100 rounded-lg">
          Service providers cannot book services
        </div>
      )}
    </Card>
  );
};

export default ServiceCard;
