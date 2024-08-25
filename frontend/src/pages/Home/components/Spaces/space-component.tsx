import Button from "../Navbar/Button";

type SpaceProps = {
  space_id: string;
  heading: string;
  subjectName: string;
  description: string;
  date: string | Date; // Accept both string and Date
  time: string; // Time will be directly provided in the format 'HH:MM AM/PM to HH:MM AM/PM'
  venue: string;
  Joined: boolean;
  author: string;
  memberCount: number;
};

export default function SpaceComp({
  space_id = "id_87344rtyu734738u892",
  heading = "Chilling Session",
  subjectName = "Discrete Mathematics",
  description = "Join for an enthusiastic basic coverage. Let's delve deep into the topics and have a friendly conversation.",
  date = new Date(),
  time = "6:45 PM to 7:45 PM",
  venue = "Seminar hall",
  Joined = false,
  memberCount = 20,
  author = "Unknown",
}: SpaceProps) {
  // Ensure date is a Date object
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Format the date for display
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const currentTime = new Date();
  const spaceStartTime = new Date(
    parsedDate.toDateString() + " " + time.split(" to ")[0]
  );
  const spaceEndTime = new Date(
    parsedDate.toDateString() + " " + time.split(" to ")[1]
  );

  // Determine if the space is ongoing, ended, or not started
  const isOngoing =
    currentTime >= spaceStartTime && currentTime <= spaceEndTime;
  const isEnded = currentTime > spaceEndTime;
  const isNotStarted = currentTime < spaceStartTime;

  const renderMessage = () => {
    if (isNotStarted) {
      return (
        <div className="mt-4">
          {Joined ? (
            <div>Space will start soon. Check back later!</div>
          ) : (
            <Button text={"Join this space Now!"} space_id={space_id} />
          )}
        </div>
      );
    } else if (isOngoing) {
      return (
        <div className="mt-4">
          {Joined ? (
            <div>Space is currently ongoing. Enjoy the session!</div>
          ) : (
            <Button text={"Join this space Now!"} space_id={space_id} />
          )}
        </div>
      );
    } else if (isEnded) {
      return (
        <div className="mt-4">
          <div>{`Space has ended. It was held from ${time}.`}</div>
        </div>
      );
    }
  };

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
            {subjectName} by &nbsp;<b>{author}</b> &nbsp; <SmallDot /> &nbsp;{" "}
            {memberCount} joined.
          </span>
          <span
            className="flex justify-start md:text-sm"
            style={{ fontSize: "14px" }}
          >
            {formattedDate} &nbsp; <SmallDot /> &nbsp; {time} &nbsp;{" "}
            <SmallDot /> &nbsp; {venue}
          </span>
        </p>
        {renderMessage()}
      </div>
    </div>
  );
}

export function SmallDot() {
  return (
    <div className="text-sm" style={{ fontSize: "4px" }}>
      ⚫
    </div>
  );
}
