import React, { Suspense, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { spaces, Space, is_authenticated } from "../../../store/store";
import { FETCH_SPACES_API, NO_AUTH_GET_SPACES_API } from "../../../apis/apis";
import TopBar from "../Topbar/Topbar";

const SpaceComp = React.lazy(() => import("./space-component"));
const Heading = React.lazy(() => import("../Navbar/navbar-heading"));

export default function Spaces() {
  const [Spacess, setSpaces] = useRecoilState<Space[]>(spaces);
  const [error, setError] = useState<string | null>(null);
  const isAuth = useRecoilValue(is_authenticated);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        let url = NO_AUTH_GET_SPACES_API;
        let headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (tokenString) {
          url = FETCH_SPACES_API;
          const token = JSON.parse(tokenString);
          headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
          };
        }

        const res = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.spaces)) {
          // Filter out expired spaces
          const filteredSpaces = data.spaces.filter((space: Space) => {
            if (!space.isExpired) return space;
          });
          setSpaces(filteredSpaces); // Set filtered spaces in Recoil state
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setError("Error fetching spaces. Please try again later.");
      }
    };
    fetchSpaces();
    setInterval(() => fetchSpaces(), 60 * 1000);
  }, [isAuth, setSpaces]);

  const validateSpaces = () => {
    let invalidSpacesCount = 0;
    Spacess.forEach((space) => {
      const isValid = space.Joined;
      if (isValid) invalidSpacesCount++;
    });
    return invalidSpacesCount;
  };

  const invalidSpacesCount = validateSpaces();
  const spacesCount = Spacess.length;

  if (invalidSpacesCount >= spacesCount && localStorage.getItem("token")) {
    return (
      <>
        <TopBar />
        <div className="ml-10 mt-10">
          There are no new spaces available. Go to Joined spaces to see the
          spaces you joined.
        </div>
      </>
    );
  } else if (
    invalidSpacesCount >= spacesCount &&
    !localStorage.getItem("token")
  ) {
    return (
      <>
        <div className="ml-10 mt-10">
          There are no new spaces available. Create a Space Now!.
        </div>
      </>
    );
  } else {
    return (
      <>
        {localStorage.getItem("token") ? (
          <>
            <TopBar />

            <div className="m-10">
              <Suspense fallback={<div>Loading Heading...</div>}>
                <Heading text="/Today's Spaces" />
              </Suspense>
            </div>
          </>
        ) : (
          <>
            <div className="m-10 font-bold text-2xl text-center first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl">
              Welcome to StudySpace!
            </div>
            <div className="m-10">
              <Suspense fallback={<div>Loading Heading...</div>}>
                <Heading text="/Today's Spaces" />
              </Suspense>
            </div>
          </>
        )}
        <div>
          {error ? (
            <div className="flex bg-white text-2xl font-bold justify-center text-center p-4">
              {error}
            </div>
          ) : Spacess.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-2">
              {Spacess.map((space) => (
                <Suspense
                  key={space._id}
                  fallback={<div>Loading Space...</div>}>
                  <SpaceComp
                    space_id={space._id}
                    description={space.Description}
                    heading={space.Title}
                    subjectName={space.Subject}
                    time={
                      space.FromTime.toString().split("T")[1].split(".")[0] +
                      " to " +
                      space.ToTime.toString().split("T")[1].split(".")[0]
                    }
                    date={space.DateCreatedOn}
                    venue={space.Venue}
                    Joined={space.Joined}
                    author={space.Author}
                    memberCount={space.Users.length}
                  />
                </Suspense>
              ))}
            </div>
          ) : (
            <div className="ml-10">
              There are no new spaces available. Go to Joined spaces to see the
              spaces you joined.
            </div>
          )}
        </div>
      </>
    );
  }
}
