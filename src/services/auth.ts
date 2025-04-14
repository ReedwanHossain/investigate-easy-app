import api from './api';
import { User } from '../types/types';

interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string): Promise<User> => {
    try {
      const { data } = await api.post('/auth/login', { email, password });      
      if (!data.data.token || !data.data.user) {
        throw new Error('Invalid response structure');
      }
      
      localStorage.setItem('token', data.data.token);
      return data.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<User> => {
  const response = await api.post<LoginResponse>('/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/auth/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const updateUserRoles = async (id: string, roles: string[]): Promise<User> => {
  const response = await api.patch<User>(`/users/${id}/roles`, { roles });
  return response.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.patch<User>(`/auth/user/update`, userData);
  return response.data.data;
};