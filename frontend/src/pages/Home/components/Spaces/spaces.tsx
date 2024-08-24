import React, { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import { spaces } from "../../../store/store";

const SpaceComp = React.lazy(() => import("./space-component"));

export default function Spaces() {
  const [Spacess, setSpaces] = useRecoilState(spaces);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const res = await fetch("http://localhost:3000/api/v1/user/getspaces", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(token),
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setSpaces(data.spaces);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    getSpaces();
  }, [setSpaces]);

  if (Spacess[0]) {
    return (
      <>
        <Suspense fallback="Loading...">
          <div className="m-10 font-bold text-2xl first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl">
            Welcome to StudySpace!
          </div>
          <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-2">
            {Spacess.map((space, index) => {
              return (
                <>
                  <SpaceComp
                    space_id={space._id}
                    description={space.Description}
                    heading={space.Title}
                    subjectName={space.Subject}
                    time={
                      space.FromTime.split("T")[1].split(".")[0] +
                      " to " +
                      space.ToTime.split("T")[1].split(".")[0]
                    }
                    date={space.FromTime.split("T")[0]}
                    venue={space.Venue}
                    key={index}
                  />
                </>
              );
            })}
          </div>
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <Suspense fallback="Loading...">
          <div className="m-10 font-bold text-2xl first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl">
            Welcome to StudySpace!
          </div>
          <div className="flex bg-white text-2xl font-bold justify-center text-center">
            There aren't any spaces yet. Be the first to create one now!
          </div>
        </Suspense>
      </>
    );
  }
}
