import React from "react";
import { LcsLink } from "@/widgets/LcsLink";
import { OrderConfirm } from "../consts/style.consts";
import { Content } from "../widgets/Content";

export default function OrderSuccessMsg({ content }) {
  return (
    <div className={OrderConfirm.root()}>
      <Content uistyle={OrderConfirm.title()} content={content?.title} />
      <div className={OrderConfirm.container()}>
        <span className={OrderConfirm.content()}>
          <img src="/done.svg" alt="done" width={100} height={100} />
        </span>
      </div>
      <Content
        content={content?.subtitle}
        uistyle={OrderConfirm.firstChildP()}
      />
      <Content
        content={content?.orderId}
        uistyle={OrderConfirm.secondChildP()}
      />
      <Content
        content={content?.orderConfirm}
        uistyle={OrderConfirm.thirdChildP()}
      />
      <div className={OrderConfirm.btnmargin()}>
        <svg
          className="fill-current mr-2 text-indigo-600 w-4"
          viewBox="0 0 448 512"
        >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        <LcsLink
          href="/"
          content={content?.btnTitle}
          classes={OrderConfirm.btn()}
        />
      </div>
    </div>
  );
}
