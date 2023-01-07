import React, { useMemo } from "react";
import { CarouselStyles } from "@/consts/style.consts";
import Carousel from "@/widgets/Carosuel";
import data from "../../config/BestSellers.json";
import { useEffect, useState } from "react";
import API from "@/utils/httputils";
import config from "../../config.json";
import formatMessage from "format-message";
import { LcsLink } from "@/widgets/LcsLink";
import ProductQuickView from "./ProductQuickView";
import APP from "@/consts/app.const";
import LcsPagination from "@/widgets/LcsPagination";

let PageSize = APP.ORDERS.PAGINATION.ITEMS_PER_PAGE;

const instanceMap = [
  { collection: "NewCommerceSolr", tenant: "ncs" },
  { collection: "KamanSolr", tenant: "kcs" },
  { collection: "BBBCommerceSolr", tenant: "bbb" },
  { collection: "PrideCommerceSolr", tenant: "pcs" },
  { collection: "WineCommerceSolr", tenant: "wcs" },
  { collection: "DPFCommerceSolr", tenant: "dpf" },
  { collection: "AutoCommerceSolr", tenant: "acs" },
];

function Orders(prodData) {
  //for redux store dispatch
  const intial = [
    {
      id: 1,
      title: "Current orders",
      contentId: "headlessui-tabs-tab-:R2q:",
      ariaControlsId: "headlessui-tabs-panel-:R3a:",
      description: "Test content here first",
      selected: true,
      panel: {
        title: "Product Detials",
        description: prodData?.Description,
        url: prodData?.ImageUrl,
      },
    },
    {
      id: 2,
      title: "Past Orders",
      contentId: "headlessui-tabs-tab-:R4q:",
      ariaControlsId: "headlessui-tabs-panel-:R2l6:",
      description: "Test content here second",
      selected: false,
      panel: {
        title: "Panel Title2",
        description: "No past Orders",
        url: "http://this.test.com",
      },
      children: ``,
    },
    {
      id: 3,
      title: "Cancellerd orders",
      contentId: "headlessui-tabs-tab-:R6q:",
      ariaControlsId: "headlessui-tabs-panel-:R3l6:",
      description: "Test content here third",
      selected: false,
      panel: {
        title: "Panel Title3",
        url: "http://this.test.com",
      },
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [tabState, setTab] = useState(intial);
  const [modalState, setModalState] = useState({
    active: false,
    cancelOrderProduct: null,
    cancelOrder: null,
  });
  const [tenantId, setTenantId] = useState("ncs");
  const [cart, setCart] = useState([]);
  const [openTab, setOpenTab] = useState(1);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastorders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  let solrCollection = API.getSolrCollection();

  const tab = {
    content: tabState,
    orientation: "horizontal",
    action: (e, data) => {
      let foundIndex = tabState.findIndex((x) => x.id == data.id);
      tabState[foundIndex].selected = data.selected;
      return setTab([...tabState]);
    },
  };

  // const cancelOrderModal = (product) => {
  //   console.log("product", product);
  //   setModalOpen(true);
  //   return (
  //     modalOpen && (
  //       <ProductQuickView
  //         content={product}
  //         uiconfig=""
  //         onClose={() => setModalOpen(false)}
  //         openval={modalOpen}
  //       />
  //     )
  //   );
  // };
  useEffect(() => {
    let tenant = instanceMap.filter(
      (app) => app.collection === solrCollection
    )[0];
    setTenantId(tenant);
  }, []);

  // const Top = () => {
  //   let solrCollection = API.getSolrCollection();
  //   if (config.apiUrlData.viewCart !== "Banner") {
  //     API.getLogSearchService(
  //       formatMessage(config.apiUrlData.viewCart.part_url, {
  //         collection: solrCollection,
  //         typecart: "C",
  //       })
  //     );
  //   }
  // };

  // useEffect(() => {
  //   Top();
  // }, []);

  const getProducts = () => {
    API.getLogSearchService(
      formatMessage(config.apiUrlData.currentOrders.part_url, {
        collection: solrCollection,
        typecart: "O",
      })
    ).then((data) => {
      setCurrentOrders(data.response.data);
    });
    // document.body.className = "bg-slate-100";

    API.getLogSearchService(
      formatMessage(config.apiUrlData.cancelledOrders.part_url, {
        collection: solrCollection,
        typecart: "X",
      })
    ).then((data) => setCancelledOrders(data.response.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  //Manage LcsPagination State
  const currentPaginatedData = useMemo(() => {
    let tmpOrders = [];
    openTab === 1
      ? (tmpOrders = currentOrders)
      : openTab === 2
      ? (tmpOrders = pastOrders)
      : openTab === 3
      ? (tmpOrders = cancelledOrders)
      : (tmpOrders = null);
    // openTab === 1 && tmpOrders = currentOrders
    // openTab === 1 && tmpOrders = currentOrders

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (
      tmpOrders.length > 0 && tmpOrders.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, currentOrders]);

  const LcsPaginationData = {
    content: {
      currentPage: currentPage,
      totalCount:
        openTab === 1
          ? currentOrders.length
          : openTab === 2
          ? pastOrders.length
          : openTab === 3
          ? cancelledOrders.length
          : "",
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

  return (
    <>
      <div>
        <div className="flex justify-between  border-b border-gray-300">
          <h1 className="font-semibold text-2xl">Your orders</h1>
        </div>
        {/* <LcsTab
          content={tab.content}
          uiconfig={tab.uiconfig}
          orientation={tab.orientation}
          action={tab.action}
          id={"lcs-tab"}
        /> */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 underline list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0  bg-slate-100  active:bg-slate-300  text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                    (openTab === 1
                      ? "text-black bg-orange-600"
                      : "text-orange-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  CURRENT ORDERS
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 bg-slate-100  active:bg-slate-300  text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-black bg-orange-600"
                      : "text-orange-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  PAST ORDERS
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 bg-slate-100  active:bg-slate-300  text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-black bg-orange-600"
                      : "text-orange-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  CANCELLED ORDERS
                </a>
              </li>
            </ul>
            <div className=" relative flex flex-col min-w-0 break-words bg-white mx-14 shadow-lg rounded">
              <div className="px-4  flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    {currentPaginatedData &&
                      currentPaginatedData.map((order, index) => (
                        <div className="my-4" key={index}>
                          <div className="h-14 my-2 bg-slate-200">
                            <span className="m-4">Order Placed:</span>
                            <span>{order.created_date}</span>
                            <span className="m-4">
                              Order Total: {order.cart_total}
                            </span>
                            <span className="m-4">
                              Shipped To: {order.shipping_address.city}
                            </span>
                            <span className="m-4">
                              Order #{order.order_id}{" "}
                            </span>
                            <span className="m-4 text-right">
                              View Order Details | Invoice
                            </span>
                          </div>
                          {order.products.map((product, index) => (
                            <div
                              key={index}
                              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b border-gray-300"
                            >
                              <div className="flex w-3/5">
                                <div className="w-20">
                                  <LcsLink
                                    key={index}
                                    href={`/${
                                      tenantId.tenant
                                    }/pdp/${encodeURIComponent(
                                      product.product_category
                                    )}/${encodeURIComponent(
                                      product.product_title
                                    )}/${product.product_id}`}
                                  >
                                    <img
                                      className="h-24"
                                      src={product.product_img_url}
                                      alt=""
                                    />
                                  </LcsLink>
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                  <span className="font-bold text-lg">
                                    <LcsLink
                                      key={index}
                                      href={`/${
                                        tenantId.tenant
                                      }/pdp/${encodeURIComponent(
                                        product.product_category
                                      )}/${encodeURIComponent(
                                        product.product_title
                                      )}/${product.product_id}`}
                                      content={product.product_title}
                                    />
                                  </span>
                                  {/* <span classNameName="text-red-500 text-xs">Apple</span> */}
                                  <div className="flex flex-nowrap my-2 mr-8">
                                    <div className="mr-8">
                                      <LcsLink
                                        key={index}
                                        href={`/${
                                          tenantId.tenant
                                        }/pdp/${encodeURIComponent(
                                          product.product_category
                                        )}/${encodeURIComponent(
                                          product.product_title
                                        )}/${product.product_id}`}
                                      >
                                        <button className="bg-slate-300 hover:bg-slate-400 font-bold py-2 px-4 rounded inline-flex items-center">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                            <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                                            <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                          </svg>
                                          <span>Buy Again</span>
                                        </button>
                                      </LcsLink>
                                    </div>

                                    <div className="mr-8">
                                      {product.product_order_status ===
                                      undefined ? (
                                        <></>
                                      ) : product.product_order_status ===
                                        "CANCELLED" ? (
                                        <></>
                                      ) : (
                                        <>
                                          <button
                                            className="bg-red-500 hover:bg-red-500 font-bold py-2 px-4 rounded inline-flex items-center"
                                            onClick={() =>
                                              setModalState({
                                                active: true,
                                                cancelOrder: order,
                                                cancelOrderProduct: product,
                                              })
                                            }
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              strokeWidth="1.5"
                                              stroke="currentColor"
                                              className="w-6 h-6"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                              />
                                            </svg>
                                            Cancel
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center w-1/5">
                                QTY:
                                <input
                                  className="mx-2 text-lg text-center w-8"
                                  type="text"
                                  value={product.product_qty}
                                />
                              </div>
                              <span className="text-center w-1/5 font-semibold text-lg">
                                ${product.product_sale_price}
                              </span>
                              <span className="text-center w-1/5 font-semibold text-lg">
                                Status: {product.product_order_status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <p className="font-bold">No Past Orders</p>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    {currentPaginatedData &&
                      currentPaginatedData.map((order, index) => (
                        <div className="my-4" key={index}>
                          <div className="h-14 my-2 bg-slate-200">
                            <span className="m-4">
                              Order Placed: {order.created_date}
                            </span>
                            <span className="m-4">
                              Order Total: {order.cart_total}
                            </span>
                            <span className="m-4">
                              Shipped To: {order.shipping_address.city}
                            </span>
                            <span className="m-4">
                              Order #{order.order_id}{" "}
                            </span>
                            <span className="m-4 text-right">
                              View Order Details | Invoice
                            </span>
                          </div>
                          {order.products.map((product, index) => (
                            <div
                              key={index}
                              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b border-gray-300"
                            >
                              <div className="flex w-3/5">
                                <div className="w-20">
                                  <LcsLink
                                    key={index}
                                    href={`/${
                                      tenantId.tenant
                                    }/pdp/${encodeURIComponent(
                                      product.product_category
                                    )}/${encodeURIComponent(
                                      product.product_title
                                    )}/${product.product_id}`}
                                  >
                                    <img
                                      className="h-24"
                                      src={product.product_img_url}
                                      alt={product.product_title}
                                    />
                                  </LcsLink>
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                  <span className="font-bold text-lg">
                                    <LcsLink
                                      key={index}
                                      href={`/${
                                        tenantId.tenant
                                      }/pdp/${encodeURIComponent(
                                        product.product_category
                                      )}/${encodeURIComponent(
                                        product.product_title
                                      )}/${product.product_id}`}
                                      content={product.product_title}
                                    />
                                  </span>

                                  {/* <span classNameName="text-red-500 text-xs">Apple</span> */}
                                  <div className="flex flex-nowrap my-2 mr-8">
                                    <div className="mr-8">
                                      <LcsLink
                                        key={index}
                                        href={`/${
                                          tenantId.tenant
                                        }/pdp/${encodeURIComponent(
                                          product.product_category
                                        )}/${encodeURIComponent(
                                          product.product_title
                                        )}/${product.product_id}`}
                                      >
                                        <button className="bg-slate-300 hover:bg-slate-400 font-bold py-2 px-4 rounded inline-flex items-center">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                            <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                                            <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                          </svg>
                                          <span>Buy Again</span>
                                        </button>
                                      </LcsLink>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center w-1/5">
                                QTY:
                                <input
                                  className="mx-2 text-lg text-center w-8"
                                  type="text"
                                  value={product.product_qty}
                                />
                              </div>
                              <span className="text-center w-1/5 font-semibold text-lg">
                                ${product.product_sale_price}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {modalOpen && (
          <ProductQuickView
            content={fragJSON}
            uiconfig={prodData.uiconfig}
            onClose={() => setModalOpen(false)}
            openval={modalOpen}
          />
        )} */}
      </div>
      <LcsPagination
        currentPage={LcsPaginationData.content.currentPage}
        totalCount={LcsPaginationData.content.totalCount}
        pageSize={LcsPaginationData.content.PageSize}
        onPageChange={LcsPaginationData.actions[0].action}
      />
      <div className="container mx-auto mt-10 ">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-4">
            {/* Continue shopping */}
            <LcsLink
              href="/"
              classes="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </LcsLink>
          </div>

          {/* Order Summary */}
        </div>
      </div>
      {/* Fragment 1 */}
      <div className="container mx-auto mt-1">
        <div className="flex shadow-md my-10">
          <div className="w-full bg-white px-10 py-3">
            <h1 className="justity-center m-1 underline text-xl text-center">
              Products related to items in your Cart
            </h1>
            <div className="w-full overflow-hidden mx-auto">
              <div className={CarouselStyles.grid()}>
                {/* <Carousel>
                  {data.response.docs.map((data, index) => (
                    // <ProductItemCard key={index + data} item={data} />
                    <ProductCard key={index + data} fragJSON={data} />
                  ))}
                </Carousel> */}
                <Carousel data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalState.active && (
        <ProductQuickView
          content={modalState}
          uiconfig={uiconfig}
          onClose={() =>
            setModalState({
              active: false,
              cancelOrder: null,
              cancelOrderProduct: null,
            })
          }
          openval={modalState.active}
          getProducts={getProducts}
        />
      )}
      {/* fragment 2 */}
    </>
  );
}

export default Orders;

const uiconfig = {
  bg: [
    "mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8",
  ],
  blockLg: ["aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block"],
  blockh2: ["aspect-w-3 aspect-h-2 overflow-hidden rounded-lg"],
  hwFull: ["h-full w-full object-cover object-center"],
  nav: {
    listbg: [
      "mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8",
    ],
    uilist: ["mr-2 text-sm font-medium text-gray-900"],
    listSpacing: ["flex items-center"],
    liText: ["font-medium text-gray-500 hover:text-gray-600"],
    txtsm: "text-sm",
  },
  info: {
    bg: [
      "mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24",
    ],
    border: ["lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"],
    layout: [
      "py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8",
    ],
    header: ["text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"],
    details: ["text-sm text-gray-600"],
    uiSubheader: ["text-sm font-medium text-gray-900"],
    mt10: "mt-10",
    mt6: "mt-6",
    m4: "mt-4",
    mt4: ["mt-4 space-y-6"],
    space6: "space-y-6",
    txtBold600: ["text-gray-600"],
    liststyle: ["list-disc space-y-2 pl-4 text-sm"],
  },
  radio: {
    bggrid: ["grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"],
    position: ["flex items-center space-x-3"],
  },

  cart: {
    priceTxt: [" text-3xl tracking-tight text-gray-900"],
    sr: "sr-only",
    ratingPos: ["flex items-center"],
    reviewTxt: [
      "ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500",
    ],
    space: ["mt-4 lg:row-span-3 lg:mt-0"],
  },

  size: {
    position: ["flex items-center justify-between"],
    txt: ["text-sm font-medium text-indigo-600 hover:text-indigo-500"],
  },
  button: [
    "mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  ],
};
