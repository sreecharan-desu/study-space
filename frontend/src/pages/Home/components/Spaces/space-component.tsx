import Button from "../Navbar/Button";

type SpaceProps = {
  space_id: string;
  heading: string;
  subjectName: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  Joined: boolean;
  author: string;
  memberCount: number;
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
  time = "6:45 PM to 7:45 PM",
  venue = "Seminar hall",
  Joined = false,
  memberCount = 20,
  author = "Unknown",
}: SpaceProps) {
  const [startTime, endTime] = time.split("to").map((t) => {
    const [hours, minutes] = t.trim().split(":");
    const period = t.trim().slice(-2); // AM or PM
    const date = new Date();
    date.setHours(
      period === "PM" && hours !== "12"
        ? parseInt(hours) + 12
        : parseInt(hours),
      parseInt(minutes)
    );
    return date;
  });

  const currentTime = new Date();

  const renderMessage = () => {
    if (!Joined) {
      return (
        <div className="mt-4">
          <Button text={"Join this space Now!"} space_id={space_id} />
        </div>
      );
    } else if (currentTime < startTime) {
      return (
        <div className="mt-4">
          Space will start at{" "}
          {startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    } else if (currentTime >= startTime && currentTime <= endTime) {
      return (
        <div className="mt-4">
          Space started at{" "}
          {startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          and will end at{" "}
          {endTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          Space started at{" "}
          {startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          and ended at{" "}
          {endTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    }
  };

  // Append (Ended) to the heading if the space has ended
  const finalHeading = currentTime > endTime ? `${heading} (Ended)` : heading;

  return (
    <div className="flex items-center justify-center" title={space_id}>
      <div className="p-10 bg-white rounded shadow-md w-full">
        <h1 className="text-2xl font-bold text-gray-800">{finalHeading}</h1>
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
            {date} &nbsp; <SmallDot /> &nbsp; {time} &nbsp; <SmallDot /> &nbsp;{" "}
            {venue}
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
