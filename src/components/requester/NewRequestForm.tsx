import { useState } from 'react';
import { useRequests } from '../../hooks/useRequests';
import { RequestStatus } from '../../types/types';
import { useNavigate } from 'react-router-dom';

const NewRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const { createRequest, loading, error } = useRequests();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRequest({
      title,
      description,
      location,
      status: RequestStatus.CREATED,
    });
    navigate('/requester-dashboard');
    
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">New Investigation Request</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location (City/State)
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRequestForm;