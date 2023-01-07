import React, { useEffect, useState } from "react";
import Services from "@/components/services";
import Banner from "@/components/banner/index";
import Categories from "@/components/category/index";
import OfferImages from "@/components/offerImages";
import API from "@/utils/httputils";
import config from "../../config.json";
import GenericComponent from "@/components/GenericComponent";

const HomeWrapper = ({ xp_home }) => {
  const [banner, setBanner] = React.useState({
    mode: "primary",
    uiconfig: {
      bg: ["bg-white"],
      // bgStyle: ["sm:px-6 py-2 w-screen"],
      bgSpacing: ["flex flex-wrap items-center justify-between"],
      // bgPosition:['flex w-0 flex-1 items-center'],
      closeIcon: {},
    },
    content: {
      images: [],
    },
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [fragments, setFragmetns] = useState([]);

  async function getBannerData() {
    let obj = {
      mode: "primary",
      uiconfig: {
        bg: ["bg-white"],
        bgSpacing: ["flex flex-wrap items-center justify-between"],
        closeIcon: {},
      },
      content: {
        images: [],
      },
    };
    try {
      const res = await API.getXPService(config.apiUrlData.banner.part_url);
      if (res.response.status === 200) {
        obj.content.images.push(res.response.data.wrapperArr);
        setBanner(obj);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBannerData();
  }, []);
  return (
    <div className="bg-white">
      {!isLoading && (
        <Banner
          close={banner.close}
          closeAction={($event) => console.log("close")}
          action={($event) => console.log("Action")}
          compConfig={banner}
          mode={banner.mode}
          content={banner.content}
        />
      )}
      {xp_home &&
        xp_home.wrapperArr[0].Content.map((data) => {
          if (data.title !== "Banner") {
            if (data.title !== "TopCategories") {
              return (
                <GenericComponent data={data} key={data.title} page="home" />
              );
            }
          }
        })}
      <OfferImages />
      <Categories />
      <Services />
    </div>
  );
};

export default HomeWrapper;
