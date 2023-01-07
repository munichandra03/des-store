import React from "react";

const ProductOptions = (resource) => {
  const randomRating = 3.5;
  return (
    <div className="my-1 min-h-40 cursor-pointer" title={resource.Title}>
      <p className="font-semibold capitalize">
        {resource?.Brand?.toLowerCase()}
      </p>
      <p className="text-sm text-gray-700">
        {resource.Title?.length > 39
          ? resource.Title?.slice(0, 30) + "..."
          : resource.Title}
      </p>
      <div className="price flex justify-between">
        <span className="flex">
          <p className="line-through mr-2">${resource.ListPrice}</p>$
          {resource.SalePrice}
        </span>
        <span className="mr-4 mx-1 flex">
          {resource.Rating ? resource.Rating : randomRating}
          <img src="/fullstar.svg" alt="rating-start" />

          {/* rating stars logic */}
          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star, index) => {
            let rating = resource.Rating ? resource.Rating : randomRating;
            // rating is decimal
            if (rating % 1 != 0) {
              if (index < rating.toString().split(".")[0]) {
                return <img src="/fullstar.svg" alt="" />;
              }
              if (index === 9) {
                return <img src="/halfstar.svg" alt="" />;
              }
            } else {
              if (index < rating) {
                return <img src="/fullstar.svg" alt="" />;
              }
            }
          })} */}
        </span>
      </div>
    </div>
  );
};

export default ProductOptions;
