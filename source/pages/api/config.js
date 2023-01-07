// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const features = {
    uiconfig: {
      uiSection: {
        bg: ["bg-white py-12"],
        bgStyle: ["mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"],
        textlg: ["lg:text-center"],
        heading: ["text-lg font-semibold text-indigo-600"],
        subHeader: ["mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900  sm:text-4xl"],
        para: ["mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"],
      },

      uiDescription: {
        mt: ["mt-10"],
        rel: "relative",
        bgSpacing: [
          "space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0",
        ],
        iconBg: [
          "absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white",
        ],
        para: ["ml-16 text-lg font-medium leading-6 text-gray-900"],
        des: ["mt-2 ml-16 text-base text-gray-500"],
        hw: ["h-6 w-6"],
      },
    },

    featuresContent: {

      subHeader: "Mix and match furniture to your liking",
    },
    content: {
      data: [
        {
          name: "Save time",
          description:
            "Add your items and ideas in one convenient location",
          // icon: GlobeAltIcon,
        },
        {
          name: "Give great gifts",
          description:
            "Remember your friends' lists and share yours",
          // icon: ScaleIcon,
        },
        {
          name: "Check price changes",
          description:
            "Check when items from your lists drop in price",
          // icon: BoltIcon,
        },
        {
          name: "Mobile notifications",
          description:
            "Check when items from your lists drop in price",
          // icon: ChatBubbleBottomCenterTextIcon,
        }
      ],
    },
  };
  res.status(200).json(features)
}
