import React from "react";
import OrderSuccessMsg from "../../widgets/OrderSuccessMsg";

export default function OrderConfirmed({ content }) {
  return <OrderSuccessMsg content={content} />;
}
