import React, { Suspense, useEffect, useState } from "react";
import SpaceComp from "../Home/components/Spaces/space-component"; // Ensure correct path and capitalization
import { useRecoilState } from "recoil";
import { CreatedSpaces as createdSpacesAtom, Space } from "../store/store";
import { CREATED_SPACES_API } from "../apis/apis";

const Topbar = React.lazy(() => import("../Home/components/Topbar/Topbar"));
const Navbar = React.lazy(() => import("../Home/components/Navbar/Navbar"));
const Heading = React.lazy(
  () => import("../Home/components/Navbar/navbar-heading")
); // Ensure correct path and capitalization

export default function CreatedSpacesPage() {
  const [Spaces, setSpaces] = useRecoilState<Space[]>(createdSpacesAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
          console.error("No token found in localStorage");
          return;
        }
        const token = JSON.parse(tokenString);

        const res = await fetch(CREATED_SPACES_API, {
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
          setSpaces(data.spaceDetails as Space[]);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setError("Error fetching spaces. Please try again later.");
      }
    };

    getSpaces();
  }, [setSpaces]);

  // Function to format date and time for IST time zone
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <div className="m-10">
        <Suspense fallback={<div>Loading Heading...</div>}>
          <Heading text={`/Created Spaces (${Spaces.length})`} />
        </Suspense>
      </div>
      <div className="m-10">
        {error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
        ) : Spaces.length > 0 ? (
          <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-2 gap-4">
            {Spaces.map((space) => {
              if (!space) {
                // Skip if space is null or undefined
                return null;
              }

              const fromTime = space.FromTime ? new Date(space.FromTime) : null;
              const toTime = space.ToTime ? new Date(space.ToTime) : null;
              const currentTime = new Date();
              const isEnded = toTime ? currentTime > toTime : false;

              return (
                <Suspense
                  key={space._id}
                  fallback={<div>Loading Space Component...</div>}
                >
                  <SpaceComp
                    space_id={space._id || "Unknown ID"}
                    description={
                      space.Description || "No description available"
                    }
                    heading={
                      isEnded
                        ? `${space.Title} (Ended)`
                        : space.Title || "No Title"
                    }
                    subjectName={space.Subject || "Unknown Subject"}
                    time={`${
                      fromTime
                        ? fromTime.toISOString().split("T")[1].split(".")[0]
                        : "N/A"
                    } to ${
                      toTime
                        ? toTime.toISOString().split("T")[1].split(".")[0]
                        : "N/A"
                    }`}
                    date={formatDate(
                      fromTime ? fromTime.toISOString().split("T")[0] : ""
                    )}
                    venue={space.Venue || "Unknown Venue"}
                    Joined={true}
                    author={space.Author || "Unknown Author"}
                    memberCount={space.Users ? space.Users.length : 0}
                  />
                </Suspense>
              );
            })}
          </div>
        ) : (
          <div>No spaces created.</div>
        )}
      </div>
    </>
  );
}
