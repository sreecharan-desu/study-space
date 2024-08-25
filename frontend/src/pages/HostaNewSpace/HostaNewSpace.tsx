import React from "react";
import Host from "../Home/components/Host/HostSpace";
import WarningMessage from "../Warning Message/warning-message";
const Heading = React.lazy(
  () => import("../Home/components/Navbar/navbar-heading")
);
const Topbar = React.lazy(() => import("../Home/components/Topbar/Topbar"));
const Navbar = React.lazy(() => import("../Home/components/Navbar/Navbar"));
export default function Hostspaces() {
  return (
    <>
      <WarningMessage />
      <Navbar />
      <Topbar />
      <div className="m-10">
        <Heading text="/Host a Space" />
      </div>
      <Host />
    </>
  );
}
