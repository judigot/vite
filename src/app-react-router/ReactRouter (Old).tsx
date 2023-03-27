import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  // Conditional rendering based whether if the user is authenticated or not
  const [auth, setAuth] = React.useState<boolean>(!true);

  const is404Enabled: boolean = !true;

  return (
    <BrowserRouter>
      <h1>Auth = {auth.toString()}</h1>
      <button
        type="button"
        onClick={() => {
          setAuth(!auth);
        }}
      >
        {auth ? "Logout" : "Login"}
      </button>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={auth ? "/user" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={!auth ? <h1>Login</h1> : <Navigate to="/user" replace />}
        />
        <Route
          path="/user"
          element={auth ? <h1>User</h1> : <Navigate to="/login" replace />}
        />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/404" element={<h1>404</h1>} />

        {/*=====404=====*/}
        {/* Redirect all unknown routes */}
        {is404Enabled ? (
          <Route path="/*" element={<h1>404</h1>} />
        ) : (
          <Route path="/*" element={<Navigate to={auth ? "/user" : "/login"} replace />} />
        )}
        {/*=====404=====*/}
      </Routes>
    </BrowserRouter>
  );
}
