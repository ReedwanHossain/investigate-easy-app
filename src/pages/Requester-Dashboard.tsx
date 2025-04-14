import { useCallback, useEffect, useState } from 'react';
import { useRequests } from '../hooks/useRequests';
import { Request, RequestStatus } from '../types/types';
import RequestList from '../components/requester/RequestList';
import { Link } from 'react-router-dom';
import StatsCard from '../components/common/StatsCard';
import { useAuth } from '../hooks/useAuth';

type ActiveTab = 'all' | 'pending' | 'inProgress' | 'completed' | 'declined';

const RequesterDashboard = () => {
  const { fetchRequestByRequester } = useRequests();
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    declined: 0
  });
  const [loading, setLoading] = useState(true);
  const { user} = useAuth();


  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await fetchRequestByRequester(user!.id!);
      setAllRequests(data);
      
      setStats({
        total: data.length,
        pending: data.filter(r => r.status === RequestStatus.PENDING).length,
        inProgress: data.filter(r => r.status === RequestStatus.IN_PROGRESS).length,
        completed: data.filter(r => r.status === RequestStatus.COMPLETED).length,
        declined: data.filter(r => r.status === RequestStatus.DECLINED).length
      });

      filterRequests('all', data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterRequests = (tab: ActiveTab, requests: Request[]) => {
    switch (tab) {
      case 'all':
        setFilteredRequests(requests);
        break;
      case 'pending':
        setFilteredRequests(requests.filter(r => r.status === RequestStatus.PENDING));
        break;
      case 'inProgress':
        setFilteredRequests(requests.filter(r => r.status === RequestStatus.IN_PROGRESS));
        break;
      case 'completed':
        setFilteredRequests(requests.filter(r => r.status === RequestStatus.COMPLETED));
        break;
      case 'declined':
        setFilteredRequests(requests.filter(r => r.status === RequestStatus.DECLINED));
        break;
      default:
        setFilteredRequests(requests);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    filterRequests(tab, allRequests);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Requests</h1>
        <Link
          to="/requests/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Request
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard 
          title="Total Requests" 
          value={stats.total} 
          icon="📋"
          color="bg-blue-100 text-blue-800"
        />
        <StatsCard 
          title="Pending" 
          value={stats.pending} 
          icon="⏳"
          color="bg-yellow-100 text-yellow-800"
        />
        <StatsCard 
          title="In Progress" 
          value={stats.inProgress} 
          icon="🔍"
          color="bg-purple-100 text-purple-800"
        />
        <StatsCard 
          title="Completed" 
          value={stats.completed} 
          icon="✅"
          color="bg-green-100 text-green-800"
        />
        <StatsCard 
          title="Declined" 
          value={stats.declined} 
          icon="❌"
          color="bg-red-100 text-red-800"
        />
      </div>

      {/* Requests Table with Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm ${
                activeTab === 'all'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('all')}
            >
              My all request ({stats.total})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('pending')}
            >
              Pending ({stats.pending})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm ${
                activeTab === 'inProgress'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('inProgress')}
            >
              In Progress ({stats.inProgress})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('completed')}
            >
              Completed ({stats.completed})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm ${
                activeTab === 'declined'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('declined')}
            >
              Declined ({stats.declined})
            </button>
          </nav>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              <RequestList requests={filteredRequests} />
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {activeTab === 'all'
                      ? 'No requests yet'
                      : `No ${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()} requests`}
                  </h3>
                  <p className="mt-1 text-gray-500">
                    {activeTab === 'all'
                      ? 'Get started by creating your first investigation request.'
                      : activeTab === 'completed'
                      ? 'No completed investigations yet'
                      : activeTab === 'declined'
                      ? 'No declined requests'
                      : 'No requests in this status'}
                  </p>
                  {activeTab === 'all' && (
                    <div className="mt-6">
                      <Link
                        to="/requests/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Request
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequesterDashboard;