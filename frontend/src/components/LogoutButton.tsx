import { useAuth } from '../contexts/AuthContext';
import { Button } from "@radix-ui/themes";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button
      color="gray"
      variant="soft"
      onClick={logout}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
