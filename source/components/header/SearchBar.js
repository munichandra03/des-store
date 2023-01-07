import React, { useState, useEffect, useRef } from "react";
import { LcsLink } from "@/widgets/LcsLink";
import { useRouter } from "next/router";
import { Icons } from "@/consts/style.consts";
import API from "@/utils/httputils";
import config from "../../config.json";
import formatMessage from "format-message";
import { isNullOrUndefined } from "@/utils/index";
import { LcsButton } from "@/widgets/LcsButton";

const instanceMap = [
  { collection: "NewCommerceSolr", tenant: "ncs" },
  { collection: "KamanSolr", tenant: "kcs" },
  { collection: "BBBCommerceSolr", tenant: "bbb" },
  { collection: "PrideCommerceSolr", tenant: "pcs" },
  { collection: "WineCommerceSolr", tenant: "wcs" },
  { collection: "DPFCommerceSolr", tenant: "dpf" },
  { collection: "AutoCommerceSolr", tenant: "acs" },
];

let currSolrColl = API.getSolrCollection();

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

let mic;
const isWindow = typeof window !== "undefined";
if (isWindow) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  mic = new SpeechRecognition();

  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-US";
}

export default function SearchComponent() {
  // speech to text
  const [isListening, setIsListening] = useState(false);
  const [listenError, setListenError] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   handleListen();
  // }, [isListening]);

  const handleListen = () => {
    setIsListening(true);
    // if (isListening) {
    //   mic.start();
    //   mic.onend = () => {
    //     console.log("continue..");
    //     mic.start();
    //   };
    // } else {
    //   mic.stop();
    //   mic.onend = () => {
    //     console.log("Stopped Mic on Click");
    //   };
    // }

    mic.start();
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript);
      // .join("");
      console.log(transcript);
      router.push({
        pathname: `/search`,
        query: { search: transcript[0] },
      });
      setIsComponentVisible(false);
      mic.stop();
      setIsListening(false);
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
      mic.onerror = (event) => {
        setListenError(true);
        console.log(event.error);
      };
    };
    setListenError(false);
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);

  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const [tenantId, setTenantId] = useState("ncs");
  const [searchTopProduct, setSearchTopProduct] = useState(null);
  const [searchSuggestion, setSearchSuggestion] = useState([]);

  useEffect(() => {
    let solrCollection = API.getSolrCollection();
    let tenant = instanceMap.filter(
      (app) => app.collection === solrCollection
    )[0];
    setTenantId(tenant);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
    if (router.asPath.includes("search")) {
      if (router.query.search) {
        setSearchTerm(router.query.search);
        setIsSearch(true);
      }
    } else {
      setSearchTerm("");
    }
  }, [router]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push({
        pathname: `/search`,
        query: { search: searchTerm },
      });
      setIsComponentVisible(false);
    }
  };

  const searchResult = async (txtVal) => {
    const fetchedData = await API.getLogSearchService(
      formatMessage(config.apiUrlData.suggest[API.getSysEnv()].part_url, {
        collectionId: currSolrColl,
        searchTerm: txtVal,
      })
    );
    // setSearchData(fetchedData.response.data);
    setSearchSuggestion((searchSuggestion) =>
      fetchedData.response.data?.spellcheck?.suggestions.length > 0
        ? fetchedData.response.data?.spellcheck?.suggestions[1]?.suggestion
        : [...searchSuggestion]
    );
    setSearchTopProduct(
      fetchedData.response.data?.response?.docs.length > 0 &&
        fetchedData.response.data?.response?.docs[0]
    );
  };

  useEffect(() => {
    if (searchTerm.length > 3) {
      searchResult(searchTerm.toLowerCase());
    }
  }, [searchTerm]);

  const handleSearchLink = (payload, type) => {
    if (type === "product") {
      router.push(
        `/${tenantId.tenant}/pdp/${encodeURIComponent(
          payload.Brand
        )}/${encodeURIComponent(payload.Title)}/${payload.id}`
      );
    }
    if (type === "keyword") {
      router.push({
        pathname: `/search`,
        query: { search: payload.word },
      });
    }
    setIsComponentVisible(false);
  };

  return (
    <form className="" ref={ref}>
      <div className="relative">
        <LcsButton
          action={() => {
            router.push({
              pathname: `/search`,
              query: { search: searchTerm },
            });
            setIsComponentVisible(false);
          }}
          uistyle="absolute top-1/4 left-4"
          IconName={Icons.Search}
        />
        <LcsButton
          action={() => handleListen()}
          // action={() => setIsListening((prevState) => !prevState)}
          uistyle="absolute top-1/4 right-4"
          IconName={Icons.Mic}
        />
        <input
          type="text"
          placeholder="Search"
          className="md:w-[730px] h-[46px] w-full py-2 pl-14 pr-44 ml-1 text-gray-500 border-[#E4E4E4] rounded-md outline-none bg-[#F1F5F9]"
          value={
            isSearch === false
              ? !isNullOrUndefined(router.query.facets)
                ? ""
                : router.query.search
              : !isNullOrUndefined(router.query.facets)
              ? ""
              : searchTerm
          }
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          onClick={() => setIsComponentVisible(true)}
        />
      </div>
      {isComponentVisible && (
        <div className="absolute z-40 md:w-[730px] bg-white">
          <ul className=" text-gray-900 w-full">
            {searchTopProduct && (
              <li
                className="px-6 py-2 hover:bg-slate-100 w-full cursor-pointer"
                onClick={() => handleSearchLink(searchTopProduct, "product")}
              >
                <span className="text-2xl font-bold m-4">Top product</span>
                <div className="flex">
                  <img
                    src={searchTopProduct.ImageUrl}
                    alt={searchTopProduct.Title}
                    width="100"
                    height="100"
                  />
                  <p>{searchTopProduct.Title}</p>
                </div>
              </li>
            )}
            {searchSuggestion.map((searchVal, i) => (
              <li
                key={i}
                className="text-base px-6 py-2 hover:bg-slate-100 w-full cursor-pointer"
                onClick={() => handleSearchLink(searchVal, "keyword")}
              >
                {searchVal.word}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
