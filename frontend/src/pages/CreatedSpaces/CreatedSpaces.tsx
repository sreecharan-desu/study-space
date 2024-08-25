import React from "react";

const Topbar = React.lazy(() => import("../Home/components/Topbar/Topbar"));
const Navbar = React.lazy(() => import("../Home/components/Navbar/Navbar"));
const Heading = React.lazy(
  () => import("../Home/components/Navbar/navbar-heading")
);

export default function Createdpaces() {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="m-10">
        <Heading text="/Created Spaces" />
      </div>
    </>
  );
}
