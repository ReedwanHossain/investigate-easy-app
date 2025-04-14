import { useState, useEffect } from 'react';
import { useRequests } from '../../hooks/useRequests';
import { Request, RequestStatus } from '../../types/types';
import AvailableRequests from './AvailableRequests';
import RequestList from '../requester/RequestList';

const InvestigatorDashboard = () => {
  const { fetchRequests } = useRequests();
  const [availableRequests, setAvailableRequests] = useState<Request[]>([]);
  const [myRequests, setMyRequests] = useState<Request[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'my-requests'>('available');

  useEffect(() => {
    const loadRequests = async () => {
      const available = await fetchRequests(RequestStatus.CREATED).then(res => res.data);
      setAvailableRequests(available);
      
      const myActive = await fetchRequests(RequestStatus.IN_PROGRESS);
      setMyRequests(myActive);
    };
    loadRequests();
  }, [fetchRequests]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Investigator Dashboard</h1>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Available Requests
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-requests'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('my-requests')}
          >
            My Investigations
          </button>
        </nav>
      </div>

      {activeTab === 'available' && (
        <AvailableRequests requests={availableRequests} />
      )}

      {activeTab === 'my-requests' && (
        <RequestList requests={myRequests} />
      )}
    </div>
  );
};

export default InvestigatorDashboard;