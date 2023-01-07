import React from "react";
import Brand from "./brand";
import Search from "./search";
import UserAction from "./userActions";

const Navbar = () => {
  return (
    <nav className="flex justify-around pl-10 pr-10 py-2">
      <Brand />
      <Search />
      <UserAction />
    </nav>
  );
};
export default Navbar;
