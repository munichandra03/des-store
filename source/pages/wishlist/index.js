import { CarouselStyles } from "@/consts/style.consts";
import Carousel from "@/widgets/Carosuel";
import data from "../../config/BestSellers.json";
import { useEffect, useState } from "react";
import API from "@/utils/httputils";
import config from "../../config.json";
import formatMessage from "format-message";
import {
  DEFAULT_SEARCH_TERM,
  getItemfromSessionStorage,
} from "../../utils/storageutils";
import { getUserSeg } from "../../utils/storageutils";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { LcsLink } from "@/widgets/LcsLink";

function Wishlist() {
  const [Wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.total);

  const handleRemoveItem = async (product, index) => {
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
      product_cart_type: "W",
      product_category: product.product_category,
    };
    try {
      let addtocartResult = await API.postCartService(
        formatMessage(config.apiUrlData.deleteFromCart.part_url, {
          collection: API.getSolrCollection(),
          prodindex: product._id,
        }),
        delFromCartObj,
        product.product_id, //productid for signal,
        getItemfromSessionStorage(DEFAULT_SEARCH_TERM), //undefined,
        undefined,
        "cartremove",
        null,
        product.product_category, //categoryId for signal
        product.product_sale_price,
        1
      );

      getWishlist();
    } catch (e) {
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
        null,
        product.product_category, //categoryId for signal
        product.product_sale_price,
        1
      );
      getWishlist();
    } catch (e) {
      console.log(e);
    }
  };

  const handleMoveToCart = async (
    productDetails,
    cartaction,
    carttype,
    signaltype
  ) => {
    let AddToCartObj = {
      product_id: productDetails.product_id,
      product_title: productDetails.product_title,
      product_qty: productDetails.product_qty,
      product_img_url:
        productDetails.product_img_url != undefined
          ? productDetails.product_img_url
          : collconfig.getSmallImgSrcFromImageUrls(
              productDetails.product_img_url
            ),
      product_actual_price: productDetails.product_actual_price,
      product_sale_price: productDetails.product_sale_price
        ? productDetails.product_sale_price
        : 0,
      product_manu_id: productDetails.product_manu_id,
      product_manu_name: productDetails.product_manu_name,
      product_segment_type:
        productDetails.product_segment_type ||
        //localStorage.getItem('com_user_segment')
        getUserSeg(),
      product_cart_action_type: cartaction,
      product_cart_type: carttype,
      product_name: productDetails.product_title,
      product_category: productDetails.product_category,
    };

    carttype === "C" && dispatch(addToCart(productDetails.product_qty));
    try {
      let addtocartResult = await API.postCartService(
        formatMessage(config.apiUrlData.addToCart.part_url, {
          collection: API.getSolrCollection(),
        }),
        AddToCartObj,
        productDetails.product_id, //productid for signal
        undefined, //searchTerm for signal
        undefined, //facetTerm for signal
        signaltype,
        productDetails.product_title,
        productDetails.product_category, //categoryId for signal
        productDetails.product_sale_price,
        1
      );

      //matomo
      // matomoutils.trackapi(
      //   'removeEcommerceItem',
      //   productDetails._id,
      //   productDetails.Title,
      //   // productDetails.L2Category,
      //   productDetails.SalePrice,
      //   productDetails.product_qty,

      // );

      // console.log("cart type " + carttype);
      getWishlist();
    } catch (e) {
      console.log(e);
    }
  };

  const getWishlist = () => {
    let solrCollection = API.getSolrCollection();
    if (config.apiUrlData.viewCart !== "Banner") {
      API.getLogSearchService(
        formatMessage(config.apiUrlData.viewCart.part_url, {
          collection: solrCollection,
          typecart: "W",
        })
      ).then((data) => setWishlist(data.response));

      // console.log(data.response);
      // console.log(cart);
      document.body.className = "bg-slate-100";
    }
  };
  useEffect(() => {
    getWishlist();
  }, []);

  // const handleAddtocart = async (
  //   prodData, // product data
  //   cartaction, // ADDPRODUCT
  //   carttype, // C
  //   signaltype, // cart
  //   isBuyNow // true
  // ) => {
  //   let searchTerm = "";

  //   // searchTerm =
  //   //   productFragment === undefined ||
  //   //   productFragment === null ||
  //   //   productFragment === ""
  //   //     ? localStorage.getItem("com_searchTerm")
  //   //     : productFragment;

  //   let searchFacets = { brand: [], l1cat: [], l2cat: [] };
  //   let facetJson = {};
  //   if (searchFacets.brand.length !== 0) {
  //     facetJson.Brand = searchFacets.brand;
  //   }
  //   if (searchFacets.l1cat.length !== 0) {
  //     facetJson.L1Category = searchFacets.l1cat;
  //   }
  //   if (searchFacets.l2cat.length !== 0) {
  //     facetJson.L2Category = searchFacets.l2cat;
  //   }

  //   let facetString = JSON.stringify(facetJson);
  //   let facetTerm = facetString === "{}" ? null : facetString;

  //   let AddToCartObj = {
  //     product_id: prodData.id,
  //     product_title: prodData.Title,
  //     product_qty: prodQty, // get qty from pdp
  //     product_img_url:
  //       prodData.ImageUrl != undefined
  //         ? prodData.ImageUrl
  //         : collConfig.getSmallImgSrcFromImageUrls(prodData.ImageUrls),
  //     product_actual_price: prodData.ListPrice,
  //     product_sale_price: prodData.SalePrice ? prodData.SalePrice : 0,
  //     product_manu_id: prodData.id,
  //     product_manu_name: prodData.Brand,
  //     product_segment_type: getUserSeg(),
  //     product_cart_action_type: cartaction,
  //     product_cart_type: carttype,
  //     product_name: prodData.Title,
  //     product_category: prodData.L1Category,
  //   };
  //   try {
  //     // TODO
  //     // dont have drawerCartItems right now, but we need one
  //     if (drawerCartItems == null || drawerCartItems.length < 50) {
  //       let addtocartResult = await API.postCartService(
  //         formatMessage(config.apiUrlData.addToCart.part_url, {
  //           collection: API.getSolrCollection(),
  //         }),
  //         AddToCartObj,
  //         prodData.id, //productid for signal
  //         searchTerm, //searchTerm for signal
  //         facetTerm, //facetTerm for signal
  //         signaltype,
  //         prodData.Title,
  //         prodData.L1Category, //categoryId for signal
  //         AddToCartObj.product_sale_price,
  //         AddToCartObj.product_qty
  //       );
  //     }
  //     if (isBuyNow) {
  //       // this.props.history.push("/checkout");
  //       alert("/checkout");
  //     } else {
  //       switch (carttype) {
  //         case "C":
  //           if (dontShowReco) {
  //             // TODO
  //             // dontShowReco was hardcoded true and it will always be true
  //             let drawerCartItems = null;
  //             if (drawerCartItems == null || drawerCartItems.length < 50) {
  //               const message = "Item added to Cart";
  //               alert(message);
  //             } else {
  //               let message = ```Order Limit
  //               Reduce cart item to maximum of 50 to add new items!```;
  //               alert(message);
  //             }
  //           } else {
  //             if (drawerCartItems == null || drawerCartItems.length < 50) {
  //               // this.props.history.push('/cart');
  //               if (drawerCartItems == null || drawerCartItems.length < 50) {
  //                 const message = "Item added to Cart";
  //                 alert(message);
  //               } else {
  //                 let message = ```Order Limit
  //                 Reduce cart item to maximum of 50 to add new items!```;
  //                 alert(message);
  //               }
  //             } else {
  //               let message = ```Order Limit
  //               Reduce cart item to maximum of 50 to add new items!```;
  //               alert(message);
  //             }
  //           }
  //           break;
  //         case "W":
  //           // this.props.history.push('/wishlist');
  //           if (dontShowReco) {
  //             const message = "Item added to WishList";
  //             alert(message);
  //           } else {
  //             // this.props.history.push("/wishlist");
  //             alert("/wishlist");
  //           }
  //           break;
  //         default:
  //           // this.props.history.push("/checkout");
  //           alert("/checkout");
  //           break;
  //       }
  //     }
  //     console.log("cart type " + carttype);
  //     //this.getCartDetails();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const Wishlist = {
  //   product: [
  //     {
  //       id: 1,
  //       name: "Throwback Hip Bag",
  //       href: "#",
  //       color: "Salmon",
  //       price: "$90.00",
  //       quantity: 2,
  //       imageSrc:
  //         "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  //       imageAlt:
  //         "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  //     },
  //     {
  //       id: 2,
  //       name: "Medium Stuff Satchel",
  //       href: "#",
  //       color: "Blue",
  //       price: "$32.00",
  //       quantity: 6,
  //       imageSrc:
  //         "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
  //       imageAlt:
  //         "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  //     },

  //   ],
  //   title: "Your Wishlist",

  //   total: "Total cost",
  //   price: "$262.00",
  //   shippingtext: "Shipping",
  //   subtotal: "Subtotal",
  //   checkout: "Checkout",
  //   remove: "Remove",
  //   Saveforlater: "Save for later",
  //   movetocart: "Move to Cart",
  //   shop: "Continue Shopping",
  //   shipping: "$600",
  //   totalPrice: "$1200",
  // };

  return (
    <>
      {/* your cart and order summary start here */}
      <div className="container mx-auto mt-10">
        <div className="md:flex sm:flex-row shadow-md my-10">
          <div className="md:w-3/4 sm:w-screen bg-white px-10 py-4">
            <div className="flex justify-between border-b border-gray-300">
              <h1 className="text-lg font-semibold md:text-2xl">
                {Wishlist.title ? Wishlist.title : "Your Wishlist"}
              </h1>
              {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
            </div>
            {Wishlist?.data &&
              (Wishlist.data[0].products.length == 0) ? <div className="text-bold text-2xl">Your wishlist is empty</div>:
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
            } 
            {Wishlist?.data &&
              Wishlist.data[0]?.products?.map((product, index) => (
                <div
                  key={index}
                  className="cartdis"
                >
                  <div className="w-full flex md:w-3/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src={product.product_img_url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col md:justify-between ml-4 flex-grow">
                      <span className="text-sm md:text-lg">
                        {product.product_title}
                      </span>
                      <span className="text-xs">{product.color}</span>
                      <div className="flex flex-nowrap text-indigo-700 my-2 mr-8">
                        <div className="mr-1 md:mr-8">
                          <button
                            className="bg-blue-500 hover:text-black w-full rounded text-xs md:text-sm"
                            onClick={() => handleRemoveItem(product, index)}
                          >
                            <span className="hidden md:block">Remove</span>
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
                            className="ml-1 md:ml-4 bg-blue-500 hover:text-black w-full rounded text-xs md:text-sm"
                            onClick={() =>
                              handleMoveToCart(
                                product,
                                "ADDPRODUCT",
                                "C",
                                "cart"
                              )
                            }
                          >
                            <span className="hidden md:block">
                              Move To Cart
                            </span>
                            <span className="block md:hidden">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>

                        <div className="hidden md:block text-slate-300">|</div>
                        <div className="mr-1 md:mr-8">
                          <button
                            className="ml-1 md:ml-4 bg-blue-500 hover:text-black w-full rounded text-xs md:text-sm"
                            onClick={() => moveToSavedForLater(product, index)}
                          >
                            <span className="hidden md:block">
                              Save for later
                            </span>
                            <span className="block md:hidden">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
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
                      <input
                        className="mx-2 text-lg text-center w-8"
                        type="text"
                        value={product.product_qty}
                      />
                    </div>
                    <span className="text-center font-semibold text-lg w-2/4">
                      ${product.product_sale_price}
                    </span>
                  </div>
                </div>
              ))}

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
      {/* your cart and order summary end here */}

      <div className="container mx-auto mt-1">
        <div className="flex shadow-md my-10">
          <div className="w-full bg-white px-10 py-3">
            <h1 className="justity-center m-1 underline text-xl text-center">
              Products related to items in your Wishlist
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

export default Wishlist;
