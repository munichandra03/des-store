import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const bannerStyles = [
  {
    mode: "primary",
    uiconfig: {
      bg: ["bg-indigo-600"],
      bgStyle: ["mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8"],
      bgSpacing: ["flex flex-wrap items-center justify-between"],
      bgPosition: ["flex w-0 flex-1 items-center"],
      closeIcon: {},
    },
    icon: {
      type: {},
      el: MegaphoneIcon,
    },
    linkinfo: {
      text: "Learn more",
      href: "#",
      uistyle: {
        text: ["text-secondary font-bold"],
        bg: ["bg-white", "hover:bg-green"],
        linkwidth: [
          "order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto",
        ],
      },
    },
    content: {
      text: "Primary Custom Big news! We're excited to announce a brand new product.",
      uistyle: ["ml-3", "truncate", "font-medium", "text-white"],
    },
    closeicon: {
      uistyle: ["order-2 flex-shrink-0 sm:order-3 sm:ml-3"],
      type: {},
      el: XMarkIcon,
    },
    close: XMarkIcon,
  },
  {
    mode: "secondary",
    uiconfig: {
      bg: ["bg-black"],
      bgStyle: ["mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8"],
      bgSpacing: ["flex flex-wrap items-center justify-between"],
      bgPosition: ["flex w-0 flex-1 items-center"],
      closeIcon: {},
    },
    icon: {
      type: {},
      el: MegaphoneIcon,
    },
    linkinfo: {
      text: "Learn more",
      href: "#",
      uistyle: {
        text: ["text-primary font-bold"],
        bg: ["bg-white", "hover:bg-green"],
        linkwidth: [
          "order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto",
        ],
      },
    },
    content: {
      text: "Secondary Custom Big news! We're excited to announce a brand new product.",
      uistyle: ["ml-3", "truncate", "font-medium", "text-white"],
    },
    closeicon: {
      uistyle: ["order-2 flex-shrink-0 sm:order-3 sm:ml-3"],
      type: {},
      el: XMarkIcon,
    },
    close: XMarkIcon,
  },
  {
    mode: "success",
    uiconfig: {
      bg: ["bg-green"],
      bgStyle: ["mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8"],
      bgSpacing: ["flex flex-wrap items-center justify-between"],
      bgPosition: ["flex w-0 flex-1 items-center"],
      closeIcon: {},
    },
    icon: {
      type: {},
      el: MegaphoneIcon,
    },
    linkinfo: {
      text: "Learn more",
      href: "#",
      uistyle: {
        text: ["text-primary font-bold"],
        bg: ["bg-white", "hover:bg-green"],
        linkwidth: [
          "order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto",
        ],
      },
    },
    content: {
      text: "Secondary Custom Big news! We're excited to announce a brand new product.",
      uistyle: ["ml-3", "truncate", "font-medium", "text-white"],
    },
    closeicon: {
      uistyle: ["order-2 flex-shrink-0 sm:order-3 sm:ml-3"],
      type: {},
      el: XMarkIcon,
    },
    close: XMarkIcon,
  },
  {
    mode: "advt",
    //flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8
    uiconfig: {
      bg: ["bg-indigo-600"],
      bgStyle: [
        "flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8",
      ],
      bgSpacing: ["px-4 text-sm font-medium text-white sm:px-6 lg:px-8"],
      // bgPosition:['flex w-0 flex-1 items-center'],
      closeIcon: {},
    },
    // icon: {
    //     type: {},
    //     el: MegaphoneIcon
    // },
    // linkinfo: {
    //     text: "Learn more",
    //     href: "#",
    //     uistyle:  {
    //         text: ["text-primary font-bold"],
    //         bg: ["bg-white","hover:bg-green"],
    //         linkwidth: ['order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto']
    //     }
    // },
    content: {
      text: "Get ffree delivery on orders over $100",
      uistyle: ["ml-3", "truncate", "font-medium", "text-white"],
    },
    closeicon: {
      uistyle: ["order-2 flex-shrink-0 sm:order-3 sm:ml-3"],
      type: {},
      el: XMarkIcon,
    },
    close: XMarkIcon,
  },
];
