import React, { Suspense } from "react";
import { useNavigate } from "react-router";

export default function Signin() {
  const WarningMessage = React.lazy(
    () => import("../Warning Message/warning-message")
  );
  const Email = React.lazy(() => import("./email-input"));
  const Password = React.lazy(() => import("./password-input"));
  const Signin = React.lazy(() => import("./signin-button"));

  const navigate = useNavigate();

  // Set background color of the body
  document.body.style.backgroundColor = "rgb(229 231 235)";

  const onClickHandler = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="h-30">
        <Suspense fallback="Loading...">
          <WarningMessage />
        </Suspense>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center justify-center m-10 max-w-lg">
          <div className="p-8 bg-white shadow-md text-center rounded-md">
            <h1 className="flex justify-center text-2xl font-bold text-gray-800">
              <img
                src={"/logo.svg"}
                className="w-10 h-10"
                alt="StudySpace Logo"
              />
              <p className="mt-2 m-2">StudySpace</p>
            </h1>

            <p className="mt-1 text-gray-600">
              <Suspense fallback="Loading...">
                <Email />
              </Suspense>
            </p>

            <p className="mt-1 text-gray-600">
              <Suspense fallback="Loading...">
                <Password />
              </Suspense>
            </p>

            <div>
              <Suspense fallback="Loading...">
                <Signin />
              </Suspense>
            </div>

            <p className="mt-3 text-sm text-gray-900">
              <div className="mt-4 text-sm text-red-600 font-semibold text-center">
                *Please only enter your college mail to continue
              </div>
              <p
                className="flex justify-center m-1"
                style={{ fontSize: "14px" }}
              >
                New to StudySpace?&nbsp;
                <a
                  className="underline font-bold cursor-pointer"
                  onClick={onClickHandler}
                >
                  Signup
                </a>
              </p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
