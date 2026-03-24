import { MapPin } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const ScheduleList = ({ bookings, onUpdateStatus }) => {
  if (bookings.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-600">No active jobs</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{booking.service.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Customer: {booking.customer.name}</p>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.address}</span>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {booking.status.replace('_', ' ')}
              </span>
              <div className="space-y-2 mt-4">
                {booking.status === 'ACCEPTED' && (
                  <Button size="sm" onClick={() => onUpdateStatus(booking.id, 'ON_WAY')}>
                    On My Way
                  </Button>
                )}
                {booking.status === 'ON_WAY' && (
                  <Button size="sm" onClick={() => onUpdateStatus(booking.id, 'IN_PROGRESS')}>
                    Start Job
                  </Button>
                )}
                {booking.status === 'IN_PROGRESS' && (
                  <Button size="sm" onClick={() => onUpdateStatus(booking.id, 'COMPLETED')}>
                    Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ScheduleList;
