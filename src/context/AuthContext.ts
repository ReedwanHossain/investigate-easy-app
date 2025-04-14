import { createContext } from 'react';
import { Roles, User } from '../types/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  switchRole: (role: Roles) => void;
  activeRole: Roles | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);