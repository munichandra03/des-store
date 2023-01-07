import React, { useEffect } from "react";
import { LcsTabStyles } from "@/consts/style.consts";
import APP from "@/consts/app.const";

const LcsTab = ({
  content,
  orientation,
  action,
  selected = true,
  id,
  role = "tab",
}) => {
  useEffect(() => {
    content && content.map((tab) => (tab.selected = false));
  }, [content]);

  // console.log('content',content)
  return (
    <>
      <div className={`${LcsTabStyles.root}`}>
        <div
          className={`${LcsTabStyles.list} ${
            orientation === "horizontal" ? "flex" : ""
          }`}
          role="tablist"
          aria-orientation={orientation}
        >
          {content.map((tab, index) => (
            <button
              key={index}
              className={`${LcsTabStyles.list_btn()} ${
                tab.selected
                  ? LcsTabStyles.list_btn_active
                  : LcsTabStyles.list_btn_nonactive
              }`}
              id={tab.contentId}
              role={role}
              type="button"
              aria-controls={tab.selected ? `${tab.ariaControlsId}` : ""}
              aria-selected={tab.selected}
              tabIndex={
                tab.selected ? APP.COMMON.TAB_INDEX_0 : APP.COMMON.TAB_INDEX_0
              }
              data-headlessui-state={
                tab.selected ? `${APP.COMMON.STATE_SELECTED}` : ""
              }
              onClick={(e) => {
                tab.selected = true;
                action(e, tab);
              }}
            >
              {tab.title.toUpperCase()}
            </button>
          ))}
        </div>
        {content.map((tab, index) => (
          <React.Fragment>
            {tab && tab.selected && (
              <div className="mt-2" key={index}>
                <div
                  className={`${LcsTabStyles.panel}`}
                  id={tab.contentId}
                  role="tabpanel"
                  aria-labelledby={tab.selected ? `${tab.ariaControlsId}` : ""}
                  tabIndex={
                    tab.selected
                      ? APP.COMMON.TAB_INDEX_0
                      : APP.COMMON.TAB_INDEX_0
                  }
                  data-headlessui-state={
                    tab.selected ? `${APP.COMMON.SELECTED}` : ""
                  }
                >
                  {/* <ul className="flex">
                    <li className={LcsTabStyles.li()}>
                      <p>{tab.panel.description}</p>
                      <img src={tab.panel.url} alt={tab.panel.title} />
                      {tab.children && (
                        <div
                          dangerouslySetInnerHTML={{ __html: tab.children }}
                        ></div>
                      )}
                    </li>
                  </ul> */}
                  <div className="flex flex-row">
                    <div className="basis-1/4">
                      <img src={tab.panel.url} alt={tab.panel.title} />
                    </div>
                    <div className="basis-1/2">
                      <p>{tab.panel.description}</p>
                      {tab.children && (
                        <div
                          dangerouslySetInnerHTML={{ __html: tab.children }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default LcsTab;

/*
**
Usage: LcsTab
import {LcsModal} from "./new_components/LcsModal";
  // State management should be in the parent component 
  // provide some initial state as below
  const intialState = [
    {
      id: 1,
      contentId: 'headlessui-tabs-tab-:R2q:',
      ariaControlsId:'headlessui-tabs-panel-:R3a:',
      title: "Test Tab first",
      description: "Test content here first",
      selected: true,
    },
    {...},
    {...},
  ];
  const [tabState, setTab] = useState(intialState);

  const tab = {
    uiconfig: {
      bg: ["bg-indigo"],
      tablist: ["space-x-1 ..."],
      tablist_btn_nonactive:["w-full rounded-lg ..."],
      tablist_btn_active:["w-full rounded-lg py-2.5 ..."],
      container: ["w-full max-w-md ..."],
      tabpanel:["rounded-xl bg-white p-3 ..."]
    },
    content: tabState // takes array of objects,
    orientation: "horizontal",
    action: (e,data) =>{
        // update the tab state
        ...logic goes here
    }
  };

   <LcsTab
        content={tab.content}
        uiconfig={tab.uiconfig}
        orientation={tab.orientation}
        action={tab.action}
      />
**/
