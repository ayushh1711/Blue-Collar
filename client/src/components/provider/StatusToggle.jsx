import Button from '../common/Button';

const StatusToggle = ({ isAvailable, onToggle }) => {
  return (
    <Button
      onClick={onToggle}
      variant={isAvailable ? 'primary' : 'outline'}
      className="flex items-center space-x-2"
    >
      <span className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`} />
      <span>{isAvailable ? 'Available' : 'Offline'}</span>
    </Button>
  );
};

export default StatusToggle;
