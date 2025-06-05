// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ 
  isAuthenticated, 
  children 
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};