import Button from "../Navbar/Button";

type SpaceProps = {
  space_id : string,
  heading: string;
  subjectName: string;
  description: string;
  time: string;
  venue: string;
};

export default function SpaceComp({
  space_id = "id_87344rtyu734738u892",
  heading = "Chilling Session",
  subjectName = "Discrete Mathematics",
  description = "Join for an enthusiastic basic coverage. Let's delve deep into the topics and have a friendly conversation.",
  time = "6:45 PM",
  venue = "Seminar hall"
}: SpaceProps) {
  return (
    <>
      <div className="flex items-center justify-center m-10 max-w-lg" title={space_id}>
        <div className="p-8 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            {heading}
          </h1>
          <p className="mt-1 text-gray-600">
            {description}
          </p>
          <p className="mt-3 text-sm text-gray-900">
            <p className="flex justify-start md:text-sm" style={{ fontSize: '14px' }}>
              {subjectName}
            </p>
            <p className="flex justify-start md:text-sm" style={{ fontSize: '14px' }}>
              {time} to {time} &nbsp; <SmallDot /> &nbsp; {venue} &nbsp;
            </p>
          </p>
          <div className="mt-4">
            <Button path="/signin" text="Join this space Now!" />
          </div>
        </div>
      </div>
    </>
  );
}

function SmallDot() {
  return (
    <>
      <div className="text-sm" style={{ fontSize: '4px' }}>
        ⚫
      </div>
    </>
  );
}
