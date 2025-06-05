// src/components/RoleBasedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/UseAppStore';

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

export const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const { dataUser } = useAppStore();

  if (!dataUser) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(dataUser.Rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};