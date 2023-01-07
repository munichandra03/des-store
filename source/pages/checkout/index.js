import React from "react";
import Checkout from "@/components/checkout/index";

const index = () => {
  const formdata = {
    title: "Complete your purchases",
    shippingTitle: "Shipping Address",
    paymentTitle: "Select Payment Method",
    btnTxt: "Proceed to Checkout",
    amex: "Pay with American Express",
    visa: "Pay with Visa",
    mastercard: "Pay with MasterCard",
    checkboxTitle: "Save this information for next time",
  };

  const formNames = {
    firstName: "FirstName",
    lastName: "LastName",
    address1: "address1",
    address2: "Address2",
    city: "City",
    state: "state",
    country: "country",
    NameOnCard: "Name on card",
    CardNumber: "Card Number",
    ExpiryDate: "Expiry Date",
    CVV: "CVV",
  };

  const formValues = {
    firstname: "firstName",
    lastName: "LastName",
    email: "Email",
    address: "Address",
    city: "City",
    state:"state",
    postCode: "PostCode",
    cardNumber: "Card Number",
    day: "Expiration Day",
    month: "Expiration Month",
    year: "Expiration Year",
  };
  return (
    <Checkout content={formdata} values={formValues} names={formNames} />
  );
};

export default index;
