import { useCallback, useEffect, useState } from 'react';
import { useRequests } from '../hooks/useRequests';
import { Request } from '../types/types';
import RequestList from '../components/requester/RequestList';
import StatsCard from '../components/common/StatsCard';
import { useAuth } from '../hooks/useAuth';

type ActiveTab = 'all' | 'my-requests' | 'my-investigations';

const UserDashboard = () => {
  const { fetchRequestByRequester, fetchRequestByInvestigator } = useRequests();
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [displayedRequests, setDisplayedRequests] = useState<Request[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [stats, setStats] = useState({
    all: 0,
    asRequester: 0,
    asInvestigator: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user} = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [requesterRequests, investigatorRequests] = await Promise.all([
        fetchRequestByRequester(user!.id!),
        fetchRequestByInvestigator(user!.id!)
      ]);

      const combinedRequests = [...requesterRequests.data, ...investigatorRequests.data];
      setAllRequests(combinedRequests);

      setStats({
        all: combinedRequests.length,
        asInvestigator: investigatorRequests.data.length,
        asRequester: requesterRequests.data.length
        
      });

      filterRequests(activeTab, combinedRequests, requesterRequests.data, investigatorRequests.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const filterRequests = (tab: ActiveTab, allRequests: Request[], requesterRequests: Request[], investigatorRequests: Request[] ) => {
    switch (tab) {
      case 'all':
        setDisplayedRequests(allRequests);
        break;
      case 'my-requests':
        setDisplayedRequests(requesterRequests);
        break;
      case 'my-investigations':
        setDisplayedRequests(investigatorRequests);
        break;
      default:
        setDisplayedRequests(allRequests);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    filterRequests(tab, allRequests, allRequests, allRequests);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Investigator Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard 
          title="Total" 
          value={stats.all} 
          icon="📋"
          color="bg-blue-100 text-blue-800"
        />
        <StatsCard 
          title="Number of Requests" 
          value={stats.asRequester} 
          icon="🔎"
          color="bg-gray-100 text-gray-800"
        />
        <StatsCard 
          title="Number of Investigations" 
          value={stats.asInvestigator} 
          icon="⏳"
          color="bg-yellow-100 text-yellow-800"
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
              Total ({stats.all})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm ${
                activeTab === 'my-requests'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('my-requests')}
            >
              As Requestor ({stats.asRequester})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm ${
                activeTab === 'my-investigations'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('my-investigations')}
            >
              As Investigator ({stats.asInvestigator})
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
              <RequestList requests={displayedRequests} />
              
              {displayedRequests.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {activeTab === 'all' 
                      ? 'No available requests' 
                      : activeTab === 'my-requests'
                      ? 'You have no assigned requests'
                      : `No ${activeTab.replace('-', ' ')} requests`}
                  </h3>
                  <p className="mt-1 text-gray-500">
                    {activeTab === 'all'
                      ? 'Check back later for new investigation requests'
                      : 'All caught up with your investigations'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;