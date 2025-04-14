import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { Roles } from '../../types/types';

export const ProtectedRoute = ({ allowedRoles = [], children }: { allowedRoles?: string[], children?: React.ReactNode }) => {
  const { user, loading, activeRole } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  


  if (allowedRoles.length > 0 && !allowedRoles.includes(activeRole as Roles)) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};