import React from "react";
const Heading = React.lazy(
  () => import("../Home/components/Navbar/navbar-heading")
);
const Navbar = React.lazy(() => import("../Home/components/Navbar/Navbar"));
const Topbar = React.lazy(() => import("../Home/components/Topbar/Topbar"));

export default function Joinedspaces() {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="m-10">
        <Heading text="/Joined Spaces" />
      </div>
    </>
  );
}
