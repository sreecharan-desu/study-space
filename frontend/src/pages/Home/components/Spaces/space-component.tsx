import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Button from "../Navbar/Button";
import { joinedSpaces } from "../../../store/store";

type SpaceProps = {
  space_id: string;
  heading: string;
  subjectName: string;
  description: string;
  date: string;
  time: string;
  venue: string;
};

const formattedDate = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  year: "numeric",
});

export default function SpaceComp({
  space_id = "id_87344rtyu734738u892",
  heading = "Chilling Session",
  subjectName = "Discrete Mathematics",
  description = "Join for an enthusiastic basic coverage. Let's delve deep into the topics and have a friendly conversation.",
  date = formattedDate,
  time = "6:45 PM",
  venue = "Seminar hall",
}: SpaceProps) {
  const [JoinedSpaces, setJoinedSpaces] = useRecoilState(joinedSpaces);
  useEffect(() => {
    const fetchJoinedSpaces = async () => {
      const tokenString = localStorage.getItem("token");
      const token = tokenString ? JSON.parse(tokenString) : null;

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/spacesjoined",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setJoinedSpaces(data.spaces);
        } else {
          console.error(data.msg);
        }
      } catch (error) {
        console.error("Error fetching joined spaces:", error);
      }
    };

    fetchJoinedSpaces();
  }, [setJoinedSpaces]);

  const isJoined = JoinedSpaces.includes(space_id);

  return (
    <div className="flex items-center justify-center" title={space_id}>
      <div className="p-10 bg-white rounded shadow-md w-full">
        <h1 className="text-2xl font-bold text-gray-800">{heading}</h1>
        <p className="mt-1 text-gray-600">{description}</p>
        <p className="mt-3 text-sm text-gray-900">
          <span
            className="flex justify-start md:text-sm"
            style={{ fontSize: "14px" }}
          >
            {subjectName}
          </span>
          <span
            className="flex justify-start md:text-sm"
            style={{ fontSize: "14px" }}
          >
            {date} &nbsp; <SmallDot /> &nbsp; {time} &nbsp; <SmallDot /> &nbsp;{" "}
            {venue}
          </span>
        </p>
        <div className="mt-4">
          <Button
            text={isJoined ? "Joined" : "Join this space Now!"}
            space_id={isJoined ? "" : space_id}
          />
        </div>
      </div>
    </div>
  );
}

function SmallDot() {
  return (
    <div className="text-sm" style={{ fontSize: "4px" }}>
      ⚫
    </div>
  );
}
