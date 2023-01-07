import React from "react";
import PropTypes from "prop-types";
import { bannerStyles } from "./bannerStyle";
import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SwiperSlide } from "swiper/react";
import BannerCarousel from "./BannerCarousel.js";
import searchapi from "@/utils/http.search.utils";
import Image from "next/image";

export default function Banner({
  mode,
  close,
  closeAction,
  compConfig,
  content,
}) {
  const styling =
    compConfig.mode === "primary"
      ? compConfig
      : bannerStyles.find((classes) => {
          return classes.mode === mode;
        });

  return (
    <div className={` ${styling?.uiconfig?.bg}`}>
      <div className={`${styling?.uiconfig?.bgStyle}`}>
        <div className={`${styling?.uiconfig?.bgSpacing}`}>
          <BannerCarousel>
            {content?.images[0].map((item, index) => {
              let fullURL = searchapi.NODE_XP_URL + item.paramSrc;
              return (
                <SwiperSlide key={index}>
                  <Image
                    className="object-fill min-w-fit min-h-full"
                    src={fullURL}
                    alt={item.paramAlt}
                    width={"1500rem"}
                    height={550}
                  />
                </SwiperSlide>
              );
            })}
          </BannerCarousel>
        </div>
      </div>
    </div>
  );
}

Banner.propTypes = {
  close: PropTypes.object,
  compConfig: PropTypes.object,
  closeAction: PropTypes.func,
  mode: PropTypes.oneOf(["primary", "secondary", "success", "advt"]),
};

Banner.defaultProps = {
  compConfig: {
    mode: "primary",
    content: "Default Big news! We're excited to announce a brand new product.",
    icon: { e1: MegaphoneIcon },
    closeicon: { e1: XMarkIcon },
  },
  mode: "primary",
};
