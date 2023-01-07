import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductQuickViewOptions from "./ProductQuickViewOptions";
import { LcsImg } from "@/widgets/LcsImg";
import { Quickview } from "@/consts/style.consts";
import API from "@/utils/httputils";

export default function ProductQuickView({ content, uiconfig, onClose }) {
  useEffect(() => {
    // send signal
    API.sendClickSignal(
      content.id, // 1
      null, // 2
      null, // 3
      "view", // 4
      null, // 5
      null, // 6
      content.Title, // 7
      content.L1Category, // 8
      null, // 9
      content.Brand, // 10
      null, // 11
      null, // 12
      null, //13
      null,
      null
    );
  }, []);

  return (
    <>
      <div className={Quickview.root()} role="dialog">
        <div className={Quickview.backdrop()}></div>
        <div className={Quickview.diologebox()}>
          <div className={Quickview.align()}>
            <div className={Quickview.panelOverlay()}>
              <div className={Quickview.panelBg()}>
                <button
                  type="button"
                  className={Quickview.closeIcon()}
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className={Quickview.grid()} aria-hidden="true" />
                </button>
                <div className={Quickview.imgGrid()}>
                  <div className={Quickview.imgSection()}>
                    <LcsImg
                      src={content.ImageUrl}
                      alt={content.ImageUrl}
                      className={Quickview.img()}
                    />
                  </div>
                  <div className={Quickview.optionSection()}>
                    <h2 className={Quickview.title()}>{content.Title}</h2>
                    <ProductQuickViewOptions
                      uiconfig={uiconfig}
                      content={content}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
