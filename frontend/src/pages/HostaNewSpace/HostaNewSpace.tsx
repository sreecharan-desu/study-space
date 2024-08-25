import React from "react";
const Heading = React.lazy(
  () => import("../Home/components/Navbar/navbar-heading")
);
const Topbar = React.lazy(() => import("../Home/components/Topbar/Topbar"));
const Navbar = React.lazy(() => import("../Home/components/Navbar/Navbar"));
export default function Hostspaces() {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="m-10">
        <Heading text="/Host a Space" />
      </div>
    </>
  );
}
