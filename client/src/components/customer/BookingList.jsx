import { Calendar, MapPin, Clock, Star, MessageSquare } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const BookingList = ({ bookings, getStatusColor, onWriteReview }) => {
  if (bookings.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-600">No bookings yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} hover>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{booking.service.name}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(booking.scheduledDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{booking.scheduledTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.address}</span>
                </div>
              </div>
              {booking.provider && (
                <p className="mt-2 text-sm text-gray-600">
                  Provider: {booking.provider.name}
                </p>
              )}

              {/* Show existing review */}
              {booking.review && (
                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
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
                      Your Review
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status.replace('_', ' ')}
              </span>
              <p className="text-xl font-bold">₹{booking.totalAmount}</p>
              
              {/* Write Review Button for completed bookings without reviews */}
              {booking.status === 'COMPLETED' && !booking.review && onWriteReview && (
                <div className="mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onWriteReview(booking)}
                    className="flex items-center space-x-1 text-xs"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Write Review</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookingList;
