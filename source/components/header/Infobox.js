import { LcsBannerConsts } from "@/consts/style.consts";
import { LcsContent } from "./Content";

export function LcsInfobox({ varient, content, button }) {
  return (
    // <div className={LcsBannerConsts.bg({ varient })}>
    <div className="bg-yellow-800">
      <div className={LcsBannerConsts.container()}>
        <div className={LcsBannerConsts.wrapper()}>
          <div className={LcsBannerConsts.icon()}>
            <LcsContent uistyle={LcsBannerConsts.content()} content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
