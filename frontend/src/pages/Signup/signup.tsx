import React, { Suspense } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { email_sent } from "../store/store";

const WarningMessage = React.lazy(
  () => import("../Warning Message/warning-message")
);
const UsernameInput = React.lazy(() => import("./components/username-input"));
const EmailInput = React.lazy(() => import("./components/email-input"));
const PasswordInput = React.lazy(() => import("./components/password-input"));
const SignupButton = React.lazy(() => import("./components/signup-button"));
const OTP = React.lazy(() => import("./components/OTP"));
const OTPButton = React.lazy(() => import("./components/check-otp"));

export default function Signup() {
  const navigate = useNavigate();
  const emailSent = useRecoilValue(email_sent);

  const onClickHandler = () => {
    navigate("/signin");
  };

  if (emailSent) {
    return (
      <div className="bg-gray-200 min-h-screen">
        <div className="h-30">
          <Suspense fallback={<div>Loading Warning Message...</div>}>
            <WarningMessage />
          </Suspense>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center justify-center m-10 max-w-lg">
            <div className="p-8 bg-white shadow-md text-center rounded-md">
              <h1 className="flex justify-center text-2xl font-bold text-gray-800">
                <img
                  src="/logo.svg"
                  className="w-10 h-10"
                  alt="StudySpace Logo"
                />
                <p className="mt-2 m-2">StudySpace</p>
              </h1>
              <>
                <Suspense fallback={<div>Loading OTP...</div>}>
                  <OTP />
                </Suspense>
                <Suspense fallback={<div>Loading OTP Button...</div>}>
                  <OTPButton />
                </Suspense>
              </>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="bg-gray-200 min-h-screen">
          <div className="h-30">
            <Suspense fallback={<div>Loading Warning Message...</div>}>
              <WarningMessage />
            </Suspense>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center justify-center m-10 max-w-lg">
              <div className="p-8 bg-white shadow-md text-center rounded-md">
                <h1 className="flex justify-center text-2xl font-bold text-gray-800">
                  <img
                    src="/logo.svg"
                    className="w-10 h-10"
                    alt="StudySpace Logo"
                  />
                  <p className="mt-2 m-2">StudySpace</p>
                </h1>
                <>
                  <Suspense fallback={<div>Loading Username Input...</div>}>
                    <UsernameInput />
                  </Suspense>
                  <Suspense fallback={<div>Loading Email Input...</div>}>
                    <EmailInput />
                  </Suspense>
                  <Suspense fallback={<div>Loading Password Input...</div>}>
                    <PasswordInput />
                  </Suspense>
                  <br />
                  <Suspense fallback={<div>Loading Signup Button...</div>}>
                    <SignupButton />
                  </Suspense>
                  <div className="mt-4 text-sm text-red-600 font-semibold">
                    *Please only enter your college mail to continue
                  </div>
                  <p className="mt-1 text-sm text-gray-900">
                    Already have an account?&nbsp;
                    <a
                      className="underline font-bold cursor-pointer"
                      onClick={onClickHandler}
                    >
                      Signin
                    </a>
                  </p>
                </>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
