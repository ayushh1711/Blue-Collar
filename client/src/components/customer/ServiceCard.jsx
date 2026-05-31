import { Wrench, Zap, Sparkles, Wind, Hammer, Paintbrush, Star, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const iconMap = { Wrench, Zap, Sparkles, Wind, Hammer, Paintbrush };
const bgMap = {
  Wrench:     'bg-blue-50 text-blue-600',
  Zap:        'bg-yellow-50 text-yellow-600',
  Sparkles:   'bg-purple-50 text-purple-600',
  Wind:       'bg-cyan-50 text-cyan-600',
  Hammer:     'bg-orange-50 text-orange-600',
  Paintbrush: 'bg-pink-50 text-pink-600',
};

const ServiceCard = ({ service, onBook }) => {
  const { user } = useAuthStore();
  const Icon = iconMap[service.icon] || Wrench;
  const iconStyle = bgMap[service.icon] || 'bg-gray-100 text-gray-600';
  const canBook = !user || user.role === 'CUSTOMER';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className={`w-11 h-11 rounded-xl ${iconStyle} flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
      <p className="text-sm text-gray-500 mb-3 flex-1">{service.description}</p>

      <div className="flex items-center gap-1 mb-4">
        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
        <span className="text-xs font-medium text-gray-700">4.8</span>
        <span className="text-xs text-gray-400">(120+ reviews)</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Starting at</p>
          <p className="text-lg font-bold text-gray-900">₹{service.basePrice}</p>
        </div>
        {canBook ? (
          <button
            onClick={() => onBook(service)}
            className="flex items-center gap-1.5 bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
          >
            Book <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-2 rounded-lg">Providers can't book</span>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
