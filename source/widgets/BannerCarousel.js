import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function BannerCarousel(props) {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {props.children}
      </Swiper>
    </>
  );
}
