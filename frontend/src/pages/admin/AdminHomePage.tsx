import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const AdminHomePage = () => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading auth...</p>;
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <h1>Admin Area</h1>
      <Link to="products">Products</Link>
    </div>
  );
};

export default AdminHomePage;
