import { Request, RequestStatus } from '../../types/types';
import { Link } from 'react-router-dom';

interface RequestListProps {
  requests: Request[];
}

const statusColors = {
  [RequestStatus.CREATED]: 'bg-blue-100 text-blue-800',
  [RequestStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [RequestStatus.IN_PROGRESS]: 'bg-purple-100 text-purple-800',
  [RequestStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [RequestStatus.DECLINED]: 'bg-red-100 text-red-800',
};

const RequestList = ({ requests }: RequestListProps) => {
  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">
                    <Link to={`/requests/${request.id}`} className="hover:text-indigo-600">
                      {request.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">{request.location}</p>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {request.description}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[request.status]
                  }`}
                >
                  {request.status.replace('_', ' ')}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Created: {new Date(request.createdAt).toLocaleDateString()}
              </div>
              {request.investigator && (
                <div className="mt-1 text-sm">
                  Investigator: <span className="font-medium">{request.investigator.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestList;