import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { is_authenticated, user_rollnumber } from "../../../store/store";

const Button = React.lazy(() => import("./Button"));
const Heading = React.lazy(() => import("./navbar-heading"));

export default function Navbar() {
  const authenticated = useRecoilValue(is_authenticated);
  const rollNumber = useRecoilValue(user_rollnumber);

  return (
    <>
      <div className="flex justify-between bg-white shadow-md p-6">
        <div>
          <Suspense fallback="Loading...">
            <Heading text={"StudySpace"} />
          </Suspense>
        </div>
        <div className="flex justify-between">
          {authenticated ? (
            <Suspense fallback="Loading...">
              <Heading text={"Hello, " + rollNumber} />
              <button
                className="bg-black text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-red-700 transition duration-300 ease-in-out ml-10"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                  // Handle logout logic here
                }}
              >
                Logout
              </button>{" "}
            </Suspense>
          ) : (
            <Suspense fallback="Loading...">
              <Button text="Create a Space" space_id="" />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
