import { Link } from 'react-router-dom';

const MenuItem = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => {
  return (
    <Link
      to={to}
      className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
    >
      <span className="mr-3">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
};

export default MenuItem;