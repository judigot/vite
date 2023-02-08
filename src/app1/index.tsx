import ReactDOM from "react-dom/client";

import LoginForm from "./components/LoginForm";
import User from "./components/User";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Authentication from "./utils/Authentication";

const Default = ((parameter) => {
  const Default = async () => {
    const auth:
      | void
      | {
          isAuth: boolean;
          userData: string;
        }
      | {
          isAuth: boolean;
          userData?: undefined;
        }
      | undefined = await Authentication();
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                auth?.isAuth ? <Navigate to="/user" replace /> : <LoginForm />
              }
            />
            <Route
              path="/user"
              element={
                !auth?.isAuth ? (
                  <Navigate to="/login" replace />
                ) : (
                  <User payload={auth.userData} />
                )
              }
            />

            <Route path="/dashboard" element={<h1>Dashboard</h1>} />

            {/*=====404=====*/}
            <Route
              path="/*"
              element={
                auth?.isAuth ? <User payload={auth.userData} /> : <LoginForm />
              }
            />
            {/*=====404=====*/}
          </Routes>
        </BrowserRouter>
      </>
    );
  };
})();

export default Default!;
