import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <Theme>{children}</Theme>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
