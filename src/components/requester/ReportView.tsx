import { Report } from '../../types/types';

interface ReportViewProps {
  report: Report;
}

const ReportView = ({ report }: ReportViewProps) => {
  if (!report?.content) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Report content is empty or not available
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Investigation Report</h2>
        <div className="text-sm text-gray-500">
          Submitted: {new Date(report.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap font-sans">{report.content}</pre>
      </div>
      {report.investigator && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
          Investigator: {report.investigator.name}
        </div>
      )}
    </div>
  );
};

export default ReportView;