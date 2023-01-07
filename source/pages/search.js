import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import LcsPagination from "@/widgets/LcsPagination";
import APP from "@/consts/app.const";
import ProductCard from "@/components/product/ProductCard";
import API from "@/utils/httputils";
import formatMessage from "format-message";
import config from "../config.json";
import { isNullOrUndefined } from "@/utils/index";
import FacetFilter from "@/widgets/FacetFilter";
import { LcsLink } from "@/widgets/LcsLink";

let PageSize = APP.PLP.PAGINATION.ITEMS_PER_PAGE;

const Search = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [names, setNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [noDataBoo, setNoDataBoo] = useState({ noData: false });
  const [badgeBoo, setBadgeBoo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [facetClose, setFacetClose] = useState(null);
  const [selectedFacets, setSelectedFacets] = useState(null);
  const [filterSideNav, setFilterSideNav] = useState(false);
  const [responseHeaders, setResponseHeaders] = useState(null);
  const [sortKey, setSortKey] = useState({});
  const [sortDropDown, setSortDropDown] = useState(false);
  // adding checked: Boolean key to all facet Objects
  const [facetFilterData, setFacetFilterData] = useState(null);

  const href = router.pathname;
  const sortDropDownArr = [
    { name: "Featured", value: "" },
    { name: "Low to High", value: "SalePrice asc" },
    { name: "High to Low", value: "SalePrice desc" },
  ];
  // console.log("selectedFacets", selectedFacets);
  // get search results
  const getSearchResult = async (searchKey, fromFacetBadge, fromMenu) => {
    setList([]);
    setIsLoading(true);
    let solrCollection = await API.getSolrCollection();
    let facetJSON = [];
    let newFacetObj = null;
    let facetJSONKeys =
      !isNullOrUndefined(selectedFacets) && Object.keys(selectedFacets);
    for (let q = 0; q < facetJSONKeys.length; q++) {
      selectedFacets[facetJSONKeys[q]].map((boo) => {
        facetJSON.push(boo);
      });
    }
    let searchResult;
    if (searchKey) {
      searchResult = await API.getLogSearchService(
        formatMessage(config.apiUrlData.searchResult.part_url, {
          collectionId: solrCollection,
          searchString: searchKey,
          facet:
            facetJSON === []
              ? JSON.stringify(router.query.facets)
              : JSON.stringify(facetJSON),
          sortedKey:
            sortKey.value === "Featured" || isNullOrUndefined(sortKey.value)
              ? 0
              : sortKey.value,
        }),
        null, //productid for signal
        router.query.search, // filteredSearchTerm, //searchTerm for signal
        facetJSON.length <= 0 ? null : JSON.stringify(facetJSON), //facetTerm for signal
        facetJSON.length > 0 ? "facet" : "query", // check if query or facet
        null,
        null // categoryId for signal
      );
    }
    if (searchResult?.response?.data?.response?.docs.length > 0) {
      setIsLoading(false);
      setNoDataBoo({ ...noDataBoo, noData: false });
      setList(searchResult.response.data.response.docs);

      setResponseHeaders(searchResult.response.data.responseHeader);
      if (fromFacetBadge === false) {
        // add checked boolean to all facet objects
        newFacetObj = searchResult.response.data.boostedFacets
          ? searchResult.response.data.boostedFacets
          : searchResult.data.facet_counts.facet_fields;
        let selectedFacetsTemplate = {};
        newFacetObj =
          newFacetObj &&
          Object.fromEntries(
            Object.entries(newFacetObj).map(([key, value]) => [
              key.split("_str")[0],
              value,
            ])
          );
        const facetsArr = Object.keys(newFacetObj);
        for (let i = 0; i < facetsArr.length; i++) {
          var facetField = facetsArr[i];
          selectedFacetsTemplate[facetField] = [];
          newFacetObj[facetField].forEach((facet) => (facet.checked = false));
        }
        setSelectedFacets({ ...selectedFacetsTemplate });
        setFacetFilterData({ ...newFacetObj });
      }
    } else {
      setIsLoading(true);
      setList([]);
      setNoDataBoo({
        noDataObj: searchResult?.response?.data?.spellcheck,
        noData: true,
      });
    }
  };

  //Manage LcsPagination State
  const currentPaginatedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return list.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, list]);

  const LcsPaginationData = {
    content: {
      currentPage: currentPage,
      totalCount: list.length,
      PageSize: PageSize,
    },
    actions: [
      {
        order: 1,
        display: "Page Change",
        action: (page) => setCurrentPage(page),
      },
    ],
  };

  const onFacetChangeHandler = (facetName, title) => {
    !isNullOrUndefined(facetFilterData) &&
      facetFilterData[title].map((item, index) => {
        if (item.facetName === facetName) {
          item.checked = !item.checked;

          if (item.checked === true) {
            selectedFacets[title].push({
              field_name: title,
              field_value: item.facetName,
              field_conjunction: "OR",
            });
          } else if (item.checked === false) {
            // remove it to selectedFacets
            let index = selectedFacets[title].findIndex(
              (facet) => facet.field_value === item.facetName
            );
            if (index > -1) {
              // facet not found
              selectedFacets[title].splice(index, 1);
            }
          }
        }
        return item;
      });
    getSearchResult(router.query.search, true);
    setSelectedFacets({ ...selectedFacets });
    setFacetFilterData({ ...facetFilterData });
  };

  // set or get query params
  useEffect(() => {
    if (router) {
      if (router.query.search) {
        setSearchTerm(router.query.search);
      }
    }
    getSearchResult(router.query.search, false);
  }, [searchTerm, router]);

  useEffect(() => {
    setTimeout(() => {
      setSortDropDown(false);
    }, 5000);
  }, [sortDropDown]);

  useEffect(() => {
    setSearchTerm(router.query.search);
  }, [router]);

  useEffect(() => {
    getSearchResult(router.query.search, true, false);
  }, [sortKey]);

  return (
    <div className="bg-white mt-8">
      <div>
        <div className="relative z-40" role="dialog" aria-modal="true">
          {filterSideNav && (
            <div className="fixed inset-0 flex bg-black bg-opacity-25">
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setFilterSideNav(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      arialHidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  {!isNullOrUndefined(facetFilterData) &&
                    Object.keys(facetFilterData).map((facet, index) => {
                      return (
                        <FacetFilter
                          key={facet + index}
                          type={"checkbox"}
                          title={facet}
                          data={facetFilterData[facet]}
                          maxShow={5}
                          preset={true}
                          onChangeHandler={onFacetChangeHandler}
                        />
                      );
                    })}
                </form>
              </div>
            </div>
          )}
        </div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          {/* {
            <Breadcrumb
              content={[
                { id: 0, name: "Home", href: "/" },

                { id: 1, name: searchTerm, href: "/" },
              ]}
            />
          } */}
          <div className="flex items-baseline justify-between py-1">
            <div className="">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {`"${searchTerm}"`}
              </h1>
              <span>{`${list.length} results`}</span>
            </div>
            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    id="dropdownDefault"
                    data-dropdown-toggle="dropdown"
                    className="bg-blue-800 focus:ring-4 focus:outline-none rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-zinc-900 text-white focus:ring-white"
                    type="button"
                    onClick={() => setSortDropDown(!sortDropDown)}
                  >
                    {sortKey.name ? sortKey.name : "Featured"}
                    <svg
                      className="ml-2 w-4 h-4"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>

                    {/* sort filter drop down */}
                    {sortDropDown && (
                      <div
                        id="dropdown"
                        className="absolute bg-zinc-900 z-10 w-36 rounded shadow top-12 -right-4"
                      >
                        <ul className="py-1" aria-labelledby="dropdownDefault">
                          {sortDropDownArr.map((item) => {
                            return (
                              <li
                                key={item.name}
                                className="focus:ring-white py-2"
                                onClick={() =>
                                  setSortKey({
                                    name: item.name,
                                    value: item.value,
                                  })
                                }
                              >
                                {item.name}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                {/* <!-- Heroicon name: mini/squares-2x2 --> */}
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setFilterSideNav(true)}
              >
                <span className="sr-only">Filters</span>
                {/* <!-- Heroicon name: mini/funnel --> */}
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            {/* selected facets badges */}
            {!isNullOrUndefined(selectedFacets) &&
              Object.keys(selectedFacets).map((facetParent) => {
                if (facetParent.length > 0) {
                  return selectedFacets[facetParent].map((facet) => {
                    return (
                      <button
                        key={facet}
                        type="button"
                        className="inline-flex items-center text-sm rounded-3xl p-2.5 h-8 border border-slate-500 border-solid hover:bg-blue-800 dark:hover:bg-blue-300 mx-2"
                        data-dismiss-target="#badge-dismiss-default"
                        aria-label="Remove"
                        onClick={() =>
                          onFacetChangeHandler(
                            facet.field_value,
                            facet.field_name
                          )
                        }
                      >
                        {facet.field_value}
                        <svg
                          aria-hidden="true"
                          className="w-3.5 h-4 mt-0.5 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    );
                  });
                }
              })}
            <div className="grid grid-cols-1 gap-y-10 gap-x-4 lg:grid-cols-5">
              {/* <!-- Filters --> */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {!isNullOrUndefined(facetFilterData) &&
                  Object.keys(facetFilterData).map((facet) => {
                    return (
                      <FacetFilter
                        key={facet}
                        type={"checkbox"}
                        title={facet}
                        data={facetFilterData[facet]}
                        maxShow={5}
                        preset={true}
                        onChangeHandler={onFacetChangeHandler}
                      />
                    );
                  })}
              </form>

              {/* <!-- Product grid --> */}
              <div className="grid lg:col-span-4">
                <div className="px-2">
                  {names &&
                    names.map((name, index) => (
                      <span
                        key={index}
                        id={`badge-dismiss-${name}`}
                        className={`inline-flex items-center py-1 px-2 mr-2 text-sm font-medium text-blue-800 bg-blue-100 border rounded mb-px dark:bg-blue-200 dark:text-blue-800 ${
                          facetClose[name] ? `hidden` : ``
                        }`}
                      >
                        <LcsLink
                          href={`${href}/?query=${name}`}
                          content={name}
                        />
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-300 dark:hover:text-blue-900"
                          data-dismiss-target="#badge-dismiss-default"
                          aria-label="Remove"
                          onClick={() =>
                            setFacetClose({ ...facetClose, [name]: !badgeBoo })
                          }
                        >
                          <svg
                            aria-hidden="true"
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                  {!isLoading
                    ? ""
                    : noDataBoo.noData && (
                        <div>
                          <p>No Search Results, found.</p>
                          <p>Did you mean?</p>
                          {/* {noDataBoo?.noDataObj?.suggestions[0]} */}
                          <ul>
                            {noDataBoo?.noDataObj?.suggestions[1]?.suggestion.map(
                              (suggestion) => (
                                <li
                                  key={suggestion.word}
                                  className="cursor-pointer"
                                  onClick={() =>
                                    router.push(
                                      `/search/?search=${suggestion.word}`
                                    )
                                  }
                                >
                                  {suggestion.word}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                  {currentPaginatedData &&
                    responseHeaders !== null &&
                    currentPaginatedData?.map((item, index) => (
                      <ProductCard
                        fragJSON={item}
                        key={index}
                        data={responseHeaders}
                      />
                    ))}
                </div>
                <LcsPagination
                  currentPage={LcsPaginationData.content.currentPage}
                  totalCount={LcsPaginationData.content.totalCount}
                  pageSize={LcsPaginationData.content.PageSize}
                  onPageChange={LcsPaginationData.actions[0].action}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Search;
