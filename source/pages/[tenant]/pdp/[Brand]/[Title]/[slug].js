import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { isNull, isUndefined } from "@/utils/index";
import GenericComponent from "@/components/GenericComponent";
import xp_pdp from "../../../../../config/xp_pdp.json";
import API from "@/utils/httputils";
import formatMessage from "format-message";
import config from "../../../../../config.json";
import collConfig from "@/utils/collection/collection.utils.config";
import { getUserSeg } from "@/utils/storageutils";
import LcsTab from "@/widgets/LcsTab";
import Breadcrumb from "@/widgets/Breadcrumb";
import { toast } from "react-toastify";
import { LcsLink } from "@/widgets/LcsLink";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/store/slices/cartSlice";

const instanceMap = [
  { collection: "NewCommerceSolr", tenant: "ncs" },
  { collection: "KamanSolr", tenant: "kcs" },
  { collection: "BBBCommerceSolr", tenant: "bbb" },
  { collection: "PrideCommerceSolr", tenant: "pcs" },
  { collection: "WineCommerceSolr", tenant: "wcs" },
  { collection: "DPFCommerceSolr", tenant: "dpf" },
  { collection: "AutoCommerceSolr", tenant: "acs" },
];

const Slug = ({ prodData, color }) => {
  const dispatch = useDispatch();
  if (!prodData) {
    return <div>Product not found!!</div>;
  }
  const intial = [
    {
      id: 1,
      title: "Description",
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
      title: "Reviews",
      contentId: "headlessui-tabs-tab-:R4q:",
      ariaControlsId: "headlessui-tabs-panel-:R2l6:",
      description: "Test content here second",
      selected: false,
      panel: {
        title: "Panel Title2",
        description: "No Reviews for this product.",
        url: "http://this.test.com",
      },
      children: ``,
    },
    {
      id: 3,
      title: "Shipping Policies",
      contentId: "headlessui-tabs-tab-:R6q:",
      ariaControlsId: "headlessui-tabs-panel-:R3l6:",
      description: "Test content here third",
      selected: false,
      panel: {
        title: "Panel Title3",
        url: "http://this.test.com",
      },
      children: `<div className="mt-10"><h3 className="text-sm font-medium text-gray-900">Highlights</h3><div className="mt-4 space-y-6"><ul className="list-disc space-y-2 pl-4 text-sm"><li><p>Prices are shown in U.S Dollars.</p>
      </li><li><p>Any Import duties, taxes or brokerage fees due at the time of delivery are the sole responsibility of the receiving customer.</p></li>
      <li><p>Packing slips for international shipment cannot be marked as “gift” or with altered prices.</p></li>
      <li><p>International orders may require 3-5 business days or more of additional processing time prior to shipment as we may need to consolidate items to one location for shipment</p></li>
      <li><p>Some brands may not be shipped to certain destinations due to manufacturing restrictions. If you have selected an item that cannot be shipped internationally we will inform you on our site.</p></li></ul></div></div>`,
    },
  ];
  const router = useRouter();
  //  Mange tab state
  const { slug } = router.query;
  const [openTab, setOpenTab] = useState(1);
  const [currImg, setCurrImg] = useState("");
  const [drawerCartItems, setDrawerCartItems] = useState(null);
  const [prodQty, setProdQty] = useState(1);
  const [dontShowReco, setDontShowReco] = useState(true);
  const [prodAttrib, setProdAttrib] = useState("2");
  const [tabState, setTab] = useState(intial);
  const [productTags, setProductTags] = useState([]);
  const [size, setSize] = useState([
    { id: 1, name: "XS", active: "false" },
    { id: 2, name: "S", active: "false" },
    { id: 3, name: "M", active: "false" },
    { id: 4, name: "L", active: "false" },
    { id: 5, name: "XL", active: "false" },
  ]);

  const sizeHandler = (id) => {
    let tmpArr = [];
    for (let i = 0; i < size.length; i++) {
      if (size[i].id === id) {
        // size[i].active = "true";
        tmpArr.push({ id: size[i].id, name: size[i].name, active: "true" });
      } else {
        tmpArr.push({ id: size[i].id, name: size[i].name, active: "false" });
        // size[i].active = "false";
      }
    }
    setSize(tmpArr);
  };

  // const handleBrandBreadCrumbSearch = (l2cat, l1cat, brandName) => {
  //   this.props.onAllSearchSubmit("*:*");
  //   this.props.onCatSearchSubmit({
  //     brand: brandName !== undefined ? [brandName] : [],
  //     l1cat: [],
  //     l2cat: l2cat !== undefined ? [l2cat] : [],
  //   });
  //   this.props.history.push("/productsearch/search=" + brandName);
  // };

  const handleAddtocart = async (
    prodData, // product data
    cartaction, // ADDPRODUCT
    carttype, // C
    signaltype, // cart
    isBuyNow // true
  ) => {
    let searchTerm = "";

    // searchTerm =
    //   productFragment === undefined ||
    //   productFragment === null ||
    //   productFragment === ""
    //     ? localStorage.getItem("com_searchTerm")
    //     : productFragment;

    let searchFacets = { brand: [], l1cat: [], l2cat: [] };
    let facetJson = {};
    if (searchFacets.brand.length !== 0) {
      facetJson.Brand = searchFacets.brand;
    }
    if (searchFacets.l1cat.length !== 0) {
      facetJson.L1Category = searchFacets.l1cat;
    }
    if (searchFacets.l2cat.length !== 0) {
      facetJson.L2Category = searchFacets.l2cat;
    }

    let facetString = JSON.stringify(facetJson);
    let facetTerm = facetString === "{}" ? null : facetString;

    //dispatch action added here
    carttype === "C" && dispatch(addToCart(1));
    
    let AddToCartObj = {
      product_id: prodData.id,
      product_title: prodData.Title,
      product_qty: prodQty, // get qty from pdp
      product_img_url:
        prodData.ImageUrl != undefined
          ? prodData.ImageUrl
          : collConfig.getSmallImgSrcFromImageUrls(prodData.ImageUrls),
      product_actual_price: prodData.ListPrice,
      product_sale_price: prodData.SalePrice ? prodData.SalePrice : 0,
      product_manu_id: prodData.id,
      product_manu_name: prodData.Brand,
      product_segment_type: getUserSeg(),
      product_cart_action_type: cartaction,
      product_cart_type: carttype,
      product_name: prodData.Title,
      product_category: prodData.L1Category,
    };
    try {
      // TODO
      // dont have drawerCartItems right now, but we need one
      if (drawerCartItems == null || drawerCartItems.length < 50) {
        let addtocartResult = await API.postCartService(
          formatMessage(config.apiUrlData.addToCart.part_url, {
            collection: API.getSolrCollection(),
          }),
          AddToCartObj,
          prodData.id, //productid for signal
          searchTerm, //searchTerm for signal
          facetTerm, //facetTerm for signal
          signaltype,
          prodData.Title,
          prodData.L1Category, //categoryId for signal
          AddToCartObj.product_sale_price,
          AddToCartObj.product_qty
        );
        !isBuyNow && carttype === "C"
          ? toast("Product add to cart", {
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
      }
      if (isBuyNow) {
        // this.props.history.push("/checkout");
        alert("/checkout");
      } else {
        switch (carttype) {
          case "C":
            if (dontShowReco) {
              // TODO
              // dontShowReco was hardcoded true and it will always be true
              let drawerCartItems = null;
              if (drawerCartItems == null || drawerCartItems.length < 50) {
                // const message = "Item added to Cart";
                // alert(message);
              } else {
                let message = ```Order Limit
                Reduce cart item to maximum of 50 to add new items!```;
                alert(message);
              }
            } else {
              if (drawerCartItems == null || drawerCartItems.length < 50) {
                // this.props.history.push('/cart');
                if (drawerCartItems == null || drawerCartItems.length < 50) {
                  // const message = "Item added to Cart";
                  // alert(message);
                } else {
                  let message = ```Order Limit
                  Reduce cart item to maximum of 50 to add new items!```;
                  alert(message);
                }
              } else {
                let message = ```Order Limit
                Reduce cart item to maximum of 50 to add new items!```;
                alert(message);
              }
            }
            break;

          case "W":
            // this.props.history.push('/wishlist');
            if (dontShowReco) {
              const message = "Item added to WishList";
            } else {
              // this.props.history.push("/wishlist");
              alert("/wishlist");
            }
            break;
          default:
            // this.props.history.push("/checkout");
            alert("/checkout");
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getProdArrtibs = async () => {
    let result = await API.getLogSearchService(
      formatMessage(config.apiUrlData.productAttributes.part_url, {
        collectionId: API.getSolrCollection(),
        productId: slug,
      })
    );
    setProdAttrib(result.response.data.response.docs[0]);
  };

  const tags = async () => {
    let result = await API.getLogSearchService(
      formatMessage(config.apiUrlData.ProductTags.part_url, {
        collectionId: API.getSolrCollection(),
        productId: slug,
      })
    );
    setProductTags(result.response.data); 
  };

  useEffect(() => {
    // get prodAttrib
    getProdArrtibs();
    document.body.className = "bg-white";

    tags();
    // getSwachtes(prodData);

    // send signal
    API.sendClickSignal(
      prodData.id, // 1
      null, // 2
      null, // 3
      "view", // 4
      null, // 5
      null, // 6
      prodData.Title, // 7
      prodData.L1Category, // 8
      null, // 9
      prodData.Brand, // 10
      null, // 11
      null, // 12
      null, //13
      null,
      null
    );
  }, []);

  const tab = {
    content: tabState,
    orientation: "horizontal",
    action: (e, data) => {
      let foundIndex = tabState.findIndex((x) => x.id == data.id);
      tabState[foundIndex].selected = data.selected;
      return setTab([...tabState]);
    },
  };

  const GetSwachtes = ({ product }) => {

    if (product !== 0 && product.other_colours !== undefined) {
      if (product.other_colours.includes("[")) {
        const rgbcolors = JSON.parse(product.other_colours);
        return rgbcolors.map((value, index) => (
          <div
            className="w-5 h-5 m-2"
            style={{
              backgroundColor: `rgb(${value[0]},${value[1]},${value[2]})`,
            }}
          ></div>
        ));
      } else {
        const colors = product.response.docs[0].other_colours.split(",");
        return colors.map((value, index) => (
          <div
            className="w-5 h-5 m-2"
            style={{
              backgroundColor: `rgb(${value[0]},${value[1]},${value[2]})`,
            }}
          ></div>
        ));
      }
    }
  };

  return (
    <>
      {isNull(prodData) || isUndefined(prodData) ? (
        "Loading..."
      ) : (
        <div className="pdp bg-white ">
          <div className="text-sky-900">
            <Breadcrumb
              content={[
                { id: 0, name: "Home", href: "/" },
                {
                  id: 1,
                  name: prodData.L1Category,
                  href: {
                    pathname: "/search",
                    query: {
                      search: prodData.L1Category,
                      facets: JSON.stringify([
                        {
                          field_name: "L1Category",
                          field_value: prodData.L1Category,
                          field_conjunction: "OR",
                        },
                      ]),
                    },
                  },
                },
                {
                  id: 2,
                  name: prodData.Brand,
                  href: {
                    pathname: "/search",
                    query: {
                      search: prodData.Brand,
                      facets: JSON.stringify([
                        {
                          field_name: "Brand",
                          field_value: prodData.Brand,
                          field_conjunction: "OR",
                        },
                      ]),
                    },
                  },
                },
                { id: 2, name: prodData.Title, href: "" },
              ]}
            />
          </div>
          {/* <LcsLinkBtn
                href={breadcrumb.href}
                content={breadcrumb.name}
                className={BreadcrumbStyles.listFont()}
              /> */}
          <div
            className="pdp m-4 grid gap-2 grid-cols-1 md:grid-cols-2"
            key={prodData.id}
          >
            {/* left side */}
            <div className="grid grid-cols-12">
              <div className="col-span-2 mx-2 ">
                {prodData.ImageUrls ? (
                  prodData.ImageUrls.includes("|") ? (
                    prodData.ImageUrls.split("|").map((image, index) => {
                      return (
                        <div
                          className="my-2 mt-0 h-32"
                          key={index}
                          onClick={() => setCurrImg(image)}
                        >
                          <img
                            src={image}
                            alt="product-image"
                            className="h-full aspect-auto cursor-pointer mx-auto"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = "/product_default.jpg";
                            }}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="my-2 mt-0 h-32"
                      key={prodData.ImageUrls}
                      onClick={() => setCurrImg(prodData.ImageUrls)}
                    >
                      <img
                        src={prodData.ImageUrl}
                        alt="product-image"
                        className="h-full aspect-auto cursor-pointer mx-auto"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "/product_default.jpg";
                        }}
                      />
                    </div>
                  )
                ) : (
                  <div
                    className="my-2 mt-0 h-32"
                    key={prodData.ImageUrl}
                    onClick={() => setCurrImg(prodData.ImageUrl)}
                  >
                    <img
                      src={prodData.ImageUrl}
                      alt="product-image"
                      className="h-full aspect-auto cursor-pointer mx-auto"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/product_default.jpg";
                      }}
                    />
                  </div>
                )}
              </div>
              {/* <>
                <div
                  component="span"
                  onClick={() => {
                    handleBrandBreadCrumbSearch(
                      prodData.response.docs[0].L2Category,
                      prodData.response.docs[0].L1Category,
                      prodData.response.docs[0].Brand
                    );
                  }}
                >
                  {decodeURIComponent(match.params.brandName)}
                </div>
                <NavigateNextIcon />
              </> */}
              <div className="col-span-10 mx-auto">
                <img
                  src={currImg === "" ? prodData.ImageUrl : currImg}
                  alt="product-image"
                  className="h-full aspect-auto"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/product_default.jpg";
                  }}
                />
              </div>
            </div>
            {/* right side */}
            <div className="text-wrap p-2.5">
              <h1 className="text-2xl">{prodData.Title}</h1>
              <LcsLink href="/" classes="text-blue-500">
                <small>Brand: {prodData.Brand}</small>
              </LcsLink>
              <div className="ratings">
                <Image src="/fullstar.svg" alt="star" height="18" width="18" />
                <Image src="/fullstar.svg" alt="star" height="18" width="18" />
                <Image src="/fullstar.svg" alt="star" height="18" width="18" />
                <Image src="/fullstar.svg" alt="star" height="18" width="18" />
                <Image src="/fullstar.svg" alt="star" height="18" width="18" />
              </div>
              <div></div>
              <div className="flex p=4">
                <div className="mr-4">
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
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                </div>
                <div>
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
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                    />
                  </svg>
                </div>
              </div>
              <div className="product-actions d-flex">
                <div className="product-actions d-flex">
                  <span className="text-2xl ml-2">
                    ${prodAttrib ? prodAttrib.SalePrice : "loading..."}
                  </span>
                </div>
                <div className="product-actions d-flex">
                  <span className="text-slate-400 text-lg ml-2 line-through">
                    ${prodData.ListPrice}
                  </span>
                  <span className="text-red-500 ml-1">
                    You Save {Math.round(prodData.sale_discount)}%
                  </span>
                </div>
              </div>
              <div>
                <span>
                  Description product is the marketing copy that explains what a
                  product is and why it's worth purchasing. The purpose of a
                  product description is to supply customers.{" "}
                </span>
              </div>
              <div className="qty"></div>
              <div className="p-2 mb- flex flex-nowrap">
                <h1 className=" text-xl mt-3">Size:</h1>
                {size.map((foo) => (
                  <button
                    key={foo.id}
                    className={`h-12 w-12 m-1 rounded-full font-semibold py-2 px-2 border border-zinc-500 ${
                      foo.active === "true"
                        ? "bg-indigo-500 text-blue-700 text-white"
                        : ""
                    }`}
                    onClick={() => sizeHandler(foo.id)}
                  >
                    {foo.name}
                  </button>
                ))}
              </div>
              <div className="p-2 mb- flex flex-nowrap  ">
                <h1 className=" text-xl mb-2">
                  Color: {prodData.product_colour_group}
                </h1>
                {/* <div>{swatchColors}</div> */}
                <GetSwachtes product={prodData} />
                {/* <div className="w-5 h-5 bg-red-700 m-2"></div>
                <div className="w-5 h-5 bg-red-700 m-2"></div> */}
                {/* <button className="m-2 mt-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"></button>
                <button className=" m-2 mt-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"></button> */}
              </div>

              <div className="h-0.5 bg-slate-300"></div>

              <div className="mt-6 text-sm">Free Shipping Available</div>
              <div className="mb-6 text-sm">
                Expected delivery By : Monday, Oct 1
              </div>
              <div className="product-actions flex">
                <button
                  className="bigbtn"
                  onClick={() =>
                    handleAddtocart(prodData, "ADDPRODUCT", "C", "cart")
                  }
                >
                  Add to Cart
                </button>
                <button
                  className="bigbtn"
                  onClick={() =>
                    handleAddtocart(prodData, "ADDPRODUCT", "C", "cart", true)
                  }
                >
                  Buy Now
                </button>
                <button type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="  w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </button>
                <button
                  className="text-blue-700 d-flex"
                  onClick={() =>
                    handleAddtocart(prodData, "ADDPRODUCT", "W", "cart")
                  }
                >
                  Add to Wishlist
                </button>
              </div>
              <div className="flex flex-wrap">
                {productTags.length > 0 &&
                  productTags.map((tags, index) => (
                    <p className="m-2 bg-slate-200 p-1 rounded" key={index}>
                      <LcsLink
                        href={{ pathname: "/search", query: { search: tags } }}
                        content={tags}
                      />
                    </p>
                  ))}
              </div>
            </div>
          </div>
          {/* <LcsTab
            content={tab.content}
            uiconfig={tab.uiconfig}
            orientation={tab.orientation}
            action={tab.action}
            id={"lcs-tab"}
          /> */}
          <div className="flex flex-wrap">
            <div className="">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                <li className="-mb-px mr-2 last:mr-0 ">
                  <a
                    className={
                      "text-lg font-bold hover:font-extrabold uppercase px-5 py-3 shadow-lg rounded  " +
                      (openTab === 1
                        ? "text-black bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    DESCRIPTION
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0">
                  <a
                    className={
                      "text-lg font-bold hover:font-extrabold uppercase px-5 py-3 shadow-lg rounded  " +
                      (openTab === 2
                        ? "text-black bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    REVIEW
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0">
                  <a
                    className={
                      "text-lg font-bold hover:font-extrabold uppercase px-5 py-3 shadow-lg rounded " +
                      (openTab === 3
                        ? "text-black bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    SHIPPING POLICIES
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded min-h-full">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <div className="flex flex-row">
                        <div className="basis-1/4">
                          <img
                            src={currImg === "" ? prodData.ImageUrl : currImg}
                            alt="product-image"
                            className="h-full aspect-auto"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = "/product_default.jpg";
                            }}
                          />
                        </div>
                        <div className="basis-3/5">
                          <p>{prodData.Description}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <p>No Reviews for this product.</p>
                    </div>
                    <div
                      className={openTab === 3 ? "block" : "hidden"}
                      id="link3"
                    >
                      <p>Prices are shown in U.S Dollars. </p>
                      <p>
                        Any Import duties, taxes or brokerage fees due at the
                        time of delivery are the sole responsibility of the
                        receiving customer.
                      </p>
                      <p>
                        Packing slips for international shipment cannot be
                        marked as “gift” or with altered prices.
                      </p>
                      <p>
                        International orders may require 3-5 business days or
                        more of additional processing time prior to shipment as
                        we may need to consolidate items to one location for
                        shipment Some brands may not be shipped to certain
                        destinations due to manufacturing restrictions.{" "}
                      </p>
                      <p>
                        If you have selected an item that cannot be shipped
                        internationally we will inform you on our site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {xp_pdp.wrapperArr[0].Content.map((data, index) => {
        if (data.fragment === "RelatedProducts") {
          return (
            <GenericComponent
              data={data}
              productId={slug}
              page="pdp"
              key={index}
            />
          );
        }
        if (data.fragment === "ItemABRecommendation") {
          return (
            <GenericComponent
              data={data}
              productId={slug}
              page="pdp"
              key={index}
            />
          );
        }
        if (data.fragment === "UserRecommend") {
          return (
            <GenericComponent
              data={data}
              productId={slug}
              page="pdp"
              key={index}
            />
          );
        }
      })}
    </>
  );
};

export async function getStaticProps({ params }) {
  let solrCollection = instanceMap.filter(
    (app) => app.tenant === params.tenant
  )[0].collection;

  // get paths
  const result = await axios.get(
    `http://192.168.15.91:8983/solr/${solrCollection}/select?indent=true&q.op=OR&q=id:${params.slug}`
  );
  const prodData = await result.data.response.docs[0];
  return { props: { prodData } };
}

export async function getStaticPaths() {
  let paths = [];
  // get paths
  instanceMap.forEach(async (app) => {
    let solrResponse = await axios.get(
      `http://192.168.15.91:8983/solr/${app.collection}/select?indent=true&q.op=OR&q=*%3A*&rows=1&start=0`
    );
    solrResponse.data.response.docs.map((champ) => {
      let params = {
        tenant: encodeURIComponent(app.tenant.toLowerCase()),
        Brand: encodeURIComponent(champ.Brand),
        Title: encodeURIComponent(champ.Title),
        slug: encodeURIComponent(champ.id),
      };
      paths.push(params);
    });
  });
  return { paths, fallback: true };
}

export default Slug;
