import { Request } from '../../types/types';
import { useRequests } from '../../hooks/useRequests';

interface AvailableRequestsProps {
  requests: Request[];
}

const AvailableRequests = ({ requests }: AvailableRequestsProps) => {
  const {  acceptRequest, loadingId } = useRequests();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No available requests at the moment.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{request.title}</h3>
                  <p className="text-sm text-gray-500">{request.location}</p>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {request.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => acceptRequest(request.id)}
                    disabled={loadingId === request.id}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loadingId === request.id ? 'Accepting...' : 'Accept'}
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Created: {new Date(request.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableRequests;