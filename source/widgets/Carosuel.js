import React, { useState } from "react";
import { CarouselStyles, Icons } from "@/consts/style.consts";
import ProductCard from "@/components/product/ProductCard";
import ProductQuickView from "@/components/product/ProductQuickView";

const Carousel = ({ data, title, index }) => {
  const [quickViewModal, setQuickViewModal] = useState({
    isModal: false,
    product: {},
  });

  let defaultTransform = 0;
  let carouselId = index
    ? `${index}_slider`
    : `${Math.floor(Math.random() * 1000)}_slider`;

  function goNext() {
    defaultTransform = defaultTransform - 398;
    var slider = document.getElementById(carouselId);
    if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7)
      defaultTransform = 0;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  }

  function goPrev() {
    var slider = document.getElementById(carouselId);
    if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
    else defaultTransform = defaultTransform + 398;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  }

  const handleQuickView = (product, state) => {
    console.log("product, state", product, state);
    setQuickViewModal({ ...quickViewModal, isModal: true, product: product });
  };
  return (
    <>
      {data && data.response?.docs.length > 0 && (
        <div className="">
          <h2 className="font-thin text-2xl leading-8 underline underline-offset-8 text-center">
            {title}
          </h2>
          <div className={CarouselStyles.root()}>
            <button
              onClick={goPrev}
              className={CarouselStyles.iconPrev()}
              id="prev"
            >
              <Icons.Previous />
            </button>
            <div className={CarouselStyles.container()}>
              <div className={CarouselStyles.carousel()}>
                <div
                  id={carouselId}
                  className={CarouselStyles.carouselPosition()}
                >
                  {data &&
                    data.response?.docs.map((product, index) => {
                      return (
                        <>
                          <ProductCard
                            key={index}
                            fragJSON={product}
                            data={data.responseHeader}
                            quickView={handleQuickView}
                          />
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
            <button
              onClick={goNext}
              className={CarouselStyles.iconNext()}
              id="next"
            >
              <Icons.Next />
            </button>
          </div>
        </div>
      )}
      {quickViewModal.isModal && (
        <ProductQuickView
          content={quickViewModal.product}
          uiconfig={product.uiconfig}
          onClose={() =>
            setQuickViewModal({ ...quickViewModal, isModal: false })
          }
          openval={quickViewModal.isModal}
        />
      )}
    </>
  );
};

export default Carousel;
const product = {
  uiconfig: {
    bg: [
      "mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8",
    ],
    blockLg: [
      "aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block",
    ],
    blockh2: ["aspect-w-3 aspect-h-2 overflow-hidden rounded-lg"],
    hwFull: ["h-full w-full object-cover object-center"],
    nav: {
      listbg: [
        "mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8",
      ],
      uilist: ["mr-2 text-sm font-medium text-gray-900"],
      listSpacing: ["flex items-center"],
      liText: ["font-medium text-gray-500 hover:text-gray-600"],
      txtsm: "text-sm",
    },
    info: {
      bg: [
        "mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24",
      ],
      border: ["lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"],
      layout: [
        "py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8",
      ],
      header: ["text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"],
      details: ["text-sm text-gray-600"],
      uiSubheader: ["text-sm font-medium text-gray-900"],
      mt10: "mt-10",
      mt6: "mt-6",
      m4: "mt-4",
      mt4: ["mt-4 space-y-6"],
      space6: "space-y-6",
      txtBold600: ["text-gray-600"],
      liststyle: ["list-disc space-y-2 pl-4 text-sm"],
    },
    radio: {
      bggrid: ["grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"],
      position: ["flex items-center space-x-3"],
    },

    cart: {
      priceTxt: [" text-3xl tracking-tight text-gray-900"],
      sr: "sr-only",
      ratingPos: ["flex items-center"],
      reviewTxt: [
        "ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500",
      ],
      space: ["mt-4 lg:row-span-3 lg:mt-0"],
    },

    size: {
      position: ["flex items-center justify-between"],
      txt: ["text-sm font-medium text-indigo-600 hover:text-indigo-500"],
    },
    button: [
      "mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
    ],
  },
};
