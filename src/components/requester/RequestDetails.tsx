import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useRequests } from '../../hooks/useRequests';
import { Request, RequestStatus, Roles } from '../../types/types';
import ReportView from './ReportView';
import MessageList from './MessageList';
import { useAuth } from '../../hooks/useAuth';
import { acceptRequest } from '../../services/requests';

const RequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchRequest } = useRequests();
  const [request, setRequest] = useState<Request | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'messages' | 'report'>('details');
  const {activeRole} = useAuth();
  const navigate = useNavigate();


  const fetchData = useCallback(async () => {
    const data = await fetchRequest(id!);
    setRequest(data.data);
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!request) return <div>Loading...</div>;

  const  handleAcceptRequest = async () => {
    try {
      await acceptRequest(request.id);
      setRequest((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          status: RequestStatus.IN_PROGRESS,
        };
      });
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{request.title}</h1>
          <p className="text-gray-500">{request.location}</p>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            {
              [RequestStatus.CREATED]: 'bg-blue-100 text-blue-800',
              [RequestStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
              [RequestStatus.IN_PROGRESS]: 'bg-purple-100 text-purple-800',
              [RequestStatus.COMPLETED]: 'bg-green-100 text-green-800',
              [RequestStatus.DECLINED]: 'bg-red-100 text-red-800',
            }[request.status]
          }`}
        >
         {request.status.replace('_', ' ')}

        </span>
        {activeRole === Roles.INVESTIGATOR && request.status === RequestStatus.CREATED && (
          <button
            onClick={handleAcceptRequest}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Accept Request
          </button>

          
        )}
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          {request.status === RequestStatus.IN_PROGRESS && (
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          )}
          {activeRole === Roles.INVESTIGATOR && 
          (request.status === RequestStatus.COMPLETED || request.status === RequestStatus.IN_PROGRESS) && (
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'report'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('report')}
            >
              Report
            </button>
          )}
          {request.status === RequestStatus.IN_PROGRESS  && (
  <Link
    to={`/report/${request.id}`}
    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
  >
    Submit Report
  </Link>
)}
        </nav>
      </div>

      {activeTab === 'details' && (
        <div>
          <h2 className="text-lg font-medium mb-2">Description</h2>
          <p className="text-gray-700 mb-6">{request.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Requester</h3>
              <p>{request.requester.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p>{new Date(request.createdAt).toLocaleDateString()}</p>
            </div>
            {request.investigator && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Investigator</h3>
                <p>{request.investigator.name}</p>
              </div>
            )}
          </div>
        </div>
      )}

     {activeTab === 'messages' && (
  <MessageList requestId={request.id} />
  )}

{activeTab === 'report' && (
  <div>
    {request.report?  (
      <ReportView report={request.report} /> 
    ) : (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              No report submitted yet.
              {activeRole === Roles.INVESTIGATOR && request.status === RequestStatus.IN_PROGRESS && (
                <button
                  onClick={() => navigate(`/report/${request.id}`)}
                  className="ml-1 text-indigo-600 hover:text-indigo-500"
                >
                  Submit report now
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default RequestDetails;