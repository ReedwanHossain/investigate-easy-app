import { useState, useEffect, useCallback } from 'react';
import { useRequests } from '../../hooks/useRequests';
import { Message } from '../../types/types';
import { useAuth } from '../../hooks/useAuth';

interface MessageListProps {
  requestId: string;
}

const MessageList = ({ requestId }: MessageListProps) => {
  const { user } = useAuth();
  const { getMessages, sendMessage } = useRequests();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const fetchData = useCallback(async () => {
    const data = await getMessages(requestId);
    console.log('Fetched messages:', data);
    setMessages(data);
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const sentMessage = await sendMessage(requestId, newMessage);
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Messages</h2>
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="space-y-4 max-h-96 overflow-y-auto p-2">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  message.senderId === user?.id
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageList;