import React from "react";
import data from "./offersOnCategory.json";
import Image from "next/image";

const OfferImages = () => {
  const offersOnCategories = (data) => {
    return data.map((cat) => {
      return (
        <div className="text-center mx-3" key={cat.id}>
          <div className="relative">
            {/* <div className="text-center mx-5 max-w-sm w-full lg:max-w-full lg:flex" key={cat.id}>
          <div className="h-60 lg:h-auto lg:w-60 flex-none bg-cover text-center overflow-hidden relative"> */}
            <Image
              src={cat.imageSrc}
              alt="Picture of the author"
              width={400}
              height={500}
              className="object-fill"
            />
            <div className="lg:p-2 pl-4 pr-4 absolute text-black bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h3 className="text-xs font-semibold">{cat.name}</h3>
              <h2 className="min-[320px]:text-xs sm:text-lg">{cat.price}</h2>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="">
      <h2 className="font-thin text-2xl leading-8 mb-12 underline underline-offset-8 text-center">
        Offers On Categories
      </h2>
      {data && data.length === 0 ? (
        "Loading..."
      ) : (
        <div className="w-10/12 mb-16 mx-auto grid lg:grid-cols-4 grid-cols-2 gap-6">
          {offersOnCategories(data)}
        </div>
      )}
    </div>
  );
};

export default OfferImages;
