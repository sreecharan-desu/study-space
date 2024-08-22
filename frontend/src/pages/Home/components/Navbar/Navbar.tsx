import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { is_authenticated, user_rollnumber } from "../../../store/store";

const Button = React.lazy(() => import('./Button'));
const Heading = React.lazy(() => import('./navbar-heading'));

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
          {authenticated ? 
          (
            <Suspense fallback="Loading...">
              <Heading text={rollNumber} />
            </Suspense>
          ) : (
            <Suspense fallback="Loading...">
              <Button text="Create a Space" path="/createspace" />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
