import { useParams } from 'react-router-dom';
import ReportForm from './ReportForm';

const PostReport = () => {
const { id } = useParams<{ id: string }>();

  if(id) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Post Report</h1>
        <ReportForm requestId={id} />
      </div>
    );
  }
};

export default PostReport;