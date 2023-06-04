import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { AuthContextProvider } from "~/context/AuthContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
};

export default api.withTRPC(MyApp);
