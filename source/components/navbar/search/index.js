import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    console.log(e);
  };
  return (
    <div className="search flex rounded-md w-6/12 my-1 px-4 bg-slate-100">
      {/* <div className="grid grid-cols-2 search rounded-md w-6/12 my-1 px-4 bg-slate-100"> */}
      <input
        type="text"
        className="w-full bg-slate-100 outline-none"
        placeholder="search"
        onChange={(e) => searchHandler(e)}
      />
      <img
        src="/search-icon.svg"
        className="cursor-pointer"
        width="24px"
        height="24px"
        alt="search-icon"
      />
    </div>
  );
};

export default Search;
