import React, { useState, useEffect } from "react";
import Carousel from "@/widgets/Carosuel";
import formatMessage from "format-message";
import API from "@/utils/httputils";
import { getUserId } from "@/utils/storageutils";
import config from "../../config.json";

const index = ({ data, productId, page }) => {
  const [fragments, setFragments] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let solrCollection = API.getSolrCollection();
    let userId = getUserId();
    if (page === "pdp") {
      if (data.fragment === "RelatedProducts") {
        API.getLogSearchService(
          formatMessage(
            config.apiUrlData.ItemMLRecommendation[API.getSysEnv()].part_url,
            {
              collectionId: solrCollection,
              productId: productId,
            }
          )
        ).then((response) => {
          setTitle("Related Products");
          setFragments(response.response.data);
        });
      }
      if (data.fragment === "ItemABRecommendation") {
        API.getLogSearchService(
          formatMessage(
            config.apiUrlData.ItemABRecommendation[API.getSysEnv()].part_url,
            {
              collectionId: solrCollection,
              productId: productId,
            }
          )
        ).then((response) => {
          setTitle("Customers also viewed");
          setFragments(response.response.data);
        });
      }
      if (data.fragment === "UserRecommend") {
        API.getLogSearchService(
          formatMessage(
            config.apiUrlData.homePageRecommendData[API.getSysEnv()].part_url,
            {
              collectionId: solrCollection,
              fragmentId: data.fragment,
              userid: userId,
            }
          )
        ).then((response) => {
          setTitle("Recommendations for you");
          setFragments(response.response.data);
        });
      }
    }
    if (page === "home") {
      if (data.fragment === "UserRecommend") {
        API.getLogSearchService(
          formatMessage(
            config.apiUrlData.homePageRecommendData[API.getSysEnv()].part_url,
            {
              collectionId: solrCollection,
              fragmentId: data.fragment,
              userid: userId,
            }
          )
        ).then((response) => {
          setTitle("Recommendations for you");
          setFragments(response.response.data);
        });
      } else {
        API.getLogSearchService(
          formatMessage(
            config.apiUrlData.homePageData[API.getSysEnv()].part_url,
            {
              collectionId: solrCollection,
              fragmentId: data.fragment,
            }
          )
        ).then((response) => {
          setTitle(data.title);
          setFragments(response.response.data);
        });
      }
    }
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      {fragments !== null && fragments.length === 0 ? (
        "Loading"
      ) : (
        <Carousel data={fragments} title={title} index="" />
      )}
    </div>
  );
};

export default index;
