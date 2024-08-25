import React, { Suspense, useEffect } from "react";
import SpaceComp from "../Home/components/Spaces/space-component";
import { useRecoilState } from "recoil";
import { joinedSpaces } from "../store/store";
import { JOINED_SPACES_API } from "../apis/apis";

const Heading = React.lazy(
  () => import("../Home/components/Navbar/navbar-heading")
);
const Navbar = React.lazy(() => import("../Home/components/Navbar/Navbar"));
const Topbar = React.lazy(() => import("../Home/components/Topbar/Topbar"));

export default function Joinedspaces() {
  const [Spaces, SetSpaces] = useRecoilState(joinedSpaces); // Recoil state with setter

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
          console.error("No token found in localStorage");
          return;
        }
        const token = JSON.parse(tokenString);

        const res = await fetch(JOINED_SPACES_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.spaceDetails)) {
          SetSpaces(data.spaceDetails); // Update Recoil state with fetched spaces
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    getSpaces();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
      <Navbar />
      <Topbar />
      <div className="m-10">
        <Suspense fallback={<div>Loading Heading...</div>}>
          <Heading text={"/Joined Spaces" + `(${Spaces.length})`} />
        </Suspense>
      </div>
      <div className="m-10">
        {Spaces.length > 0 ? (
          <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-2 gap-4">
            {Spaces.map((space) => (
              <Suspense
                key={space._id}
                fallback={<div>Loading Space Component...</div>}
              >
                <SpaceComp
                  space_id={space._id}
                  description={space.Description}
                  heading={space.Title}
                  subjectName={space.Subject}
                  time={`${space.FromTime.split("T")[1].split(".")[0]} to ${
                    space.ToTime.split("T")[1].split(".")[0]
                  }`}
                  date={space.FromTime.split("T")[0]}
                  venue={space.Venue}
                  joined={true}
                />
              </Suspense>
            ))}
          </div>
        ) : (
          <div>No joined spaces available.</div>
        )}
      </div>
    </>
  );
}
