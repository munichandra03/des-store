import React from "react";
import { LcsLink } from "@/widgets/LcsLink";

const index = () => {
  return (
    <div className="flex border border-b-slate-400 p-1">
      <div className="mx-5 flex hover:corsor-pointer">
        <LcsLink href="/" content="Category 1" />
        <img
          className=""
          src="/downArrow.svg"
          width="20"
          height="20"
          alt="logixal-logo"
        />
      </div>
      <div className="mx-5 flex hover:corsor-pointer">
        <LcsLink href="/" content="Category 2" />
        <img
          className=""
          src="/downArrow.svg"
          width="20"
          height="20"
          alt="logixal-logo"
        />
      </div>
      <div className="mx-5 flex hover:corsor-pointer">
        <LcsLink href="/" content="Category 3" />
        <img
          className=""
          src="/downArrow.svg"
          width="20"
          height="20"
          alt="logixal-logo"
        />
      </div>
    </div>
  );
};

export default index;
