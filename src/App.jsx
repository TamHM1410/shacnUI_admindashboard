import { BrowserRouter} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
       <UserProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
       </UserProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
