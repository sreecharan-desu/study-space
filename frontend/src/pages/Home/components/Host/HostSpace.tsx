import React, { Suspense } from "react";

export default function Host() {
  const Title = React.lazy(() => import("./components/title"));
  const Description = React.lazy(() => import("./components/description"));
  const Subject = React.lazy(() => import("./components/subject"));
  const FromTime = React.lazy(() => import("./components/from-time"));
  const ToTime = React.lazy(() => import("./components/to-time"));
  const Venue = React.lazy(() => import("./components/venue"));
  const Create = React.lazy(() => import("./components/create-space"));

  return (
    <>
      <div className="flex justify-center">
        <div className="flex items-center justify-center m-10 max-w-lg">
          <div className="p-8 bg-white shadow-md text-center rounded-md">
            <h1 className="flex justify-center text-2xl font-bold text-gray-800 text-center">
              <img
                src={"/logo.svg"}
                className="w-10 h-10"
                alt="StudySpace Logo"
              />
              <p className="mt-2 m-2">StudySpace</p>
            </h1>
            <label className="block mt-1 text-gray-600">
              <Suspense fallback={<div>Loading...</div>}>
                <Title />
              </Suspense>
            </label>
            <label className="block mt-1 text-gray-600">
              <Suspense fallback={<div>Loading...</div>}>
                <Description />
              </Suspense>
            </label>
            <label className="block mt-1 text-gray-600">
              <Suspense fallback={<div>Loading...</div>}>
                <Subject />
              </Suspense>
            </label>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Venue />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                From : <FromTime /> To : <ToTime />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Create />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
