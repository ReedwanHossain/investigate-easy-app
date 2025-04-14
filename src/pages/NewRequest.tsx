import NewRequestForm from '../components/requester/NewRequestForm';

const NewRequest = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">New Investigation Request</h1>
        <NewRequestForm />
      </div>
    </div>
  );
};

export default NewRequest;