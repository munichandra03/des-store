import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { LcsContent } from "@/widgets/LcsContent";
import config from "../../config.json";
import API from "@/utils/httputils";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { getUserSeg } from "@/utils/storageutils";
import formatMessage from "format-message";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const reviews = { href: "/", average: 4, totalCount: 117 };

export default function ProductQuickViewOptions({ uiconfig, content }) {
  const dispatch = useDispatch();
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

  // const [selectedColor, setSelectedColor] = useState(content.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(content.sizes[2]);
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
      debugger;
      // TODO
      // dont have drawerCartItems right now, but we need one
      if (true) {
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
        toast("Product add to cart", {
          className: "font-bold",
          hideProgressBar: true,
          autoClose: 500,
          type: "success",
          position: "bottom-left",
        });
      }
      // if (isBuyNow) {
      //   // this.props.history.push("/checkout");
      //   alert("/checkout");
      // } else {
      //   switch (carttype) {
      //     case "C":
      //       if (dontShowReco) {
      //         // TODO
      //         // dontShowReco was hardcoded true and it will always be true
      //         let drawerCartItems = null;
      //         if (drawerCartItems == null || drawerCartItems.length < 50) {
      //           const message = "Item added to Cart";
      //         } else {
      //           let message = ```Order Limit
      //           Reduce cart item to maximum of 50 to add new items!```;
      //           alert(message);
      //         }
      //       } else {
      //         if (drawerCartItems == null || drawerCartItems.length < 50) {
      //           // this.props.history.push('/cart');
      //           if (drawerCartItems == null || drawerCartItems.length < 50) {
      //             const message = "Item added to Cart";
      //             alert(message);
      //           } else {
      //             let message = ```Order Limit
      //             Reduce cart item to maximum of 50 to add new items!```;
      //             alert(message);
      //           }
      //         } else {
      //           let message = ```Order Limit
      //           Reduce cart item to maximum of 50 to add new items!```;
      //           alert(message);
      //         }
      //       }

      //       break;
      //     case "W":
      //       // this.props.history.push('/wishlist');
      //       if (dontShowReco) {
      //         const message = "Item added to WishList";
      //         // alert(message);
      //       } else {
      //         // this.props.history.push("/wishlist");
      //         alert("/wishlist");
      //       }
      //       break;
      //     default:
      //       // this.props.history.push("/checkout");
      //       alert("/checkout");
      //       break;
      //   }
      // }
      //this.getCartDetails();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {/* Options */}
      <div className={uiconfig.cart.space}>
        <LcsContent
          uiconfig={uiconfig.cart.priceTxt}
          content={"$" + content.SalePrice}
        />

        {/* Reviews */}
        <div className={uiconfig.info.mt6}>
          <h3 className={uiconfig.cart.review}>{content.Brand}</h3>
          <div className={uiconfig.cart.ratingPos}>
            <div className={uiconfig.cart.ratingPos}>
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    reviews.average > rating
                      ? "text-gray-900"
                      : "text-gray-200",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>

            <LcsContent
              uiconfig={uiconfig.cart.review}
              content={reviews.average}
            >
              out of 5 stars
            </LcsContent>
          </div>
        </div>

        {/* Colors */}
        <div className="">
          Sizes
          {/* <LcsRadioGroup /> */}
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
        {/* <form className={uiconfig.info.mt10}> */}
        <button
          type="submit"
          className={uiconfig.button}
          onClick={() => handleAddtocart(content, "ADDPRODUCT", "C", "cart")}
        >
          Add To Cart
        </button>
        {/* </form> */}
      </div>
    </>
  );
}
