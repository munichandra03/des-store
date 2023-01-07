import React, { useEffect, useState } from "react";
import { Icons } from "@/consts/style.consts";
import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FacetFilter = ({
  type,
  title,
  data,
  maxShow,
  preset,
  onChangeHandler,
  onClickhandlerForRatings,
}) => {
  // console.log({ type, title, data, maxShow, preset });
  const [categoryField, setField] = useState({});
  const [showTab, setShowTab] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(null);

  useEffect(() => {
    // if (searchTerm) {
    //   const filteredItems = data.filter((item) => {
    //     return item.facetName.toLowerCase().includes(searchTerm.toLowerCase());
    //   });
    //   setFilterData(filteredItems);
    // } else {
    //   setFilterData(data);
    // }
  }, []);

  const onClickHandler = () => {
    if (showTab) {
      setShowTab(false);
    } else {
      setShowTab(true);
    }
  };

  const onSearchClickHandler = () => {
    setShowInputField(true);
  };

  return (
    <div className="py-1" key={title}>
      <h3 className=" flow-root">
        {/* <!-- Expand/collapse section button --> */}
        <div
          className="flex w-full items-center justify-between p-3 py-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer"
          onClick={onClickHandler}
        >
          <span className="font-medium text-gray-900">{title}</span>
          {showInputField ? (
            <input
              type="text"
              className="border border-gray-400 border-solid"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          ) : (
            ""
          )}
          <span className=" flex items-center">
            {/* <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: mini/plus
                    --> */}
            {/* {title === "Brand" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="  w-4 h-4 my-auto text-gray-400 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={onSearchClickHandler}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            ) : (
              ""
            )} */}
            <button type="button">
              {!showTab ? (
                <Icons.Plus />
              ) : (
                <Icons.Minus />
                // <svg
                //   className="h-5 w-5"
                //   xmlns="http://www.w3.org/2000/svg"
                //   viewBox="0 0 20 20"
                //   fill="currentColor"
                //   aria-hidden="true"
                // >
                //   <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                // </svg>
                // <svg
                //   className="h-5 w-5"
                //   xmlns="http://www.w3.org/2000/svg"
                //   viewBox="0 0 20 20"
                //   fill="currentColor"
                //   aria-hidden="true"
                // >
                //   <path
                //     fill-rule="evenodd"
                //     d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                //     clip-rule="evenodd"
                //   />
                // </svg>
                //   <svg
                //     viewBox="0 0 32 32"
                //     xmlns="http://www.w3.org/2000/svg"
                //     className="
                // ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
                //   >
                //     <path
                //       fill-rule="evenodd"
                //       d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                //     />
                //   </svg>
              )}
            </button>
          </span>
        </div>
      </h3>
      {/* <!-- Filter section, show/hide based on section state. --> */}
      {showTab ? (
        <div className="h-32 overflow-y-auto px-3" id="filter-section-0">
          {type === "checkbox" ? (
            <div className="space-y-4">
              {data !== null &&
                data.map((item, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      <input
                        id="filter-color-0"
                        name="color[]"
                        value={item.facetName}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={item.checked}
                        onChange={(e) => onChangeHandler(e.target.value, title)}
                      />
                      <label
                        htmlFor="filter-color-0"
                        className="flex ml-3 text-sm text-gray-600"
                      >
                        {item.facetName}
                        {item.boosted && (
                          <p className="flex justify-between align-middle bg-red-500 rounded-full p-0.5 mx-1 h-full">
                            <svg
                              className="w-3 h-3"
                              fill="#ffffff"
                              stroke="#ffffff"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              ></path>
                            </svg>
                          </p>
                        )}
                      </label>
                    </div>
                  );
                })}
            </div>
          ) : (
            ""
          )}
          <div>
            {type === "button" ? (
              <div className="flex">
                {data.length !== 0 &&
                  data.map((item, index) => {
                    return (
                      <button
                        onClick={onClickhandlerForRatings}
                        id={item.facetName}
                        key={index}
                      >
                        {[0, 1, 2, 3].map((e, i) => (
                          <StarIcon
                            key={e+i}
                            className={classNames(
                              item.facetName > e
                                ? "text-gray-900"
                                : "text-gray-200",
                              "h-12 w-8 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </button>
                    );
                  })}
                {/* {[0, 1, 2, 3, 4].map((e) => (
                  <StarIcon
                    key={e}
                    className={classNames(
                      4 > e ? "text-gray-900" : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))} */}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div>
            {type === "button" ? (
              <div className="flex">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      2 > rating ? "text-gray-900" : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div> */}
    </div>
  );
};

export default FacetFilter;
