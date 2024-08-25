import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import MainLayout from "./pages/MainLayout"; // Adjust the import path as needed
const HomePage = React.lazy(() => import("./pages/Home/homepage"));
const Signin = React.lazy(() => import("./pages/Signin/signin"));
const Signup = React.lazy(() => import("./pages/Signup/signup"));
const Createdpaces = React.lazy(
  () => import("./pages/CreatedSpaces/CreatedSpaces")
);
const JoinedSpaces = React.lazy(
  () => import("./pages/JoinedSpaces/JoinedSpaces")
);
const HostaSpace = React.lazy(
  () => import("./pages/HostaNewSpace/HostaNewSpace")
);

function App() {
  return (
    <>
      <MainLayout>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <Suspense fallback={"Loading..."}>
                  <HomePage />
                </Suspense>
              }
              path="/"
            />
            <Route
              element={
                <Suspense fallback={"Loading..."}>
                  <Signin />
                </Suspense>
              }
              path="/signin"
            />
            <Route
              element={
                <Suspense fallback={"Loading..."}>
                  <Signup />
                </Suspense>
              }
              path="/signup"
            />
            <Route
              element={
                <Suspense fallback={"Loading..."}>
                  <Createdpaces />
                </Suspense>
              }
              path="/createdspaces"
            />
            <Route
              element={
                <Suspense fallback={"Loading..."}>
                  <JoinedSpaces />
                </Suspense>
              }
              path="/joinedspaces"
            />
            <Route
              element={
                <Suspense fallback={"Loading..."}>
                  <HostaSpace />
                </Suspense>
              }
              path="/hostaspace"
            />
          </Routes>
        </BrowserRouter>
      </MainLayout>
    </>
  );
}

export default App;
