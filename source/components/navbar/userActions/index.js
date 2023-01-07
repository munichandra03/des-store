import React, { useState } from "react";
import Popover from "../popover";
import { LcsLink } from "@/widgets/LcsLink";

const UserAction = () => {
  const userDropDownArr = ["Account", "Orders", "Wishlist", "Logout"];
  const moreDropDownArr = ["About", "Contact", "More", "Other"];

  const [userDropDown, setUsernameDropDown] = useState(false);
  const [moreDropDown, setMoreDropDown] = useState(false);
  const handleClick = () => {};
  return (
    <div className="flex justify-around m-2">
      <button
        onMouseEnter={() => setUsernameDropDown(!userDropDown)}
        onMouseLeave={() => setUsernameDropDown(!userDropDown)}
        className="px-10 overflow-hidden rounded-full flex justify-center items-center hover:cursor-pointer"
      >
        Username
        <img
          className=""
          src="/downArrow.svg"
          width="20"
          height="20"
          alt="logixal-logo"
        />
        <Popover popItems={userDropDownArr} dropdownOpen={userDropDown} />
      </button>
      <button
        onMouseEnter={() => setMoreDropDown(!moreDropDown)}
        onMouseLeave={() => setMoreDropDown(!moreDropDown)}
        className="px-10 overflow-hidden rounded-full flex justify-center items-center hover:cursor-pointer"
      >
        More
        <img
          className=""
          src="/downArrow.svg"
          width="20"
          height="20"
          alt="logixal-logo"
        />
        <Popover popItems={moreDropDownArr} dropdownOpen={moreDropDown} />
      </button>
      <button
        className="relative px-10 bg-sate-200"
        onClick={(e) => handleClick(e)}
      >
        <div className="cart-count rounded-full absolute">
          <small className="rounded-full absolute inset-x-1 -bottom-1.5">
            6
          </small>
        </div>
        <LcsLink href="/cart">
          <img
            className=""
            src="/cart.png"
            width="20"
            height="20"
            alt="logixal-logo"
          />
        </LcsLink>
      </button>
    </div>
  );
};

export default UserAction;
