import { useState } from 'react';
import {
  createRequest,
  getRequests,
  getRequestById,
  acceptRequest,
  submitReport,
  submitReview,
  sendMessage,
  getAvailableRequests,
  getRequestByInvestigator,
  getRequestByRequester,
  getMessagesAPI,
  getReports,
} from '../services/requests';
import { RequestStatus } from '../types/types';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async (status?: RequestStatus) => {
    setLoading(true);
    setError(null);
    try {
      return await getRequests(status)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      return await getAvailableRequests()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchRequest = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await getRequestById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch request');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestByInvestigator = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await getRequestByInvestigator(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch request');
      return null;
    } finally {
      setLoading(false);
    }
  };


  const fetchRequestByRequester = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await getRequestByRequester(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch request');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createNewRequest = async (requestData: {
    title: string;
    description: string;
    location: string;
    status: RequestStatus;
  }) => {
    setLoading(true);
    setError(null);
    try {
      return await createRequest(requestData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create request');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const acceptNewRequest = async (id: string) => {
    setLoadingId(id);
    setError(null);
    try {
      return await acceptRequest(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept request');
      return null;
    } finally {
      setLoadingId(null);
    }
  };

  const submitNewReport = async (requestId: string, investigatorId: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      return await submitReport(requestId, investigatorId, content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submitNewReview = async (reviewData: {
    requestId: string;
    investigatorId: string;
    rating: number;
    comment?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      return await submitReview(reviewData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendNewMessage = async (requestId: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      return await sendMessage(requestId, content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const getMessages = async (requestId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await getMessagesAPI(requestId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      return [];
    } finally {
      setLoading(false);
    }
  }

  const getReport = async (requestId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await getReports(requestId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loadingId,
    error,
    fetchRequests,
    fetchRequest,
    fetchAvailableRequests,
    fetchRequestByRequester,
    fetchRequestByInvestigator,
    createRequest: createNewRequest,
    acceptRequest: acceptNewRequest,
    submitReport: submitNewReport,
    getReport,
    submitReview: submitNewReview,
    sendMessage: sendNewMessage,
    getMessages,
  };
};