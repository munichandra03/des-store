import React, { useState, useEffect } from "react";
import { headerStyleConsts, Icons } from "@/consts/style.consts";
import SearchComponent from "./SearchBar";
import { LcsLink } from "@/widgets/LcsLink";
import authentication from "../authentication/authentication.js";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import API from "@/utils/httputils";
import searchapi from "@/utils/http.search.utils";
import config from "../../config.json";
import formatMessage from "format-message";
import { useSession, signIn, signOut } from "next-auth/react";
import { LcsLinkBtn } from "@/widgets/LcsLinkBtn";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incrementByNumber } from "@/redux/store/slices/cartSlice";
import { getIntCharacteristicsfromLS } from "../../utils/storageutils";

const index = ({ data, authCookie }) => {
  const { data: session, status } = useSession();
  const [selectedDropdown, updateSelectedDropdown] = useState("");
  const [mobileMenu, updateMobileMenu] = useState(false);
  const [result, updateResult] = useState([]);
  const router = useRouter();
  const [allMenusLists, setAllMenusList] = useState([]);
  const [showAdvt, setShowAdvt] = useState(0);
  const [brandApiResult, setBrandApiResult] = useState([]);

  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.total);
  const currSolrColl = API.getSolrCollection();
  const getCartCounts = () => {
    let solrCollection = API.getSolrCollection();
    API.getLogSearchService(
      formatMessage(config.apiUrlData.viewCart.part_url, {
        collection: solrCollection,
        typecart: "C",
      })
    ).then((data) => setCart(data.response));
  };

  const getmenu = async () => {
    let currSolrColl = API.getSolrCollection();
    if (Object.keys({}).length === 0) {
      try {
        // setState({ isLoading: true });
        const menuTree = await API.getXPService(
          config.apiUrlData.menuTree.part_url
        );
        setAllMenusList(menuTree.response.data.wrapperArr);
        // console.log(menuTree.response.data.wrapperArr);
        let prefix = searchapi.getSearchPrefix();
        let suffix = searchapi.getSearchSuffix();
        //"logsearch/"+ currSolrColl + "/";
        const categoryResult = await API.getLogSearchService(
          prefix +
            config.apiUrlData.categoryTree[API.getSysEnv()].part_url +
            suffix
          // formatMessage(config.apiUrlData.categoryTree[api.getSysEnv()].part_url, {
          //   collectionId:currSolrColl,
          // }),
        );
        updateResult(
          categoryResult.response.data.facet_counts.facet_pivot.categorylist.slice(
            0,
            8
          )
        );
        const brandResult = await API.getLogSearchService(
          formatMessage(
            config.apiUrlData.facetFields[API.getSysEnv()].part_url,
            {
              collectionId: currSolrColl,
              facetTerm: "Brand_str",
            }
          )
        );

        setBrandApiResult(
          brandResult.response.data.facet_counts.facet_fields.Brand_str
        );
        // this.setState({
        //   isLoading: false,
        //   menuTree: menuTree.response.data,
        //   catMenu: categoryResult.response.data,
        //   brandMenu: brandResult.response.data,
        // });
        // onMenuLoad(
        //   menuTree.response.data,
        //   categoryResult.response.data,
        //   brandResult.response.data
        // );
      } catch (e) {
        console.log(e);
        // this.setState({
        //   isLoading: false,
        // });
      }
    } else {
      // this.setState({
      //   menuTree: navigationMenu,
      //   catMenu: categoryMenu,
      //   brandMenu: brandMenu,
      // });
    }
  };
  function openDropDownMenu(e, type) {
    e.preventDefault();
    updateSelectedDropdown(type === selectedDropdown ? "" : type);
  }

  const handleMenuLeftBar = (e) => {
    document.querySelector("#toggle-menu").classList.toggle("hidden");
    document.querySelector("#toggle-menu-bg").classList.toggle("hidden");
    document.body.classList.toggle(`overflow-hidden`);
  };

  const handlePromoSearch = (menusItems, paramName) => {
    props.onCatSearchSubmit({
      brand: [],
      l1cat: [],
      l2cat: [],
    });
    props.onAllSearchSubmit(paramName);
    props.history.push(`/deals/dealParam=${menusItems}/search=${paramName}`);
  };

  useEffect(() => {
    setShowAdvt(getIntCharacteristicsfromLS("customer_rank"));
    // handle guest user
  }, []);

  useEffect(() => {
    getmenu();
    if (status === "authenticated") {
      getCartCounts();
    } else {
      API.getGuestUser();
      console.log("guset user");
    }
  }, [status]);

  //count set for header cart
  useEffect(() => {
    if (status === "authenticated") {
      if (cart.data) {
        const arrQtyVal = cart.data[0]?.products?.map(
          (item) => item.product_qty
        );

        const initialValue = 0;
        const sumWithInitial = arrQtyVal?.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue
        );
        dispatch(incrementByNumber(sumWithInitial));
      }
    }
  }, [cart]);

  function logout() {
    authentication.clearToken();
    Cookies.remove("loggedIn");
    Cookies.remove("token");
    router.push("/signin");
  }

  function dropdownMobileMenu(item, i) {
    document
      .querySelector("#submenu" + item.replace(/[^A-Z0-9]/gi, "_") + i)
      .classList.toggle("hidden");
    document
      .querySelector("#arrow" + item.replace(/[^A-Z0-9]/gi, "_") + i)
      .classList.toggle("rotate-90");
  }

  function renderCategories(items) {
    const categories = [];
    items.map((a) => {
      // if (categories.indexOf(a.category) < 0 && a.category !== "imgoverview") {
      categories.push(a.value);
      // }
    });

    return (
      <>
        {authCookie &&
          categories.map((item, i) => (
            <div key={i}>
              <p className={headerStyleConsts.MDCate()}>{item}</p>
              <ul role="list" className={headerStyleConsts.MDCateList()}>
                {items
                  .filter((a) => a.category === item)
                  .map((child, j) => (
                    <li key={j} className={headerStyleConsts.MDCateListItem()}>
                      {/* <a
                        href={child.link}
                        className={headerStyleConsts.MDCateListItemLink()}
                      >
                        {child.value}
                      </a> */}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </>
    );
  }

  function renderDropDown(item) {
    return (
      <div className={headerStyleConsts.MD()}>
        <div className={headerStyleConsts.MDShadow()} aria-hidden="true" />
        <div className={headerStyleConsts.MDContainer()}>
          <div className={headerStyleConsts.MDContainerBox()}>
            <div className={headerStyleConsts.MDPanel()}>
              <div className={headerStyleConsts.MDChild()}>
                {item.pivot.map((child, j) => (
                  <div key={j} className={headerStyleConsts.MDImgOverview()}>
                    <div className={headerStyleConsts.MDImgChild()}>
                      <img
                        src={child.img}
                        alt={child.description}
                        className={headerStyleConsts.MDImgChildImg()}
                      />
                    </div>
                    <a
                      href={child.link}
                      className={headerStyleConsts.MDImgChildLink()}
                    >
                      {/* <span
                        className="absolute inset-0  z-10 font-bold"
                        aria-hidden="true"
                      /> */}
                      <p className="font-bold cursor-pointer text-indigo-700 hover:text-slate-900">
                        {child.value}
                      </p>
                      <div
                        aria-hidden="true"
                        className={headerStyleConsts.MDImgChildBtn()}
                      >
                        {child?.pivot?.slice(-10)?.map((child, index) => (
                          <LcsLink href="/" key={index}>
                            <p className="py-1 cursor-pointer hover:font-extrabold">
                              {child.value}
                            </p>
                          </LcsLink>
                        ))}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              {/* <div className={headerStyleConsts.MDChildOverview()}>
                {renderCategories(item.pivot)}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function megaMenuSideBar(results) {
    return (
      <>
        <div
          className="hidden bg-black bg-opacity-70 fixed top-0 left-0 h-screen w-screen flex-col z-50 overflow-hidden"
          id="toggle-menu-bg"
          // onClick={handleMenuLeftBar}
        >
          <aside
            className="hidden sm:w-96 bg-white fixed top-0 left-0 h-screen w-screen flex-col z-50 overflow-auto"
            id="toggle-menu"
          >
            <div className="flex flex-col h-screen">
              <header className="px-10 py-3 bg-slate-800 text-white">
                Hello,{" "}
                {status === "authenticated" &&
                  session.user.firstName.split(" ")[0]}
              </header>
              <main className="flex-1 overflow-y-auto px-6 py-3">
                <nav className="space-y-8 text-sm">
                  {results.map((item, i) => (
                    <div key={i}>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => dropdownMobileMenu(item.value, i)}
                      >
                        <div className="flex justify-between w-full items-center text-black">
                          <span className="ml-4 font-bold capitalize">
                            {item.value}
                          </span>
                          <svg
                            id={`arrow${item.value.replace(
                              /[^A-Z0-9]/gi,
                              "_"
                            )}${i}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-slate-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </div>
                      </div>
                      {sideBarMenuMobile(item.value, item, i)}
                    </div>
                  ))}
                </nav>
              </main>
            </div>
          </aside>
          <button className="z-50 absolute left-96 top-3">
            <div
              id="close"
              onClick={handleMenuLeftBar}
              className="flex flex-col items-end justify-between pl-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
          <div
            className="left-96 z-40 absolute w-full h-full bg-black bg-opacity-30"
            onClick={handleMenuLeftBar}
          ></div>
        </div>
      </>
    );
  }

  function toggleMenu(e) {
    e.preventDefault();
    updateMobileMenu(!mobileMenu);
  }

  const sideBarMenuMobile = (itemName, item, i) => {
    return (
      <div
        className="hidden text-left text-sm pl-4 mt-1 w-full mx-auto text-slate-700 font-bold"
        id={`submenu${itemName.replace(/[^A-Z0-9]/gi, "_")}${i}`}
      >
        {item.pivot.map((child, j) => (
          <div key={j}>
            <div
              key={`${child.value.replace(/[^A-Z0-9]/gi, "_")}${j}`}
              className="p-2 mt-1 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
              onClick={() =>
                dropdownMobileMenu(child.value.replace(/[^A-Z0-9]/gi, "_"), j)
              }
            >
              <div className="flex justify-between w-full items-center text-black">
                <span className="text-[15px] ml-4 text-gray-600 font-thin capitalize">
                  {child.value}
                </span>
                <svg
                  id={`arrow${child.value.replace(/[^A-Z0-9]/gi, "_")}${j}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 rotate-0 text-slate-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
            <div
              className="hidden text-left text-sm mt-2 w-3/5 mx-auto text-gray-600 font-thin"
              id={`submenu${child.value.replace(/[^A-Z0-9]/gi, "_")}${j}`}
            >
              {child?.pivot?.slice(-10).map((brand, index) => (
                <h1
                  className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
                  key={index}
                  onClick={() => {
                    facetsSearch([
                      {
                        field_name: "Brand",
                        field_value: brand.value,
                        field_conjunction: "OR",
                      },
                      {
                        field_name: "L1Category",
                        field_value: child.value,
                        field_conjunction: "OR",
                      },
                      {
                        field_name: "L2Category",
                        field_value: item.value,
                        field_conjunction: "OR",
                      },
                    ]);
                    handleMenuLeftBar();
                  }}
                >
                  {brand.value}
                </h1>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const facetsSearch = (facetObj) => {
    router.push({
      pathname: "/search",
      query: {
        search: `${facetObj[0].field_value}`,
        // search: `${facetObj[0].field_name}=${facetObj[1].field_value}`,
        facets: JSON.stringify(facetObj),
      },
    });
  };

  const facetsDeals = (facetObj) => {
    router.push({
      pathname: "/deals",
      query: {
        dealParam: `${facetObj[0].field_value}`,
        // search: `${facetObj[0].field_name}=${facetObj[1].field_value}`,
        // facets: JSON.stringify(facetObj),
      },
    });
  };

  return (
    <div className="bg-white">
      {mobileMenu ? (
        <div className={headerStyleConsts.MM()} role="dialog" aria-modal="true">
          <div className={headerStyleConsts.MMPosition()} />
          <div className={headerStyleConsts.MMContainer()}>
            <div className={headerStyleConsts.MMWrapper()}>
              {/* profile section start */}
              <header className={headerStyleConsts.MMHeader()}>
                <img
                  className={headerStyleConsts.MMPProfileIcon()}
                  src="https://randomuser.me/api/portraits/men/79.jpg"
                  alt="Dr. Jessica James"
                />
                <div className="ml-5">
                  <h1 className="text-white tracking-wide text-lg">
                    Marie James
                  </h1>
                  <p className="text-gray-300 tracking-wider text-sm">
                    Profile
                  </p>
                </div>
                <div className="absolute right-3 top-3">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  >
                    <span className="sr-only ">Close menu</span>
                    <Icons.Close varient="white" />
                  </button>
                </div>
              </header>
              {/* profile section end */}

              <>
                {result.length === 0
                  ? "loading"
                  : result.map((item, i) => (
                      <div key={i}>
                        <div
                          className="p-2 flex items-center px-4 cursor-pointer"
                          onClick={() => dropdownMobileMenu(item.value, i)}
                        >
                          <div className="flex justify-between w-full items-center text-black">
                            <span className="ml-4 font-bold capitalize">
                              {item.value}
                            </span>
                            <svg
                              id={`arrow${item.value.replace(
                                /[^A-Z0-9]/gi,
                                "_"
                              )}${i}`}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-slate-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </div>
                        </div>
                        {sideBarMenuMobile(item.value, item, i)}
                      </div>
                    ))}
              </>

              {/* <div className={headerStyleConsts.MMLinksGroup()}>
                {data?.header?.menu
                  ?.filter((a) => !a.children)
                  .map((item, i) => (
                    <div key={i} className="flow-root">
                      <a
                        href={item.link}
                        className={headerStyleConsts.MMLink()}
                      >
                        {item.value}
                      </a>
                    </div>
                  ))}
              </div> */}

              <div className={headerStyleConsts.MMrtGroup()}>
                {status === "authenticated" ? (
                  <div className="py-3 border-2 border-brown rounded-md text-center">
                    <a onClick={signOut} className="uppercase">
                      Signout
                    </a>
                  </div>
                ) : (
                  data?.header?.rightMenu
                    ?.filter((a) => a.type === "group1")
                    .map((item, i) => (
                      <div className="px-4" key={i}>
                        {item.value == "Sign in" ? (
                          <p className="mb-4">Sign in to access your account</p>
                        ) : (
                          <p className="mb-4">
                            Dont have an account? Create new
                          </p>
                        )}
                        <div
                          key={i}
                          className={
                            item.value == "Sign in"
                              ? "py-3 border-2 border-brown rounded-md text-center"
                              : "py-3 rounded-md border-2 bg-brown text-center text-white"
                          }
                        >
                          <LcsLink
                            href={item.link}
                            classes="uppercase"
                            content={item.value}
                          />
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <header className={headerStyleConsts.bg({})}>
        {/* <LcsInfobox
          button={data?.header?.topBanner?.button}
          varient={data?.header?.topBanner?.varient}
          content={data?.header?.topBanner?.content}
        /> */}

        {currSolrColl !== "DocCommerceSolr" && showAdvt >= 4 && (
          <div className={headerStyleConsts.topBannerBG({})}>
            Get 10% on Everything : Use code X25JUNE21 at checkout{showAdvt}
          </div>
        )}

        <nav aria-label="Top" className={headerStyleConsts.nav()}>
          <div className={headerStyleConsts.navStyle()}>
            <div className={headerStyleConsts.navbarAlign()}>
              <button
                onClick={toggleMenu}
                type="button"
                className={headerStyleConsts.navMenuBtn()}
              >
                <span className="sr-only">Open menu</span>
                <Icons.Menu />
              </button>

              <div className={headerStyleConsts.logoInfo()}>
                <span className="sr-only">Logixal</span>
                <LcsLink href={data?.properties?.link}>
                  <img
                    className={headerStyleConsts.logoImg()}
                    src={data?.properties?.logo}
                    alt={data?.properties?.name}
                  />
                </LcsLink>
              </div>
              <div>
                <div className="hidden md:flex lg:flex lg:items-center lg:justify-end">
                  <SearchComponent />
                </div>
              </div>
              <div className={headerStyleConsts.menuRight()}>
                {status === "authenticated" ? (
                  data?.header?.rightMenu
                    ?.filter((a) => a.type === "account")
                    .map((item, i) => (
                      <div key={i} className="hidden lg:flex  lg:items-center">
                        <div className={headerStyleConsts.menuGroupIcons()}>
                          <div className="group">
                            <button
                              className={headerStyleConsts.menuLoginLists()}
                            >
                              <label className="font-semibold">
                                Hello, {session.user.firstName.split(" ")[0]}
                              </label>{" "}
                              <svg
                                className="w-4 h-4 ml-1"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>

                            <div className="hidden z-40 absolute group-hover:block w-40 bg-white">
                              <ul className="bg-white py-1 text-sm text-slate-700">
                                <li className="block capitalize px-4 py-2 hover:bg-slate-50 text-sm">
                                  <LcsLink
                                    href={item.link}
                                    content="Your Account"
                                  />
                                </li>
                                <li className="block capitalize px-4 py-2 hover:bg-slate-50 text-sm">
                                  <LcsLink href="/orders" content="Orders" />
                                </li>
                              </ul>
                              <div className="py-1">
                                <div className="block capitalize px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                  {status === "authenticated" &&
                                    data?.header?.rightMenu
                                      ?.filter((a) => a.type === "logout")
                                      .map((item, i) => (
                                        <div
                                          key={i}
                                          className="ml-1 lg:mx-1 hidden lg:flex lg:items-start cursor-pointer"
                                        >
                                          <a
                                            onClick={signOut}
                                            className="text-left cursor-pointer"
                                          >
                                            <label className="cursor-pointer text-rose-600 text-sm">
                                              Logout
                                            </label>
                                          </a>
                                        </div>
                                      ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="sr-only">items in cart, view bag</span>
                      </div>
                    ))
                ) : (
                  <div className="ml-1 lg:mx-2 hidden lg:flex  lg:items-center">
                    <div className={headerStyleConsts.menuGroupIcons()}>
                      <a
                        onClick={signIn}
                        className="text-center cursor-pointer"
                      >
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mx-auto"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                          </svg>
                          <div className="text-[14px] ml-1.5 font-normal">
                            SignIn
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                )}

                {data?.header?.rightMenu
                  ?.filter((a) => a.type === "cart")
                  .map((item, i) => (
                    <div key={i} className="ml-20 flow-root lg:mx-1 ">
                      <div className={headerStyleConsts.menuGroupIcons()}>
                        <LcsLinkBtn
                          key={i}
                          href={item.link}
                          content={
                            <div className="flex">
                              <div className="relative text-center">
                                <div
                                  className={headerStyleConsts.cartSection()}
                                >
                                  {(products == undefined)? 0 : products}
                                </div>
                                <img
                                  alt="cart"
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADuSURBVHgB7ZXBEYIwEEU/ePFoB9iBJWAHaAXYAWMFagWU4FgBdoBWIN68YQd49Ka7ExDIgCFKbryZfwj5kOyfDbEABKQF6ixJD/RERnpJCtATI9KN9CQlpEmuMekAA6xQVuHAALz7IrINDBHnC1xgCBdlTC7+xG54dkXZonMYYg9RQQZD9BpTG0U3hTBEiCEmwlLM82neQrTtEXrwOzuVqRrTL/JUFTARxD9Klztp3dXMC/i8ow6eGTSZklJ8v4zYU724fGjgoZ5r2uAJJE9UTNjq7+MsjU8NnkQaa9/nXEUMcR6cFo+fe7i1P03xBhlhUpETcLdWAAAAAElFTkSuQmCC"
                                />
                              </div>
                              <div className="text-[14px] ml-1.5 font-normal">
                                Cart
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  ))}
                {data?.header?.rightMenu
                  ?.filter((a) => a.type === "wishlist")
                  .map((item, i) => (
                    <div key={i} className="ml-1 flow-root lg:ml-1 ">
                      <div className={headerStyleConsts.menuGroupIcons()}>
                        <LcsLinkBtn
                          key={i}
                          href={item.link}
                          content={
                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 mx-auto"
                                alt="wishlist"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                              </svg>
                              <div className="text-[14px] ml-1.5 font-normal">
                                Wishlist
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  ))}

                {/* {
                    data?.header?.rightMenu
                    ?.filter((a) => a.type === "currency")
                    .map((item, i) => (
                      <div key={i} className="ml-1 flow-root lg:ml-1">
                        <div className="group-m-1 flex items-center p-1">

                          <a href="#" className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 m-2"
                              alt="dollar"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <label className="text-xs">Dollar</label>
                          </a>
                        </div>
                      </div>
                    ))
                  } */}
              </div>
            </div>

            {/**Search view only for small screen start*/}
            <div className="relative sm:flex  sm:items-center sm:justify-end sm:space-x-6 mb-3 pb-3 mt-3 md:hidden lg:hidden xl:hidden 2xl:hidden">
              <SearchComponent />

              <ul className="mx-3 bg-white border-slate-200 rounded-lg space-x-2 mt-3 text-bold font-bold border-0">
                {allMenusLists &&
                  allMenusLists.map((menusItems, i) =>
                    menusItems.paramFrag == "brandMenu" ? (
                      <li className="cursor-pointer group inline-block" key={i}>
                        <button className="flex">
                          <label className="flex relative cursor-pointer">
                            {menusItems.paramName}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 mt-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </label>
                        </button>
                        <ul className="hidden z-40 absolute group-hover:block bg-white py-1 text-sm text-slate-700 dark:text-slate-400">
                          {brandApiResult.map(
                            (item, i) =>
                              typeof item[i] == "string" && (
                                <li
                                  key={i}
                                  className="py-2 px-3 hover:bg-slate-50"
                                  onClick={() => {
                                    facetsSearch([
                                      {
                                        field_name: "Brand",
                                        field_value: item,
                                        field_conjunction: "OR",
                                      },
                                    ]);
                                  }}
                                >
                                  {item}
                                </li>
                              )
                          )}
                        </ul>
                      </li>
                    ) : menusItems.paramFrag != "catergoryMenu" ? (
                      <li
                        key={i}
                        className="cursor-pointer inline-block"
                        onClick={() => {
                          facetsSearch([
                            {
                              field_name: "Brand",
                              field_value: menusItems.paramName,
                              field_conjunction: "OR",
                            },
                          ]);
                        }}
                      >
                        {" "}
                        <span className="text-slate-300 px-2">|</span>{" "}
                        {menusItems.paramName}
                      </li>
                    ) : (
                      ""
                    )
                  )}
              </ul>
            </div>
            {/**Search view only for small screen end*/}
          </div>
          <div className={headerStyleConsts.navigation()}>
            <div className={headerStyleConsts.menuleft()}>
              <ul className={headerStyleConsts.navigationChild()}>
                {allMenusLists &&
                  allMenusLists.map((menusItems, i) =>
                    menusItems.paramFrag == "catergoryMenu" ? (
                      <li key={i} className="pt-5">
                        <button className="flex" onClick={handleMenuLeftBar}>
                          <label className="flex relative cursor-pointer">
                            <Icons.Menu />
                            <span className="ml-2.5">
                              {menusItems.paramName}
                            </span>
                          </label>
                        </button>
                      </li>
                    ) : menusItems.paramFrag == "brandMenu" ? (
                      <li className="cursor-pointer group h-16 hover:bg-white hover:text-slate-700 pt-5">
                        <button className="flex">
                          <label className="flex relative cursor-pointer">
                            {menusItems.paramName}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 mt-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </label>
                        </button>
                        <ul className="hidden z-40 absolute group-hover:block bg-white py-1 text-sm text-slate-700 w-48 mt-4">
                          {brandApiResult.map(
                            (item, i) =>
                              typeof item[i] == "string" && (
                                <li
                                  key={i}
                                  className="py-2 px-3 hover:bg-slate-50"
                                  onClick={() => {
                                    facetsSearch([
                                      {
                                        field_name: "Brand",
                                        field_value: item,
                                        field_conjunction: "OR",
                                      },
                                    ]);
                                  }}
                                >
                                  {item}
                                </li>
                              )
                          )}
                        </ul>
                      </li>
                    ) : (
                      <li
                        className="cursor-pointer pt-5"
                        onClick={() => {
                          facetsDeals([
                            {
                              field_name: "Brand",
                              field_value: menusItems.paramFrag,
                              field_conjunction: "OR",
                            },
                          ]);
                        }}
                      >
                        {menusItems.paramName}
                      </li>
                    )
                  )}
              </ul>
              {megaMenuSideBar(result)}
              <div className={headerStyleConsts.menulinksGroup()}>
                {/* {result.length === 0
                  ? "loading"
                  : result.map((item, i) => (
                      <React.Fragment key={i}> 
                        <div className="group">
                          <div className="flex lg:text-xl ">
                            <LcsButton
                              uistyle={headerStyleConsts.menuDropdown()}
                              content={item.value} 
                            />
                          </div>
                          {renderDropDown(item)} 
                        </div>
                      </React.Fragment>
                    ))} */}
                {/* <button onClick={(e) => openDropDownMenu(e, item.value)}>
                  CATEGORY
                  </button>
                  <button onClick={(e) => openDropDownMenu(e, item.value)}>
                  TOP BRANDS
                  </button>
                  <button onClick={(e) => openDropDownMenu(e, item.value)}>
                  PROMOTIONS
                </button> */}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default index;
