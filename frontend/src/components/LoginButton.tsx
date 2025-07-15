import { useNavigate } from 'react-router-dom';
import { Button } from "@radix-ui/themes";

const LoginButton = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/login')}>Log In</button>;
};

export default LoginButton;
