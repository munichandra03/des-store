import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductOptions from "./ProductOptions";
import Link from "next/link";
import API from "@/utils/httputils";
import { getUserSeg } from "@/utils/storageutils";
import formatMessage from "format-message";
import config from "../../config.json";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { isNullOrUndefined, isProductBoosted } from "@/utils/index";
import ProductQuickView from "./ProductQuickView";
import { Icons } from "@/consts/style.consts";

const instanceMap = [
  { collection: "NewCommerceSolr", tenant: "ncs" },
  { collection: "KamanSolr", tenant: "kcs" },
  { collection: "BBBCommerceSolr", tenant: "bbb" },
  { collection: "PrideCommerceSolr", tenant: "pcs" },
  { collection: "WineCommerceSolr", tenant: "wcs" },
  { collection: "DPFCommerceSolr", tenant: "dpf" },
  { collection: "AutoCommerceSolr", tenant: "acs" },
];

const index = ({ fragJSON, data, quickView }) => {
  const router = useRouter();
  const [hoverState, setHoverState] = useState(false);
  const [tenantId, setTenantId] = useState("ncs");
  const [drawerCartItems, setDrawerCartItems] = useState(null);
  const [dontShowReco, setDontShowReco] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  //for redux store dispatch
  const dispatch = useDispatch();

  const handleAddtocart = async (
    prodData, // product data
    cartaction, // ADDPRODUCT
    carttype, // C
    signaltype, // cart
    isBuyNow // true
  ) => {
    let searchTerm = "";

    if (router?.query?.search) {
      searchTerm = router.query.search;
    }

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

    let addToCartObj = {
      product_id: prodData.id,
      product_title: prodData.Title,
      product_qty: 1, // always 1 because this is from product card
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
          addToCartObj,
          prodData.id, //productid for signal
          searchTerm, //searchTerm for signal
          facetTerm, //facetTerm for signal
          signaltype,
          prodData.Title,
          prodData.L1Category, //categoryId for signal
          addToCartObj.product_sale_price,
          addToCartObj.product_qty
        );
        !isBuyNow && carttype === "C"
          ? toast("Product add to cart", {
              className: "font-bold",
              hideProgressBar: true,
              autoClose: 500,
              type: "success",
              position: "bottom-left",
            })
          : carttype === "W" &&
            toast("Product added to Wishlist", {
              className: "font-bold",
              hideProgressBar: true,
              autoClose: 500,
              type: "success",
              position: "bottom-left",
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
                const message = "Item added to Cart";
              } else {
                let message = ```Order Limit
                Reduce cart item to maximum of 50 to add new items!```;
                alert(message);
              }
            } else {
              if (drawerCartItems == null || drawerCartItems.length < 50) {
                // this.props.history.push('/cart');
                if (drawerCartItems == null || drawerCartItems.length < 50) {
                  const message = "Item added to Cart";
                  alert(message);
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
              // alert(message);
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
      //this.getCartDetails();
    } catch (e) {
      console.log(e);
    }
  };

  const isProductBoostedd = (prodId) => {
    if (data !== undefined) {
      if (data?.params != undefined) {
        let stringJsonObj = {};
        let stringJson = undefined;
        try {
          stringJson = data?.params.json;
          //alert(stringJson)
          if (stringJson !== undefined) {
            stringJsonObj = JSON.parse(stringJson);
          }
        } catch (error) {
          let tempJson = stringJson.replace(",],", "],");
          try {
            stringJsonObj = JSON.parse(tempJson);
          } catch (error) {
            stringJsonObj = {};
          }
        }
        if (!isNullOrUndefined(stringJsonObj)) {
          let productBoostObj = {};
          // if (isNullOrUndefined(responseParam)) {
          productBoostObj = isProductBoosted(
            prodId,
            // responseParam.headerStageValues, // params.des_stage_values
            // responseParam.headerStages, // params.des_stage_names
            // responseParam.headerBqField //params.bq
            stringJsonObj.params.des_stage_values,
            stringJsonObj.params.des_stage_names,
            stringJsonObj.params.bq
          );
          if (productBoostObj.isBoosted) {
            return (
              <>
                <p className="flex justify-between align-middle bg-red-500 rounded-full p-0.5 mx-1 ">
                  <svg
                    class="w-3 h-3"
                    fill="#ffffff"
                    stroke="#ffffff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </p>
                {productBoostObj.stageName}
              </>
            );
          } else {
            // return <OfflineBoltIcon style={{ color: '#fff' }} />;
            null;
          }
          // }
        }
      }
    }
    // return "isProductBoosted";
  };

  useEffect(() => {
    let solrCollection = API.getSolrCollection();
    let tenant = instanceMap.filter(
      (app) => app.collection === solrCollection
    )[0];
    setTenantId(tenant);
  }, []);

  return (
    <div className="h-65 w-full">
      <div className="p-1 flex justify-center">
        <p className=" flex px-1 my-1 rounded items-center">
          {isProductBoostedd(fragJSON.id) ? isProductBoostedd(fragJSON.id) : ""}
        </p>
      </div>
      <div
        className="carousel-item relative snap-start w-56 flex justify-center duration-500 ease-out  hover:-translate-y-1 hover:scale-100 hover:shadow-2xl"
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        <Link
          href={`/${tenantId.tenant}/pdp/${encodeURIComponent(
            fragJSON.Brand
          )}/${encodeURIComponent(fragJSON.Title)}/${fragJSON.id}`}
          className="flex item-center"
        >
          <a>
            <img
              src={fragJSON.ImageUrl || ""}
              alt={fragJSON.Title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/product_default.jpg";
              }}
              className="aspect-square cursor-pointer"
            />
            {/* TODO next image is causing issue for wine bottles in WCS */}
            {/* <Image
              className="aspect-square cursor-pointer"
              src={fragJSON.ImageUrl || ""}
              alt={fragJSON.Title}
              // layout="fill"
              // objectFit="contain"
              width={500}
              height={500}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/product_default.jpg";
              }}
            /> */}
          </a>
        </Link>
        {hoverState && (
          <div className="flex absolute bottom-0 justify-around w-full bg-secondary-bg">
            <button
              className="p-3 bg-orange-400 border-solid grid place-content-center w-full"
              onClick={() =>
                handleAddtocart(fragJSON, "ADDPRODUCT", "C", "cart")
              }
            >
              <img src="/cart.svg" alt="cart-icon" width={24} height={24} />
            </button>
            <button
              className="p-3 bg-orange-400 border-solid grid place-content-center w-full ml-0.5"
              onClick={() =>
                handleAddtocart(fragJSON, "ADDPRODUCT", "W", "cart")
              }
            >
              <img src="/heart.svg" alt="cart-icon" width={24} height={24} />
            </button>
            <button
              className="p-3 bg-orange-400 border-solid grid place-content-center w-full ml-0.5"
              // onClick={() => setModalOpen(true)}
              onClick={() => quickView(fragJSON, modalOpen)}
            >
              <Icons.eye />
            </button>
          </div>
        )}
      </div>
      <Link
        href={`/${tenantId.tenant}/pdp/${encodeURIComponent(
          fragJSON.Brand
        )}/${encodeURIComponent(fragJSON.Title)}/${fragJSON.id}`}
        className="flex item-center"
      >
        <a>
          <ProductOptions {...fragJSON} />
        </a>
      </Link>
      {/* <div className="absolute">
        {modalOpen && (
          <ProductQuickView
            content={fragJSON}
            uiconfig={product.uiconfig}
            onClose={() => setModalOpen(false)}
            openval={modalOpen}
          />
        )}
      </div> */}
    </div>
  );
};

export default index;

