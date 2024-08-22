import React, { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import { spaces } from "../../../store/store";

const SpaceComp = React.lazy(() => import('./space-component'));

export default function Spaces() {
  const [Spacess, setSpaces] = useRecoilState(spaces);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const res = await fetch('API_ENDPOINT_HERE', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(token)
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setSpaces(data.spaces);

      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    getSpaces();
  }, [setSpaces]);

  if (Spacess[1] === undefined) {
    return (
      <>
        <Suspense fallback="Loading...">
          <div className='m-10 font-bold text-2xl first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl'>
            Welcome to StudySpace!
          </div>
          <div className="flex bg-white text-2xl font-bold justify-center text-center">
            There aren't any spaces yet. Be the first to create one now!
          </div>
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <Suspense fallback="Loading...">
          <div className='m-10 font-bold text-2xl first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl'>
            Welcome to StudySpace!
          </div>
          <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-2">
            {Spacess.map((space, index) => (
              <Suspense key={index} fallback="Loading...">
                <SpaceComp
                  space_id={space.space_id || "id_873y48283y89y382"}
                  heading={space.title || "Chilling Session"}
                  subjectName={space.subject || "Discrete Mathematics"}
                  description={space.description || "Join for an enthusiastic basic coverage. Let's delve deep into the topics and have a friendly conversation."}
                  time={space.fromtime + " to " + space.totime || "6:45 to 7:45"}
                  venue={space.venue || "Seminar hall"}
                />
              </Suspense>
            ))}
          </div>
        </Suspense>
      </>
    );
  }
}
