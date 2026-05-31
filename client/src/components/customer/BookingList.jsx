import { Calendar, MapPin, Clock, Star, MessageSquare, User } from 'lucide-react';

const BookingList = ({ bookings, getStatusColor, onWriteReview }) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="font-medium text-gray-500">No bookings yet</p>
        <p className="text-sm text-gray-400 mt-1">Book a service to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-card-hover transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{booking.service.name}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                  {booking.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(booking.scheduledDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {booking.scheduledTime}
                </span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{booking.address}</span>
                </span>
              </div>

              {booking.provider && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                  <User className="w-3.5 h-3.5" />
                  <span>{booking.provider.name}</span>
                </div>
              )}

              {/* Existing review */}
              {booking.review && (
                <div className="mt-3 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < booking.review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">Your review</span>
                  </div>
                  {booking.review.comment && (
                    <p className="text-xs text-gray-600 italic">"{booking.review.comment}"</p>
                  )}
                </div>
              )}
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-gray-900">₹{booking.totalAmount}</p>
              {booking.status === 'COMPLETED' && !booking.review && onWriteReview && (
                <button
                  onClick={() => onWriteReview(booking)}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 border border-brand-200 hover:border-brand-300 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3 h-3" /> Review
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
