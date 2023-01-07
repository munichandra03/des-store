import React from "react";

const Popover = ({ popItems, dropdownOpen, action }) => {
  return (
    <>
      <div
        className={`${
          dropdownOpen
            ? `top-full opacity-100 visible w-32`
            : "top-[110%] invisible opacity-0 w-32"
        } absolute left-90 top-12 z-40 mt-2 rounded border-[.5px] border-slate-200 border-light bg-white shadow-card transition-all`}
      >
        {popItems.length === 0 ? (
          <>No user links</>
        ) : (
          popItems.map((item) => {
            return (
              <div
                key={item.name}
                className="block py-2 text-base font-semibold text-body-color"
                onClick={() => action(item.value)}
              >
                {/* <Link href={"/" + item.toLowerCase()} passHref>
                  <a className=" hover:bg-slate-400">{item}</a>
                </Link> */}
                {item.name}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Popover;
