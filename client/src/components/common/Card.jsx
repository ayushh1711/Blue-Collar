const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-5 ${hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : 'shadow-card'} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
