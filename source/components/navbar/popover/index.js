import React from "react";
import { LcsLink } from "@/widgets/LcsLink";

const Popover = ({ popItems, dropdownOpen }) => {
  return (
    <>
      <div
        className={`${
          dropdownOpen
            ? `top-full opacity-100 visible`
            : "top-[110%] invisible opacity-0"
        } absolute left-90 top-14 z-40 mt-2 rounded border-[.5px] border-light bg-white shadow-card transition-all`}
      >
        {popItems.length === 0 ? (
          <>No user links</>
        ) : (
          popItems.map((item) => {
            return (
              <div
                key={item}
                className="block py-2 px-7 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary border border-light"
              >
                <LcsLink href={"/" + item.toLowerCase()} content={item} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Popover;
