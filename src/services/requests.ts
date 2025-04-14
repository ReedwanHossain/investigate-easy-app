import api from './api';

export const createRequest = async (requestData: {
  title: string;
  description: string;
  location: string;
  status: string;
}) => {
  const response = await api.post('/requests', requestData);
  return response.data;
};

export const getRequests = async (status?: string) => {
  const response = await api.get('/requests', { params: { status } });
  return response.data;
};

export const getAvailableRequests = async () => {
  const response = await api.get('/requests/available');
  return response.data;
}


export const getRequestById = async (id: string) => {
  const response = await api.get(`/requests/${id}`);
  return response.data;
};

export const getRequestByInvestigator = async (id: string) => {
  const response = await api.get(`/requests/investigator/${id}`);
  return response.data;
};

export const getRequestByRequester = async (id: string) => {
  const response = await api.get(`/requests/requester/${id}`);
  return response.data;
};

export const acceptRequest = async (id: string) => {
  const response = await api.patch(`/requests/${id}/accept`);
  return response.data;
};

export const submitReport = async (requestId: string, investigatorId: string, content: string) => {
  const response = await api.post('/reports', { requestId, investigatorId, content });
  return response.data;
};

export const getReports = async (requestId: string) => {
  const response = await api.get('/reports', { params: { requestId } });
  return response.data;
};

export const submitReview = async (reviewData: {
  requestId: string;
  investigatorId: string;
  rating: number;
  comment?: string;
}) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const getMessagesAPI = async (requestId: string) => {
  const response = await api.get(`/messages?requestId=${requestId}`);
  return response.data;
};

export const sendMessage = async (requestId: string, content: string) => {
  const response = await api.post('/messages', { requestId, content });
  return response.data;
};