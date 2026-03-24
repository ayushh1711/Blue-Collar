const Card = ({ children, className = '', hover = false, gradient = false }) => {
  const baseStyles = 'bg-white rounded-2xl shadow-card p-6 border border-gray-100';
  const hoverStyles = hover ? 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-primary-50/30' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
