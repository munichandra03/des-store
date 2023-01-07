import React from "react";
import { LcsImg } from "@/widgets/LcsImg";
import { LcsButton } from "@/widgets/LcsButton";
import { BannerImg } from "@/consts/style.consts";
import { LcsContent } from "@/widgets/LcsContent";

export default function BannerImage({ content }) {
  return (
    <>
      {content.bannerimg.map((item, index) => (
        <div className={BannerImg.root()} key={index}>
          <LcsImg src={item.src} alt={item.alt} />
          <div className={BannerImg.container()}>
            <LcsContent content={content.title} uistyle={BannerImg.title()} />
            <LcsContent
              content={content.description}
              uistyle={BannerImg.description()}
            />
            <LcsButton content={content.button} uistyle={BannerImg.button()} />
          </div>
        </div>
      ))}
    </>
  );
}
