import React, { Suspense, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { is_authenticated, user_rollnumber } from "../store/store";
import { GET_USERNAME_API } from "../apis/apis";

const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Spaces = React.lazy(() => import("./components/Spaces/spaces"));
const WarningMessage = React.lazy(
  () => import("../Warning Message/warning-message")
);
const HostSpace = React.lazy(() => import("./components/Host/HostSpace"));

export default function HomePage() {
  document.body.style.backgroundColor = "white";
  const isAuthenticated = useRecoilValue(is_authenticated);
  const setRollNo = useSetRecoilState(user_rollnumber);
  useEffect(() => {
    if (isAuthenticated) {
      const getUserRollNo = async () => {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;
        const res = await fetch(GET_USERNAME_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const rollNo = await res.json();
        setRollNo(rollNo);
      };
      getUserRollNo();
    }
  });
  return (
    <>
      <Suspense fallback="Loading">
        <Navbar />
      </Suspense>
      <Suspense fallback="Loading...">
        <WarningMessage />
      </Suspense>
      <Suspense fallback="Loading">
        {isAuthenticated ? (
          <>
            <HostSpace />
            <Spaces />
          </>
        ) : (
          <Spaces />
        )}
      </Suspense>
    </>
  );
}
