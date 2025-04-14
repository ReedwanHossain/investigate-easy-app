interface StatsCardProps {
    title: string;
    value: number;
    icon: string;
    color: string;
  }
  
  const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
    return (
      <div className={`${color} p-6 rounded-lg shadow-sm`}>
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsCard;