// import React from "react";

// const Checkoutfinal = () => {
//   return (
//     <>
//       <div>
//         hey
//       </div>
//     </>
//   );
// };
// export default Checkoutfinal;

import { cartfullPage, Icons } from "../../consts/style.consts";
import { CarouselStyles } from "../../consts/style.consts";
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

// import snackbar from "../snackbar";

import { useDispatch, useSelector } from "react-redux";
import {
  incrementByNumber,
  addToCart,
  removeFromCart,
} from "@/redux/store/slices/cartSlice";

const instanceMap = [
  { collection: "NewCommerceSolr", tenant: "ncs" },
  { collection: "KamanSolr", tenant: "kcs" },
  { collection: "BBBCommerceSolr", tenant: "bbb" },
  { collection: "PrideCommerceSolr", tenant: "pcs" },
  { collection: "WineCommerceSolr", tenant: "wcs" },
  { collection: "DPFCommerceSolr", tenant: "dpf" },
  { collection: "AutoCommerceSolr", tenant: "acs" },
];

function Checkoutfinal(prodData) {
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

  // const [count, setCount] = useState();

  const router = useRouter();
  const { slug } = router.query;
  const [currImg, setCurrImg] = useState("");
  const [drawerCartItems, setDrawerCartItems] = useState(null);
  const [prodQty, setProdQty] = useState(1);
  const [dontShowReco, setDontShowReco] = useState(true);
  const [prodAttrib, setProdAttrib] = useState("2");
  // const [tabState, setTab] = useState(intial);

  const [cart, setCart] = useState([]);
  const [Saveforlater, setSaveforlater] = useState([]);
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [showErrorMsg, setshowErrorMsg] = useState("");
  const [payments, setPayments] = useState({});
  const [orderData, setOrderData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [cartItems, setcartItems] = useState([]);


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
      const sumWithInitial = arrQtyVal.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      dispatch(incrementByNumber(sumWithInitial));
    }
  }, [cart]);

  
  const getCartDetails = async () => {
    try {
      // this.setState({ isLoading: true });
      setisLoading(true);
      let cartResult = await API.getCartService(
        formatMessage(config.apiUrlData.viewCart.part_url, {
          collection: API.getSolrCollection(),
          typecart: 'C'
        }),
      );

      setisLoading(false);
      setcartItems(cartResult.response.data.length != 0 ? cartResult.response.data[0].products : cartResult.response.data);
      setcartTotal(cartResult.response.data.length != 0 ? cartResult.response.data[0].cart_total.toFixed(2) : '0');
      props.handleAddItemToCart(cartItems);
      props.handleAddItemToCartTotal(cartTotal);
      getProductsItemRecommendation(cartResult.response.data);
      getCartProductsMLRecommendation();
    } catch (e) {
      console.log(e);
      setisLoading(false);
    }
  };
  
  const handleNext = () => {
    // setActiveStep(activeStep + 1);
  
    if (activeStep + 1 === 3) {
      placeOrder();                     
    }

    if (activeStep === 2) {
      getCartDetails()
    }
  };

  const placeOrder = async () => {
    let placedorder = cart[0];
    placedorder.payment_details = payments;
    placedorder.shipping_address = address;
    const filterTotalProducts = [];
    placedorder.products.forEach(param => {
      let products = {}
      products.product_id = param.product_id
      products.product_title = param.product_title
      products.product_sale_price = param.product_sale_price
      products.product_qty = param.product_qty
      products.product_manu_name = param.product_manu_name
      products.product_category = param.product_category
      filterTotalProducts.push(products);
    });
    placedorder.filterProducts = filterTotalProducts;
    try {
      let orderComplete = await API.postCartService(
        formatMessage(config.apiUrlData.checkout.part_url, {
          collection: API.getSolrCollection(),
          fragment: 'ItemMLRecommendation'
        }), // 1
        placedorder, // 2
        undefined, // 3
        undefined, // 4
        undefined, // 5
        'purchase', // 6
        undefined, // 7
        undefined,  // 8
        placedorder.cart_total === undefined ? 0 : placedorder.cart_total,
        placedorder.products.length === undefined ? 0 : placedorder.products.length
      );
      if (orderComplete.response.status === 200) {
        API.sendClickSignal(
          undefined //productId // 1
          , 'Cart Signal' // 2
          , undefined//facetTerm // 3
          , 'purchase' // 4
          , undefined // 5
          , undefined // 6
          , undefined // product_name // 7
          , undefined //category // 8
          , undefined // 9
          , undefined // 10
          , undefined //invoiceAmount
          , placedorder.filterProducts //totalProducts
          , undefined //13
          , orderComplete.response.data.order_id //14
          , placedorder.cart_total,
        );
        setOrderData(orderComplete.response.data);
      }
    } catch (e) {
      console.log(e)
    }
  };

const getProductsItemRecommendation = async cartItems => {
    try {
      if (cartItems === undefined) {
        return
      }
      console.log(cartItems[0].products);
      if (cartItems[0].products.length === 0) {
        return
      }
      let productsIds = cartItems[0].products.map(ele => ele.product_id);
      let productIdString = productsIds.join();
      let relatedProducts = await API.getLogSearchService(
        formatMessage(config.apiUrlData.ItemMLRecommendation[api.getSysEnv()].part_url, {
          collectionId: API.getSolrCollection(),
          productId: productIdString,
        }),
      );
      if (relatedProducts.response.data.response !== undefined) {
        setisRelatedLoading(false);
        setrelatedProducts(relatedProducts.response.data.response);
        setisRelatedProducts(true);



      } else {
        setisRelatedProducts(false);
        setisRelatedLoading(false);
        setrelatedProducts([]);

      }
    } catch (e) {
      setisRelatedLoading(false);
      setisRelatedProducts(false);
      setrelatedProducts([])

    }
  };
  return (
    <>
      <div className="shadow-xl">
        <div className="md:w-6/6 sm:w-screen bg-white px-96">
          <div className="flex justify-between  border-b border-gray-300">
            <h1 className="text-lg font-semibold md:text-2xl">
              Review Your order
            </h1>
            {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
          </div>
          {cart?.data &&
            cart.data[0]?.products?.map((product, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b border-gray-300"
              >
                <div className="flex w-4/5">
                  <div className="w-20">
                    <img
                      className="h-24"
                      src={product.product_img_url}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col md:justify-between  flex-grow">
                    <span className="">
                      <LcsLink
                        href={`/${tenantId.tenant}/pdp/${encodeURIComponent(
                          product.product_category
                        )}/${encodeURIComponent(product.product_title)}/${
                          product.product_id
                        }`}
                        key={index}
                        content={product.product_title}
                        classes="text-sm md:text-lg"
                      />
                    </span>
                    {/* <span className="text-red-500 text-xs">Apple</span> */}
                    <div className="flex flex-nowrap text-indigo-700 my-2 mr-8"></div>
                  </div>
                </div>
                <div className="w-full flex flex-row md:justify-center md:w-2/5 mt-3 md:mt-0">
                  <span className="text-center font-semibold text-lg w-2/4">
                    ${product.product_sale_price}
                  </span>
                </div>
                
              </div>
              
            ))}
             {cart?.data && (
            <div className="flex font-semibold justify-between py-6 text-sm md:text-lg ">
            <span>Total Cost</span>
            <span>${cart.data[0].cart_total.toFixed(2)}</span>
          </div>
             )}
          {/* <LcsLink href="/checkout">
                  <LcsButton
                    uistyle={cartfullPage.btn()}
                    content={cartt.checkout}
                  />
                </LcsLink> */}
           <div className="pl-96">
          <LcsLink href="/checkout">
            <button className="bg-transparent hover:bg-indigo-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded">back</button>{" "}
          </LcsLink>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-black font-bold py-2 px-4 rounded"
           onClick={() => placeOrder()}
          >
            PLACE ORDER
          </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkoutfinal;
