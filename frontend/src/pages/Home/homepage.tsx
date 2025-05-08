import React, { Suspense, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { is_authenticated, user_rollnumber } from "../store/store";
import { GET_USERNAME_API } from "../apis/apis";

const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Spaces = React.lazy(() => import("./components/Spaces/spaces"));
const WarningMessage = React.lazy(
  () => import("../Warning Message/warning-message")
);

export default function HomePage() {
  document.body.style.backgroundColor = "white";
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(is_authenticated);
  const setRollNo = useSetRecoilState(user_rollnumber);
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : null;
    if (token) {
      setIsAuthenticated(true);
    } else if (token == undefined) {
      setIsAuthenticated(false);
    }
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
        const response = await res.json();
        if (response.username == null) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
        setRollNo(response.username);
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
      <Spaces />
      </Suspense>
    </>
  );
}
