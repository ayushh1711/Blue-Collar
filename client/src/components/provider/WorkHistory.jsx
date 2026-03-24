import { MapPin, Calendar, Clock, Star, CheckCircle, XCircle } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, formatDate } from '../../utils/helpers';

const WorkHistory = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">No work history yet</p>
          <p className="text-sm text-gray-500 mt-1">Completed jobs will appear here</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  booking.status === 'COMPLETED' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {booking.status === 'COMPLETED' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{booking.service.name}</h3>
                  <p className="text-sm text-gray-600">Customer: {booking.customer.name}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{booking.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(booking.scheduledDate)} at {booking.scheduledTime}
                  </span>
                </div>
              </div>

              {booking.review && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < booking.review.rating 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {booking.review.rating}/5
                    </span>
                  </div>
                  {booking.review.comment && (
                    <p className="text-sm text-gray-700 italic">
                      "{booking.review.comment}"
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <div className="text-right space-y-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'COMPLETED' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking.status === 'COMPLETED' ? 'Completed' : 'Cancelled'}
              </span>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(booking.totalAmount)}
                </p>
                <p className="text-xs text-gray-500">
                  {booking.completedAt ? formatDate(booking.completedAt) : formatDate(booking.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WorkHistory;