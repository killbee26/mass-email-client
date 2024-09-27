// components/DashboardCard.tsx
interface DashboardCardProps {
    title: string;
    value: string;
    description: string;
  }
  
  const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description }) => {
    return (
      <div className="bg-gray-900 p-4 rounded-lg w-full md:w-1/3 lg:w-1/4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    );
  };
  
  export default DashboardCard;
  