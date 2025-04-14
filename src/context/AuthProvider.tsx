import {  useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister, getCurrentUser, logout as authLogout } from '../services/auth';
import { Roles, User } from '../types/types';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<Roles | null>(Roles.USER);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) return
        const currentUser = await getCurrentUser();
        setUser(currentUser?.data);
        setActiveRole(localStorage.getItem('activeRole') as Roles);
      } catch (err) {
        console.log('Error fetching user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authLogin(email, password);
      setUser(userData);
      navigate('/user-dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await authRegister(userData);
      setUser(newUser);
      navigate('/user-dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
    navigate('/login');
    setActiveRole(null);
  };

  const switchRole = (role: Roles) => {
    setActiveRole(role);
    localStorage.setItem('activeRole', role);
    if(Roles[role] === Roles.INVESTIGATOR) {
      navigate('/investigator');
    }
    else if(Roles[role] === Roles.REQUESTER) {
      navigate('/requester-dashboard');
    }
    else if(Roles[role] === Roles.USER) {
      navigate('/profile');
    } 
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, switchRole, activeRole }}>
      {children}
    </AuthContext.Provider>
  );
};

