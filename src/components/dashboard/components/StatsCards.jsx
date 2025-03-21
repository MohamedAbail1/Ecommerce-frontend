import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShoppingBag, faClipboardList, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
      <div className="p-3 bg-blue-100 rounded-full">
        <FontAwesomeIcon icon={icon} className="h-8 w-8 text-blue-600" />
      </div>
      <div>
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
