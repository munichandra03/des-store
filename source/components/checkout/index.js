import React, { useEffect, useState } from "react";
import { LcsLink } from "@/widgets/LcsLink";
import { Icons, CheckoutStyle } from "@/consts/style.consts";
import { LcsContent } from "@/widgets/LcsContent";
import { LcsInput } from "@/widgets/LcsInput";
import { LcsButton } from "@/widgets/LcsButton";
import { useRouter } from "next/router";
import API from "@/utils/httputils";
import config from "../../config.json";
import formatMessage from "format-message";
import { useDispatch, useSelector } from "react-redux";
import { CarouselStyles } from "../../consts/style.consts";
import Carousel from "@/widgets/Carosuel";
import data from "../../config/BestSellers.json";
import OrderConfirmed from "./Orderconfirmed";

const index = ({ content, values, names }) => {
  console.log("{ content, values, names }", { content, values, names });
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState("amex");

  const [checkoutForm, setCheckoutForm] = useState(true);
  const [reviewOrder, setReviewOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "hitesh",
    lastName: "bhargav",
    address1: "112/b",
    address2: "vikhroli",
    city: "mumbai",
    state: "maharashtra",
    zip: "400083",
    country: "india",
  });
  const [cart, setCart] = useState(null);
  // const [address, setAddress] = useState({
  //   firstName: "aniket",
  //   lastName: "yadav",
  //   address1: "vikhroli",
  //   address2: "west",
  //   city: "mumbai",
  //   state: "maha",
  //   zip: "400083",
  //   country: "india",
  // });

  // const [payment, setPayment] = useState([
  //   { name: "Card type", detail: "Visa" },
  //   { name: "Card holder", detail: "ANI" },
  //   { name: "Card number", detail: "123" },
  //   { name: "Expiry date", detail: "11" },
  //   { name: "Card CVV", detail: "1233" },
  // ]);
  const [payment, setPayment] = useState([
    {
      NameOnCard: "Hitesh",
      CardNumber: "141211231",
      ExpiryDate: "1998",
      CVV: "123",
    },
  ]);
  const [showErrorMsg, setshowErrorMsg] = useState("");
  const [orderData, setOrderData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [Saveforlater, setSaveforlater] = useState([]);
  const [tenantId, setTenantId] = useState("ncs");
  const [orderComplete, setOrderComplete] = useState([]);

  const getProducts = () => {
    let solrCollection = API.getSolrCollection();
    if (config.apiUrlData.viewCart !== "Banner") {
      API.getLogSearchService(
        formatMessage(config.apiUrlData.viewCart.part_url, {
          collection: solrCollection,
          typecart: "C",
        })
      ).then((data) => {
        setCart(data.response.data[0]);
      });
    }

    // document.body.className = "bg-slate-100";
  };

  useEffect(() => {
    getProducts();
  }, []);
  //count set for header cart
  useEffect(() => {
    if (cart !== []) {
      // const arrQtyVal = cart?.products?.map((item) => item.product_qty);
      // const initialValue = 0;
      // const sumWithInitial = arrQtyVal.reduce(
      //   (accumulator, currentValue) => accumulator + currentValue,
      //   initialValue
      // );
      // dispatch(incrementByNumber(sumWithInitial));
    }
  }, [cart]);

  const paymentCardBtnClickHandler = (event) => {
    const card = event.currentTarget.id;
    setSelectedCard(event.currentTarget.id);
    if (card === "amex") {
      console.log("amex");
    } else if (card === "visa") {
      console.log("visa");
    } else if (card === "masterCard") {
      console.log("masterCard");
    }
  };
  const placeOrder = async () => {
    debugger;
    let placedorder = cart;
    placedorder.payment_details = payment;
    placedorder.shipping_address = shippingDetails;
    const filterTotalProducts = [];
    placedorder.products.forEach((param) => {
      let products = {};
      products.product_id = param.product_id;
      products.product_title = param.product_title;
      products.product_sale_price = param.product_sale_price;
      products.product_qty = param.product_qty;
      products.product_manu_name = param.product_manu_name;
      products.product_category = param.product_category;
      filterTotalProducts.push(products);
    });
    placedorder.filterProducts = filterTotalProducts;
    try {
      let orderComplete = await API.postCartService(
        formatMessage(config.apiUrlData.checkout.part_url, {
          collection: API.getSolrCollection(),
          fragment: "ItemMLRecommendation",
        }), // 1
        placedorder, // 2
        undefined, // 3
        undefined, // 4
        undefined, // 5
        "purchase", // 6
        undefined, // 7
        undefined, // 8
        placedorder.cart_total === undefined ? 0 : placedorder.cart_total,
        placedorder.products.length === undefined
          ? 0
          : placedorder.products.length
      );
      if (orderComplete.response.status === 200) {
        API.sendClickSignal(
          undefined, //productId // 1
          "Cart Signal", // 2
          undefined, //facetTerm // 3
          "purchase", // 4
          undefined, // 5
          undefined, // 6
          undefined, // product_name // 7
          undefined, //category // 8
          undefined, // 9
          undefined, // 10
          undefined, //invoiceAmount
          placedorder.filterProducts, //totalProducts
          undefined, //13
          orderComplete.response.data.order_id, //14
          placedorder.cart_total
        );
        setOrderData(orderComplete.response.data);
      }
      setReviewOrder(false);
      setOrderSuccess(true);
      setCheckoutForm(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getProductsItemRecommendation = async (cartItems) => {
    try {
      if (cartItems === undefined) {
        return;
      }
      console.log(cartItems[0].products);
      if (cartItems[0].products.length === 0) {
        return;
      }
      let productsIds = cartItems[0].products.map((ele) => ele.product_id);
      let productIdString = productsIds.join();
      let relatedProducts = await API.getLogSearchService(
        formatMessage(
          config.apiUrlData.ItemMLRecommendation[api.getSysEnv()].part_url,
          {
            collectionId: API.getSolrCollection(),
            productId: productIdString,
          }
        )
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
      setrelatedProducts([]);
    }
  };
  const getCartDetails = async () => {
    try {
      // this.setState({ isLoading: true });
      setisLoading(true);
      let cartResult = await API.getCartService(
        formatMessage(config.apiUrlData.viewCart.part_url, {
          collection: API.getSolrCollection(),
          typecart: "C",
        })
      );

      setisLoading(false);
      setcartItems(
        cartResult.response.data.length != 0
          ? cartResult.response.data[0].products
          : cartResult.response.data
      );
      setcartTotal(
        cartResult.response.data.length != 0
          ? cartResult.response.data[0].cart_total.toFixed(2)
          : "0"
      );
      props.handleAddItemToCart(cartItems);
      props.handleAddItemToCartTotal(cartTotal);
      getProductsItemRecommendation(cartResult.response.data);
      getCartProductsMLRecommendation();
    } catch (e) {
      console.log(e);
      setisLoading(false);
    }
  };
  return (
    <>
      {checkoutForm && (
        <div className="my-20">
          <LcsContent
            uistyle={CheckoutStyle.maintitle()}
            content={content.title}
          />
          <div className={CheckoutStyle.root()}>
            <div className={CheckoutStyle.container()}>
              <LcsContent
                uistyle={CheckoutStyle.title()}
                content={content.shippingTitle}
              />
              <form className={CheckoutStyle.form()}>
                <div className={CheckoutStyle.formsection()}>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.firstName}
                      uistyle={CheckoutStyle.input()}
                      label={names.firstName}
                      name={values.firstname}
                      type="text"
                      // action={eventHandler}
                      value={shippingDetails.firstName}
                      // eventHandler={(e) =>
                      //   console.log('e.target.value', e.target.value)
                      // }
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          firstName: e.target.value,
                        })
                      }
                    />
                    {/* <input
                      type="text"
                      placeholder="enter first name"
                      className="border"
                      value={shippingDetails.firstName}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          firstName: e.target.value,
                        })
                      }
                    /> */}
                  </div>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.lastName}
                      uistyle={CheckoutStyle.input()}
                      label={names.lastName}
                      name={values.lastName}
                      type="text"
                      value={shippingDetails?.lastName}
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={CheckoutStyle.spacing()}>
                  <div className={CheckoutStyle.fullwidth()}>
                    <LcsInput
                      id={values.address1}
                      uistyle={CheckoutStyle.input()}
                      label={names.address1}
                      name={values.address1}
                      type="text"
                      value={shippingDetails?.address1}
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          address1: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={CheckoutStyle.spacing()}>
                  <div className={CheckoutStyle.fullwidth()}>
                    <LcsInput
                      id={values.address2}
                      uistyle={CheckoutStyle.input()}
                      label={names.address2}
                      name={values.address2}
                      type="textarea"
                      value={shippingDetails?.address2}
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          address2: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={CheckoutStyle.paymentsection()}>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.city}
                      uistyle={CheckoutStyle.input()}
                      label={names.city}
                      name={values.city}
                      type="text"
                      value={shippingDetails?.city}
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.state}
                      uistyle={CheckoutStyle.input()}
                      label={names.state}
                      name={values.state}
                      type="text"
                      value={shippingDetails?.state}
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.country}
                      uistyle={CheckoutStyle.input()}
                      label={names.country}
                      name={values.country}
                      type="text"
                      value={shippingDetails?.country}
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          country: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={CheckoutStyle.check()}>
                  <LcsInput
                    id={values.postCode}
                    uistyle={CheckoutStyle.input()}
                    name={values.postCode}
                    type="checkbox"
                    value={shippingDetails?.postcode}
                    aciton={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        postcode: e.target.value,
                      })
                    }
                  />
                  {content.checkboxTitle}
                </div>
              </form>
              {/* payment section */}
              <LcsContent
                uistyle={CheckoutStyle.subTitle()}
                content={content.paymentTitle}
              />
              <form className={CheckoutStyle.form()} method="post" action>
                <span
                  className={
                    selectedCard === "amex"
                      ? CheckoutStyle.paymentCardbtnSelected()
                      : CheckoutStyle.paymentCardbtn()
                  }
                >
                  <Icons.amex />
                  <LcsButton
                    content={content.amex}
                    action={paymentCardBtnClickHandler}
                    buttonId="amex"
                  />
                </span>
                <span
                  className={
                    selectedCard === "visa"
                      ? CheckoutStyle.paymentCardbtnSelected()
                      : CheckoutStyle.paymentCardbtn()
                  }
                >
                  <Icons.visa />
                  <LcsButton
                    content={content.visa}
                    action={paymentCardBtnClickHandler}
                    buttonId="visa"
                  />
                </span>
                <span
                  className={
                    selectedCard === "masterCard"
                      ? CheckoutStyle.paymentCardbtnSelected()
                      : CheckoutStyle.paymentCardbtn()
                  }
                >
                  <Icons.mastercard />
                  <LcsButton
                    content={content.mastercard}
                    action={paymentCardBtnClickHandler}
                    buttonId="masterCard"
                  />
                </span>
                <div className={CheckoutStyle.spacing()}>
                  <div className={CheckoutStyle.fullwidth()}>
                    <LcsInput
                      id={values.NameOnCard}
                      uistyle={CheckoutStyle.input()}
                      label={names.NameOnCard}
                      name={values.NameOnCard}
                      type="text"
                      value={payment[0].NameOnCard}
                      action={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={CheckoutStyle.cardSection()}>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.CardNumber}
                      uistyle={CheckoutStyle.input()}
                      label={names.CardNumber}
                      name={values.CardNumber}
                      type="text"
                      value={payment[0].CardNumber}
                    />
                  </div>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.ExpiryDate}
                      uistyle={CheckoutStyle.input()}
                      label={names.ExpiryDate}
                      name={values.ExpiryDate}
                      type="text"
                      value={payment[0].ExpiryDate}
                    />
                  </div>
                  <div className={CheckoutStyle.formwidth()}>
                    <LcsInput
                      id={values.CVV}
                      uistyle={CheckoutStyle.input()}
                      label={names.CVV}
                      name={values.CVV}
                      type="text"
                      value={payment[0].CVV}
                    />
                  </div>
                </div>
              </form>
              <LcsButton
                uistyle={CheckoutStyle.btn()}
                content={content.btnTxt}
                action={() => {
                  setReviewOrder(true);
                  setCheckoutForm(false);
                }}
              />
            </div>
          </div>
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
        </div>
      )}{" "}
      {reviewOrder && (
        <div>
          {/* call cart api */}
          <div className="shadow-xl">
            <div className="md:w-6/6 sm:w-screen bg-white px-96">
              <div className="flex justify-between  border-b border-gray-300">
                <h1 className="text-lg font-semibold md:text-2xl">
                  Review Your order
                </h1>
                {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
              </div>
              {cart !== [] &&
                cart?.products?.map((product, index) => (
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
              {/* {cart !== [] && (
                <div className="flex font-semibold justify-between py-6 text-sm md:text-lg ">
                  <span>Total Cost</span>
                  <span>${cart.cart_total.toFixed(2)}</span>
                </div>
              )} */}
              {/* <LcsLink href="/checkout">
                  <LcsButton
                    uistyle={cartfullPage.btn()}
                    content={cartt.checkout}
                  />
                </LcsLink> */}
              <div className="pl-96">
                <LcsLink href="/checkout">
                  <button
                    className="bg-transparent hover:bg-indigo-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => setReviewOrder(false)}
                  >
                    back
                  </button>{" "}
                </LcsLink>
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-black font-bold py-2 px-4 rounded"
                  onClick={() => placeOrder()}
                >
                  PLACE ORDER
                </button>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/4">
                  <h1 className="font-bold">Shipping</h1>
                  <h2>{shippingDetails.firstName}</h2>
                  <h2>{shippingDetails.lastName}</h2>
                  <h2>{shippingDetails.address1}</h2>
                  <h2>{shippingDetails.address2}</h2>
                  <h2>{shippingDetails.city}</h2>
                  <h2>{shippingDetails.state}</h2>
                  <h2>{shippingDetails.zip}</h2>
                  <h2>{shippingDetails.country}</h2>
                </div>
                <div className="basis-1/2">
                  <h1 className="font-bold">Shipping</h1>
                  <h2>{payment[0].NameOnCard}</h2>
                  <h2>{payment[0].CardNumber}</h2>
                  <h2>{payment[0].ExpiryDate}</h2>
                  <h2>{payment[0].CVV}</h2>
                </div>
              </div>
              
            </div>
          </div>
          {/* render upar wale component ka data form wala */}
        </div>
      )}
      {orderSuccess && (
        <div>
          <OrderConfirmed
            content={{
              title: "Your Order Has been Recieved",
              subtitle: "Thank You For Your Purchase !",
              orderId: `Your order ID : ${""}`,
              orderConfirm:
                "You will recieve an order confirmation mail with details of your order",
              btnTitle: "Continue shopping",
            }}
          />
        </div>
      )}
    </>
  );
};
export default index;
