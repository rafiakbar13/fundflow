import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

// call component here
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import DashboardLayout from "@/layout/DashboardLayout";

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
        element: <div>profile</div>,
      },
      {
        path: "transactions",
        element: <div>transactions</div>,
      },
      {
        path: "bills",
        element: <div>bills</div>,
      },
      {
        path: "goals",
        element: <div>goals</div>,
      },
      {
        path: "settings",
        element: <div>settings</div>,
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
