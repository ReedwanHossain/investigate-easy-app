import {  useState } from 'react';
import { useRequests } from '../../hooks/useRequests';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface ReportFormProps {
  requestId: string;
}

const ReportForm = ({ requestId }: ReportFormProps) => {
  const [content, setContent] = useState('');
  const { submitReport, loading, error } = useRequests();
  const { user } = useAuth()
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitReport(requestId, user!.id!, content);
    if (success) {
      navigate('/investigator');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Submit Investigation Report</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="report" className="block text-sm font-medium text-gray-700">
            Report Details
          </label>
          <textarea
            id="report"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;