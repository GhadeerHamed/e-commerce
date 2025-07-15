import { PropsWithChildren } from "react";
import { AuthProvider as CustomAuthProvider } from "../contexts/AuthContext";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <CustomAuthProvider>{children}</CustomAuthProvider>;
};

export default AuthProvider;
