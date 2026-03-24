import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const JobRequest = ({ booking, onAccept, onReject }) => {
  return (
    <Card>
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
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{booking.customer.phone}</span>
            </div>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-xl font-bold">₹{booking.totalAmount}</p>
          <div className="space-x-2">
            <Button size="sm" onClick={() => onAccept(booking.id)}>
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => onReject(booking.id)}>
              Reject
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobRequest;
