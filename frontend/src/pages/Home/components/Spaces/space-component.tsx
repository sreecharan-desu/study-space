// import { useEffect } from "react";
// import { useRecoilState } from "recoil";
import Button from "../Navbar/Button";
// import { joinedSpaces } from "../../../store/store";
// import { JOINED_SPACES_API } from "../../../apis/apis";

type SpaceProps = {
  space_id: string;
  heading: string;
  subjectName: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  joined: boolean;
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
  joined = false,
}: SpaceProps) {
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
        {joined ? (
          <>
            <div className="mt-4">
              Get ready! Space starts at {time.split("to")[0]}
            </div>
          </>
        ) : (
          <>
            <div className="mt-4">
              <Button text={"Join this space Now!"} space_id={space_id} />
            </div>
          </>
        )}
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
