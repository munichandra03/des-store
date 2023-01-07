import { XMarkIcon } from "@heroicons/react/24/outline";
import { Quickview } from "@/consts/style.consts";
import API from "@/utils/httputils";
import config from "../../config.json";
import { useEffect, useState } from "react";
import formatMessage from "format-message";
import { headerStyleConsts } from "@/consts/style.consts";
import { toast } from "react-toastify";

const instanceMap = [
  { collection: "NewCommerceSolr", tenant: "ncs" },
  { collection: "KamanSolr", tenant: "kcs" },
  { collection: "BBBCommerceSolr", tenant: "bbb" },
  { collection: "PrideCommerceSolr", tenant: "pcs" },
  { collection: "WineCommerceSolr", tenant: "wcs" },
  { collection: "DPFCommerceSolr", tenant: "dpf" },
  { collection: "AutoCommerceSolr", tenant: "acs" },
];

export default function ProductQuickView({
  uiconfig,
  content,
  onClose,
  openVal,
  getProducts,
}) {
  const [sortKey, setSortKey] = useState({});
  const [sortDropDown, setSortDropDown] = useState(false);
  const sortDropDownArr = [
    { name: "I have changed my mind", value: "" },
    { name: "I bougth the wrong item", value: "" },
    { name: "I found the cheaper alternative", value: "" },
    { name: "I placed a duplicate order", value: "" },
    {
      name: "I received the negative feedback about the item after purchased",
      value: "",
    },
    { name: "Delivery time takes too long", value: "" },
  ];
  const confirmCancelOrder = async (item, orderobj) => {
    let payload = {};
    if (
      item &&
      item.product_order_id !== undefined &&
      orderobj &&
      orderobj.order_id !== undefined
    ) {
      let product_order_id = item.product_order_id;
      let order_id = orderobj.order_id;
      payload.product_order_id = product_order_id;
      payload.order_id = order_id;
      try {
        let cancelOrderComplete = await API.postCartService(
          formatMessage(config.apiUrlData.cancelOrder.part_url, {
            collection: API.getSolrCollection(),
          }),
          payload,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        );

        // console.log(cancelOrderComplete);
        if (cancelOrderComplete.response.status === 200) {
          !item && carttype === "O"
            ? toast("order cancelled", {
                className: "font-bold",
                hideProgressBar: true,
                autoClose: 500,
                type: "success",
                position: "bottom-left",
                theme: "colored",
              })
            : carttype === "W" &&
              toast("Product added to Wishlist", {
                className: "font-bold",
                hideProgressBar: true,
                autoClose: 500,
                type: "success",
                position: "bottom-left",
                theme: "colored",
              });
          // alert("cancel order snack baar idhar");

          // getCartDetails(); //get new cart (orders) details

          API.sendClickSignal(
            item.product_id, // 1
            undefined, // 2
            undefined, // 3
            "cancelproduct", // 4
            undefined, // 5
            undefined, // 6
            item.product_title, // 7
            item.product_category, // 8
            undefined, //9
            item.product_manu_name, // 10
            item.product_sale_price, //11
            item.product_qty, //12
            payload.product_cancel_reason, //13
            order_id
          );
        }
      } catch (e) {
        const message = "Error occured";
        // alert(message);
        onClose();
        getProducts();
      }
    } else {
      return;
    }
  };
  // console.log("content", content);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastorders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  // const [cancelOrderProduct, setCancelOrderProduct] = useState([]);
  const [cancelOrder, setCancelOrder] = useState([]);
  const [hasError, setHasError] = useState([]);

  // const handleClick = () => {
  //   // setHasError(false);
  //   // if (true != false) {
  //   //   setHasError(true);
  //   // } else {
  //   //   confirmCancelOrder(content.cancelOrderProduct, content.cancelOrder);
  //   // }

  // };

  // const handleOpen = (item, orderobj) => {
  //   setState({ open: true });
  //   setState({ cancelOrderProduct: item, cancelOrder: orderobj });
  // };

  // const handleClose = () => {
  //   setState({ open: false });
  //   setState({ cancelOrderProduct: null });
  //   setState({ selected: null, msg: null });
  // };

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
        description: content?.Description,
        url: content?.ImageUrl,
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

  let solrCollection = API.getSolrCollection();
  const [tabState, setTab] = useState(intial);
  const tab = {
    content: tabState,
    orientation: "horizontal",
    action: (e, data) => {
      let foundIndex = tabState.findIndex((x) => x.id == data.id);
      tabState[foundIndex].selected = data.selected;
      return setTab([...tabState]);
    },
  };
  const [tenantId, setTenantId] = useState("ncs");

  useEffect(() => {
    let tenant = instanceMap.filter(
      (app) => app.collection === solrCollection
    )[0];
    setTenantId(tenant);
  }, []);

  // const getProducts = () => {
  //   API.getLogSearchService(
  //     formatMessage(config.apiUrlData.currentOrders.part_url, {
  //       collection: solrCollection,
  //       typecart: "O",
  //     })
  //   ).then((data) => {
  //     setCurrentOrders(data.response);
  //   });
  //   // document.body.className = "bg-slate-100";

  //   API.getLogSearchService(
  //     formatMessage(config.apiUrlData.cancelledOrders.part_url, {
  //       collection: solrCollection,
  //       typecart: "X",
  //     })
  //   ).then((data) => setCancelledOrders(data.response));
  // };

  return (
    <>
      <div className={Quickview.root()} role="dialog">
        <div className={Quickview.backdrop()}></div>
        <div className={Quickview.diologebox()}>
          <div className={Quickview.align()}>
            <div className={Quickview.panelOverlay()}>
              <div className={Quickview.panelBg()}>
                <button
                  type="button"
                  className={Quickview.closeIcon()}
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className={Quickview.grid()} aria-hidden="true" />
                </button>
                <div className={Quickview.optionSection()}>
                  <h2 className=" text-2xl   ml-56 text-gray-800">
                    Cancel order?
                  </h2>
                  <h2 className={Quickview.are()}>
                    Are you sure you want to cancel the order?
                  </h2>

                  <h2 className={Quickview.are()}> order summary</h2>
                  <div>
                    <div className="">
                      <div className="flex items-center hover:bg-gray-100 -mx-8 px-6  border-gray-300">
                        <div className="flex w">
                          <div className="">
                            <img
                              className="h-24 w-24"
                              src={content?.cancelOrderProduct?.product_img_url}
                              alt=""
                            />
                          </div>

                          <div className="pl-4">
                            <span className="">
                              {content?.cancelOrderProduct?.product_title}
                            </span>

                            {/* <span classNameName="text-red-500 text-xs">Apple</span> */}
                          </div>
                        </div>

                        <span className="text-center w-1/5 font-semibold text-lg">
                          ${content?.cancelOrderProduct?.product_sale_price}
                        </span>
                      </div>
                    </div>
                    <h2 className={Quickview.are()}>
                      Choose a reason for order cancellation
                    </h2>
                    <div className={headerStyleConsts.menuGroupIcons}>
                      <div className="group">
                        <button className="bg-white capitalize flex items-center justify-between w-full px-4 py-2 hover:underline">
                          <div className=" w-96 bg-slate-100">
                            {/* <label className="font-thin  text-slate-500">
                              cancel reason
                            </label> */}
                          </div>
                        </button>
                        <button
                          id="dropdownDefault"
                          data-dropdown-toggle="dropdown"
                          className="bg-blue-800 w-96 focus:ring-4 focus:outline-none rounded-lg  px-4 py-2.5 text-center inline-flex items-center bg-slate-200 text-black focus:ring-white"
                          type="button"
                          onClick={() => setSortDropDown(!sortDropDown)}
                        >
                          {sortKey.name ? sortKey.name : "Cancel reason"}
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
                              className="absolute shadow-xl bg-white z-10 w-96 rounded bottom-12 "
                            >
                              <ul
                                className="py-1"
                                ariaLabelledby="dropdownDefault"
                              >
                                {sortDropDownArr.map((item, index) => {
                                  return (
                                    <li
                                      key={index}
                                      className="focus:ring-white hover:bg-slate-200"
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
                    <h2 className={Quickview.are()}>Leave a comment</h2>
                    <div>
                      <input
                        type="text"
                        placeholder="comment"
                        className="md:w-96 h-20 p-2   mr-4 text-gray-500 border hover:border-slate-800 rounded-md outline-none bg-slate-100 focus:bg-white"
                      />
                    </div>
                    <div className="content-right pl-96 ">
                      <button
                        className=" border-slate-700 font-bold p-2 py-2 px-4 rounded inline-flex items-center "
                        onClick={onClose}
                      >
                        No
                      </button>

                      <button
                        className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
                        onClick={() =>
                          confirmCancelOrder(
                            content.cancelOrderProduct,
                            content.cancelOrder
                          )
                        }
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                  {/* <div>
                <h1 className="content-center">
                  Cancel Order?
                </h1>
                <h1
                 
                >
                  Are you sure you want to cancel the order?
                </h1>
                <h2 >
                  Order summary
                </h2>
                
                <span variant="h5" style={{ marginTop: 5 }} gutterBottom>
                  Choose a reason for order cancellation
                </span>
               
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
