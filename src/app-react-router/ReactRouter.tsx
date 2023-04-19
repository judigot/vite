import React from "react";

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";

function ProfilePage() {
  const params = useParams();

  return <p>{JSON.stringify(params)}</p>;
}

export default function App() {
  // Conditional rendering based whether if the user is authenticated or not
  const [auth, setAuth] = React.useState<boolean>(!true);

  const is404Enabled: boolean = true;

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Navigate to={auth ? "/user" : "/login"} replace />,
      },
      {
        path: "/*",
        element: is404Enabled ? (
          <h1>404</h1>
        ) : (
          <Navigate to={auth ? "/user" : "/login"} replace />
        ),
      },
      {
        path: "/login",
        element: !auth ? <h1>Login</h1> : <Navigate to="/user" replace />,
      },
      {
        path: "/user",
        element: auth ? <h1>User</h1> : <Navigate to="/login" replace />,
      },
      {
        path: "/user/:userID",
        element: <ProfilePage />,
      },
    ],
    {
      basename: "/", // Set a base URL (e.g. "/app")
    }
  );

  return (
    <>
      <h1>Auth = {auth.toString()}</h1>
      <button
        type="button"
        onClick={() => {
          setAuth(!auth);
        }}
      >
        {auth ? "Logout" : "Login"}
      </button>
      <RouterProvider router={router} fallbackElement={<>Loading...</>} />
    </>
  );
}
