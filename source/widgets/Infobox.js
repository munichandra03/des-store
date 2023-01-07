import { Icons, LcsBannerConsts } from "@/consts/style.consts";
import { Content } from "./Content";
import { Button } from "./Button";
import { LcsLink } from "./LcsLink";
export function Infobox({ varient, content, button }) {
  return (
    <div className={LcsBannerConsts.bg({ varient })}>
      <div className={LcsBannerConsts.container()}>
        <div className={LcsBannerConsts.wrapper()}>
          <div className={LcsBannerConsts.icon()}>
            <Icons.Notification />
            <Content uistyle={LcsBannerConsts.content()} content={content} />
          </div>
          {button ? (
            <div className={LcsBannerConsts.button()}>
              <LcsLink
                href={button.link}
                classes={LcsBannerConsts.buttonLink()}
                content={button.value}
              />
            </div>
          ) : (
            ""
          )}
          <div className={LcsBannerConsts.close()}>
            <Button
              uistyle={LcsBannerConsts.closeBtn()}
              IconName={Icons.Close}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
