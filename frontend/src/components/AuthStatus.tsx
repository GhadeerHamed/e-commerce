import { useAuth } from '../contexts/AuthContext';

const AuthStatus = () => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (user)
    return (
      <div>
        <span>Welcome, {user.name}!</span>
      </div>
    );
  return <span>Not logged in</span>;
};
export default AuthStatus;
