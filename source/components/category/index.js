import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LcsLink } from "@/widgets/LcsLink";
import config from "../../config.json";
import API from "@/utils/httputils";
import formatMessage from "format-message";

const index = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    let solrCollection = API.getSolrCollection();
    API.getLogSearchService(
      formatMessage(config.apiUrlData.homePageData[API.getSysEnv()].part_url, {
        collectionId: solrCollection,
        fragmentId: "TopCategories",
      })
    )
      .then((response) => {
        setCategories(response.response.data.response.docs);
      })
      .catch((err) => {
        console.log("error in top categories: ", err);
        setError(err);
      });
  }, []);

  const categoriesComponents = (data) => {
    return data.map((cat) => {
      return (
        <div className="text-center mx-auto" key={cat.catValue}>
          <LcsLink
            href={{
              pathname: "/search",
              query: {
                search: `${cat.catValue}`,
                facets: JSON.stringify([
                  {
                    field_name: "Brand",
                    field_value: cat.calValue,
                    field_conjunction: "OR",
                  },
                  {
                    field_name: "L1Category",
                    field_value: cat.calValue,
                    field_conjunction: "OR",
                  },
                  {
                    field_name: "L2Category",
                    field_value: cat.calValue,
                    field_conjunction: "OR",
                  },
                ]),
              },
            }}
          >
            {cat.imageSrc ? (
              <Image
                src={cat.imageSrc}
                alt="Picture of the author"
                width={300}
                height={300}
                className="object-fill rounded-full"
              />
            ) : (
              <div className="h-36 w-36 bg-red-300 rounded-full flex justify-center">
                <p className="font-thin text-5xl bg-green-100 my-auto">
                  {cat?.catValue?.split(" ").length === 1
                    ? cat?.catValue[0].toUpperCase() +
                      cat?.catValue[1].toUpperCase()
                    : cat?.catValue?.split(" ")[0][0].toUpperCase() +
                      cat?.catValue?.split(" ")[1][0].toUpperCase()}
                </p>
              </div>
            )}
          </LcsLink>
          <h1 className="my-2 font-semibold">{cat.catValue}</h1>
        </div>
      );
    });
  };
  return (
    <div className="">
      {error == null && (
        <>
          <h2 className="font-thin text-2xl leading-8 mb-12 underline underline-offset-8 text-center">
            New Arrival Categories
          </h2>
          {categories.length === 0 ? (
            "Loading..."
          ) : (
            <div className="w-10/12 mb-16 mx-auto grid lg:grid-cols-3 grid-cols-2 gap-6">
              {categoriesComponents(categories)}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default index;
