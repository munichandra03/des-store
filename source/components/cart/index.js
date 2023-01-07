import { CarouselStyles, Icons } from "@/consts/style.consts";
import Carousel from "@/widgets/Carosuel";
import data from "../../config/BestSellers.json";
import { useEffect, useState } from "react";
import API from "@/utils/httputils";
import config from "../../config.json";
import formatMessage from "format-message";
import { LcsButton } from "@/widgets/LcsButton";
import { LcsLink } from "@/widgets/LcsLink";
import { getItemfromSessionStorage } from "../../utils/storageutils";
import { useRouter } from "next/router";
import collConfig from "@/utils/collection/collection.utils.config";
import { getUserSeg } from "@/utils/storageutils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { incrementByNumber } from "@/redux/store/slices/cartSlice";

const instanceMap = [
  { collection: "NewCommerceSolr", tenant: "ncs" },
  { collection: "KamanSolr", tenant: "kcs" },
  { collection: "BBBCommerceSolr", tenant: "bbb" },
  { collection: "PrideCommerceSolr", tenant: "pcs" },
  { collection: "WineCommerceSolr", tenant: "wcs" },
  { collection: "DPFCommerceSolr", tenant: "dpf" },
  { collection: "AutoCommerceSolr", tenant: "acs" },
];

function Cart() {
  //for redux store dispatch
  const dispatch = useDispatch();
  const productsCount = useSelector((state) => state.cart.total);

  const [tenantId, setTenantId] = useState("ncs");
  useEffect(() => {
    if (productsCount) {
      getProducts();
    }
  }, [productsCount]);

  useEffect(() => {
    let solrCollection = API.getSolrCollection();
    let tenant = instanceMap.filter(
      (app) => app.collection === solrCollection
    )[0];
    setTenantId(tenant);
  }, []);
  const cartt = {
    // product: [
    //   {
    //     id: 1,
    //     name: "Giordano",
    //     href: "#",
    //     offer: "40%",
    //     color: "Blue",
    //     price: "$32.00",
    //     quantity: "06",
    //     imageSrc: "https://m.media-amazon.com/images/I/71V4BZd-ZWL._UX425_.jpg",
    //     imageAlt:
    //       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    //   },
    //   {
    //     id: 2,
    //     name: "Titan",
    //     href: "#",
    //     color: "Salmon",
    //     price: "$90.00",
    //     quantity: "02",
    //     imageSrc: "https://m.media-amazon.com/images/I/71T1rCBbpmL._UX425_.jpg",
    //     imageAlt:
    //       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    //     offer: "10%",
    //   },
    //   {
    //     id: 3,
    //     name: "Throwback Hip Bag",
    //     href: "#",
    //     offer: "2%",
    //     color: "Salmon",
    //     price: "$90.00",
    //     quantity: "04",
    //     imageSrc: "https://m.media-amazon.com/images/I/61DZclqQ4RL._SX425_.jpg",
    //     imageAlt:
    //       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    //   },
    // ],

    titles: ["Product Details", "Quantity", "Price", "Total"],
    title: "My Cart Items",
    total: "Total",
    price: "$262.00",
    shippingtext: "Handling Charges",
    subtotal: "Price",
    checkout: "Checkout",
    remove: "Remove",
    shop: "Continue Shopping",
    shipping: "$600",
    totalPrice: "$1200",
  };
  // const [count, setCount] = useState();

  const router = useRouter();
  const [drawerCartItems, setDrawerCartItems] = useState(null);
  const [dontShowReco, setDontShowReco] = useState(true);

  const handleAddtocart = async (
    prodData, // product data
    cartaction, // ADDPRODUCT
    carttype, // C
    signaltype, // cart
    isBuyNow, // true
    e
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
    let AddToCartObj = {
      product_id: prodData.product_id,
      product_title: prodData.product_title,
      product_qty: 1, // get qty from pdp
      product_img_url:
        prodData.prodData_ImageUrl != undefined
          ? prodData_ImageUrl
          : collConfig.getSmallImgSrcFromImageUrls(prodData.ImageUrls),
      product_actual_price: prodData.product_actual_price,
      product_sale_price: prodData.product_sale_price
        ? prodData.product_sale_price
        : 0,
      product_manu_id: prodData.product_manu_id,
      product_manu_name: prodData.product_manu_name,
      product_segment_type: getUserSeg(),
      product_cart_action_type: cartaction,
      product_cart_type: carttype,
      product_name: prodData.product_title,
      product_category: prodData.product_category,
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
              type: "primary",
              position: "bottom-left",
              theme: "colored",
              color: "inherit",
            })
          : carttype === "W" &&
            toast("Product added to Wishlist", {
              className: "font-bold",
              hideProgressBar: true,
              autoClose: 500,
              type: "success",
              position: "bottom-left",
              theme: "colored",
              color: "inherit",
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
                //alert(message);
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
                  //alert(message);
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
            // dispatch(addToCart(1));
            dispatch(incrementByNumber(e.target.value));
            getProducts();
            break;
          case "W":
            // this.props.history.push('/wishlist');
            if (dontShowReco) {
              const message = "Item added to WishList";
              alert(message);
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

  const handleRemoveItem = async (product, typeCart) => {
    let delFromCartObj = {
      _id: product._id,
      product_id: product.product_id,
      product_title: product.product_title,
      product_qty: product.product_qty,
      product_img_url: product.product_img_url,
      product_actual_price: product.product_actual_price,
      product_sale_price: product.product_sale_price,
      product_manu_id: product.product_manu_id,
      product_manu_name: product.product_manu_name,
      product_segment_type: product.product_segment_type,
      product_cart_action_type: "DELPRODUCT",
      product_cart_type: typeCart,
      product_category: product.product_category,
    };
    try {
      let addtocartResult = await API.postCartService(
        formatMessage(config.apiUrlData.deleteFromCart.part_url, {
          collection: API.getSolrCollection(),
          prodindex: product._id,
        }), // 1
        delFromCartObj, //2
        product.product_id, //productid for signal,3
        getItemfromSessionStorage("nodesearch"), //undefined, ;
        undefined,
        "cartremove",
        null,
        delFromCartObj.product_category, //categoryId for signal
        delFromCartObj.product_sale_price,
        1
      );

      getProducts();
    } catch (e) {
      x;
      console.log(e);
    }
  };

  const moveToSavedForLater = async (product) => {
    let SavedForLater = {
      _id: product._id,
      product_id: product.product_id,
      product_title: product.product_title,
      product_qty: product.product_qty,
      product_img_url: product.product_img_url,
      product_actual_price: product.product_actual_price,
      product_sale_price: product.product_sale_price,
      product_manu_id: product.product_manu_id,
      product_manu_name: product.product_manu_name,
      product_segment_type: product.product_segment_type,
      product_cart_action_type: "MOVESAVEFORLATER",
      product_cart_type: "S",
      product_category: product.product_category,
    };
    try {
      let addtocartResult = await API.postCartService(
        formatMessage(config.apiUrlData.moveToSaveForLater.part_url, {
          collection: API.getSolrCollection(),
          prodindex: product._id,
        }),
        SavedForLater,
        product.product_id, //productid for signal,
        undefined,
        undefined,
        "moveToSaveForLater",
        undefined,
        SavedForLater.product_category, //categoryId for signal
        SavedForLater.product_sale_price,
        1
      );

      getProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const moveToWishList = async (product) => {
    let moveToWishObj = {
      _id: product._id,
      product_id: product.product_id,
      product_title: product.product_title,
      product_qty: product.product_qty,
      product_img_url: product.product_img_url,
      product_actual_price: product.product_actual_price,
      product_sale_price: product.product_sale_price,
      product_manu_id: product.product_manu_id,
      product_manu_name: product.product_manu_name,
      product_segment_type: product.product_segment_type,
      product_cart_action_type: "MOVEWISHLIST",
      product_cart_type: "W",
      product_category: product.product_category,
    };
    try {
      let addtocartResult = await API.postCartService(
        formatMessage(config.apiUrlData.moveToWishList.part_url, {
          collection: API.getSolrCollection(),
          prodindex: product._id,
        }),
        moveToWishObj,
        product.product_id, //productid for signal,
        undefined,
        undefined,
        "movetowishlist",
        null,
        moveToWishObj.product_category, //categoryId for signal
        moveToWishObj.product_sale_price,
        1
      );

      getProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const [cart, setCart] = useState([]);
  const [Saveforlater, setSaveforlater] = useState([]);

  const getProducts = () => {
    let solrCollection = API.getSolrCollection();
    if (config.apiUrlData.viewCart !== "Banner") {
      API.getLogSearchService(
        formatMessage(config.apiUrlData.viewCart.part_url, {
          collection: solrCollection,
          typecart: "C",
        })
      ).then((data) => setCart(data.response));
    }
    // document.body.className = "bg-slate-100";

    if (config.apiUrlData.viewCart !== "Banner") {
      API.getLogSearchService(
        formatMessage(config.apiUrlData.viewCart.part_url, {
          collection: solrCollection,
          typecart: "S",
        })
      ).then((data) => setSaveforlater(data.response));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //count set for header cart
  useEffect(() => {
    if (cart.data) {
      const arrQtyVal = cart.data[0]?.products?.map((item) => item.product_qty);

      const initialValue = 0;
      const sumWithInitial = arrQtyVal?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      dispatch(incrementByNumber(sumWithInitial));
    }
  }, [cart]);

  let qtyVal = [];
  for (var i = 1; i <= 10; i++) {
    qtyVal.push(i);
  }

  return (
    <>
      <div className="container mx-auto mt-10 ">
        <div className="md:flex sm:flex-row my-10">
          <div className="md:w-[900px] md:mr-9 sm:w-screen bg-white py-1">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold md:text-2xl font-sans">
                {cart?.data && "Your Cart"}
              </h1>
              {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
            </div>

            {cart?.data && 
              (cart.data[0]?.products?.length == 0) ? 
                <div className="text-bold text-2xl">Your cart is empty</div> : 
                <div className="grid grid-cols-2 gap-4 content-center border border-slate-200 rounded max-w-4xl h-20 px-5 mt-7 mb-2.5">
              <div className="mt-2 text-cart_desc text-sm font-sans">
                Deliver To: <span className="font-bold">My Home</span>
              </div>
              <div className="text-end">
                <LcsButton
                  uistyle="font-sans bg-transparent text-cartred text-sm font-bold py-2 px-4 border border-cartred rounded"
                  content="Change Address"
                />
              </div>
            </div>
            }

            {cart?.data &&
              cart.data[0]?.products?.map((product, index) => (
                <div
                  key={index}
                  className="flex p-5 border border-slate-200 rounded md:max-w-4xl mt-2.5 h-52 font-sans"
                >
                  {/* product image */}
                  <div className="w-[100px] md:w-[150px] mr-2.5 md:ml-5">
                    <div className="w-[100px] md:w-[150px] h-44 md:h-40 ">
                      <LcsLink
                        key={index}
                        href={`/${tenantId.tenant}/pdp/${encodeURIComponent(
                          product.product_category
                        )}/${encodeURIComponent(product.product_title)}/${
                          product.product_id
                        }`}
                      >
                        <img
                          className="w-[100px] md:w-[150px] h-44 md:h-40 "
                          src={product.product_img_url}
                          alt=""
                        />
                      </LcsLink>
                    </div>
                  </div>

                  {/* description and others */}
                  <div className="w-full ml-2.5 md:ml-0">
                    <div className="flex justify-end">
                      <LcsButton
                        uistyle="bg-blue-500 hover:text-black rounded text-xs md:text-sm"
                        action={() => handleRemoveItem(product, "C")}
                        IconName={Icons.Close}
                      />
                    </div>
                    <div className="flex-1 text-xs md:text-sm">
                      <LcsLink
                        href={`/${tenantId.tenant}/pdp/${encodeURIComponent(
                          product.product_category
                        )}/${encodeURIComponent(product.product_title)}/${
                          product.product_id
                        }`}
                        key={index}
                        content={product.product_title}
                      />
                    </div>

                    <div className="py-1 md:py-3">
                      <select className="w-[74px] h-[28px] bg-slate-200 rounded px-1 mr-2">
                        <option>Size</option>
                      </select>
                      <select
                        className="w-[74px] h-[28px] bg-slate-200 rounded px-1"
                        onChange={(e) =>
                          handleAddtocart(
                            product,
                            "ADDPRODUCT",
                            "C",
                            "cart",
                            "",
                            e
                          )
                        }
                      >
                        <option>Qty</option>
                        {qtyVal.map((item) => (
                          <option
                            key={item}
                            value={item}
                            selected={product.product_qty == item && "selected"}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="font-sans">
                      <span className="text-lg font-bold">
                        ${product.product_sale_price}
                      </span>{" "}
                      <span className="text-[#979797] text-sm line-through">
                        ${product.product_sale_price + 2}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 mb-1 md:mb-0">
                        <div className="flex flex-row md:pt-3 text-xs">
                          <Icons.RightArrow />
                          <span>Delivered by</span>
                          <span className="font-bold pl-1">
                            30 December 2022
                          </span>
                        </div>
                      </div>
                      <div className="md:w-1/2 flex justify-end">
                        <button
                          className="border rounded h-8 w-[100px] md:w-28 mr-2.5 text-xs border-[#979797]"
                          onClick={() => moveToSavedForLater(product)}
                        >
                          <div className="flex flex-row justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-[#979797]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="mt-0.5 ml-1 text-[#979797] font-sans">
                              Save for later
                            </span>
                          </div>
                        </button>

                        <button
                          className="border rounded h-8 w-32 text-xs border-[#979797]"
                          onClick={() => moveToWishList(product)}
                        >
                          <div className="flex flex-row justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 text-[#979797]"
                              alt="wishlist"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                              />
                            </svg>

                            <span className="mt-0.5 ml-1 text-[#979797] font-sans">
                              Move to wishlist
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* <div className="flex md:justify-center w-2/4">
                      <svg
                        className="fill-current text-slate-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        className="mx-2 text-lg text-center w-8"
                        type="text"
                        value={product.product_qty}
                      />
                      <button
                        onClick={() =>
                          handleAddtocart(product, "ADDPRODUCT", "C", "cart")
                        }
                      >
                        <svg
                          className="fill-current text-slate-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div> */}
                  </div>
                </div>
              ))}
          </div>

          {/* Order Summary */}
          {cart?.data && (
            <div className="md:w-[340px] sm:w-screen col-span-2">
              <div className="bg-cart_bg p-5 rounded">
                <div className="flex justify-between mt-3 md:mt-1 mb-5">
                  <span className="font-normal text-sm mt-4 font-sans text-cart_desc">
                    Apply Coupons
                  </span>
                  <span className="text-right w-1/3">
                    <button className="p-2.5 text-sm font-sans font-bold bg-white text-cartred border border-cartred rounded">
                      Apply
                    </button>
                  </span>
                </div>

                <h1 className="font-sans font-bold text-xl border-t border-cart_hr pb-2 md:pb-2.5 md:pt-5">
                  Price Details
                </h1>
                <div className="flex justify-between mb-2">
                  <span className="text-sm md:text-base text-cart_desc">
                    Subtotal
                  </span>
                  <span className="text-center w-1/5 text-sm md:text-base text-cart_desc">
                    ${cart?.data[0]?.cart_total?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between md:mb-2">
                  <span className="text-sm md:text-base text-cart_desc">
                    Discount
                  </span>
                  <span className="text-center w-1/5 text-sm md:text-base text-cart_desc">
                    {" "}
                    -
                  </span>
                </div>
                <div className="flex justify-between md:mb-2">
                  <span className="text-sm md:text-base text-cart_desc">
                    Coupon Discount
                  </span>
                  <span className="text-center w-1/5 text-sm md:text-base text-cart_desc">
                    {" "}
                    -
                  </span>
                </div>
                <div className="flex justify-between md:mb-2">
                  <span className="text-sm md:text-base text-cart_desc">
                    Shipping
                  </span>
                  <span className="text-center w-1/5 text-sm md:text-base text-cart_desc">
                    {" "}
                    Free
                  </span>
                </div>

                <div className="border-t border-cart_hr mt-5">
                  <div className="flex font-bold justify-between py-2.5 text-sm md:text-base text-cart_desc ">
                    <span>Total Amount</span>
                    <span>${cart.data[0]?.cart_total.toFixed(2)}</span>
                  </div>

                  <LcsLink href="/checkout">
                    <LcsButton
                      uistyle="bg-cartred p-2 text-white w-full rounded h-12 font-sans"
                      content={cartt.checkout}
                    />
                  </LcsLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
{/* Save for later */}
      {
        Saveforlater?.data &&
         (Saveforlater.data[0].products.length > 0) &&
      
        <div className="container mx-auto mt-10 ">
          <div className="md:flex sm:flex-row my-10">
            <div className="md:w-[900px] md:mr-9 sm:w-screen bg-white py-1">
              <div className="flex justify-between  my-16 border-gray-700">
                <h1 className="font-semibold text-lg md:text-2xl font-sans">
                  Save For Later
                </h1>
              </div>
              <div className="hidden md:flex mt-10 mb-5">
                <div className="w-3/5">
                  <h3 className="font-semibold text-gray text-sm uppercase">
                    Product Details
                  </h3>
                </div>
                <div className="flex w-2/5 md:justify-center text-center">
                  <h3 className="font-semibold text-gray text-sm uppercase w-2/4">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-gray text-sm uppercase w-2/4">
                    Price
                  </h3>
                </div>
              </div>

              {Saveforlater?.data &&
                Saveforlater.data[0]?.products?.map((product, index) => (
                  <div key={index} className="cartdis">
                    <div className="w-full flex md:w-3/5">
                      <div className="w-20">
                        <LcsLink
                          key={index}
                          href={`/${tenantId.tenant}/pdp/${encodeURIComponent(
                            product.product_category
                          )}/${encodeURIComponent(product.product_title)}/${
                            product.product_id
                          }`}
                        >
                          <img
                            className="h-24"
                            src={product.product_img_url}
                            alt=""
                          />
                        </LcsLink>
                      </div>
                      <div className="flex flex-col md:justify-between ml-4 flex-grow">
                        <span className="text-sm md:text-lg">
                          {product.product_title}
                        </span>
                        <div className="flex flex-nowrap text-indigo-700">
                          <div className="mr-1 md:mr-8">
                            <button
                              className="btn"
                              onClick={() => handleRemoveItem(product, "S")}
                            >
                              <span className="">Remove</span>
                              <span className="block md:hidden">
                                <svg
                                  title="Remove"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4 text-red-600"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                          <div className="hidden md:block text-slate-300">|</div>
                          <div className="mr-1 md:mr-8">
                            <button
                              className="btn"
                              onClick={() => moveToWishList(product)}
                            >
                              <span className="hidden md:block">
                                Move to wishlist
                              </span>
                              <span className="block md:hidden">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5 text-red-600"
                                  alt="wishlist"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-row md:justify-center md:w-2/5 mt-3 md:mt-0">
                      <div className="flex md:justify-center w-2/4">
                        <button
                          className="btn"
                          onClick={() => handleRemoveItem(product, "S")}
                        >
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                        <input
                          className="mx-2 text-lg text-center w-8"
                          type="text"
                          value={product.product_qty}
                        />
                        <button onClick={() => moveToSavedForLater(product)}>
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-center font-semibold text-lg w-2/4">
                        ${product.product_sale_price}
                      </span>
                    </div>
                  </div>
                ))}

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
          </div>
        </div>
      }

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
      {/* fragment 2 */}
      <div className=" mx-auto mt-1 bg-white">
        <div className="flex shadow-md my-10">
          <div className="w-full  px-10 py-3">
            <h1 className="justity-center m-1 underline text-xl text-center">
              Based on previous purchase history
            </h1>
            <div className="w-11/12 overflow-hidden mx-auto">
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
    </>
  );
}

export default Cart;
