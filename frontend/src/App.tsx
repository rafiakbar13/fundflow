import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

// call component here
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import DashboardLayout from "@/layout/DashboardLayout";
import Settings from "@/module/settings";
import ProtectedRoutes from "@/lib/protectedRoutes";
import Goals from "@/module/goals";
import Transactions from "./module/transactions";
import Balances from "./module/balances";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <div>dashboard</div>,
      },
      {
        path: "balances",
        element: <Balances />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "bills",
        element: <div>bills</div>,
      },
      {
        path: "expenses",
        element: <div>expenses</div>,
      },
      {
        path: "goals",
        element: <Goals />,
      },
      {
        path: "settings",
        element: (
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors />
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
