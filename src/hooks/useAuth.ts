import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateUser } from '../services/auth';
import { User } from '../types/types';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const authAPI = () => {

  const updateUserInfo = async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await updateUser(userData);
      console.log('User updated successfully:', response);
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  return {
    updateUserInfo,
  }
}