import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to={`/login?returnUrl=${location.pathname}`} />;
  return children;
};
export default PrivateRoutes;
