import { LockClosedIcon } from "@heroicons/react/20/solid";

export const DefaultStyles = {
  btn: {
    size: ["px-4", "py-2"],
    align: ["flex", "items-center", "justify-center"],
    border: ["border", "border-transparent"],
    text: ["text-sm", "font-medium", "text-white"],
    common: ["rounded-md", "shadow-sm"],
    bg: ["bg-primary", "hover:bg-gray"],
    position: [""],
  },
  icon: {
    size: ["h-10", "w-10", "px-1", "py-1"],
    text: ["text-white"],
    bg: ["bg-primary"],
    common: ["rounded-md"],
    position: [""],
    border: [""],
    align: [""],
  },
  ticon: {
    size: ["h-6", "w-6"],
    text: ["text-white"],
  },
  content: {},
};

export const headerStyleConsts = {
  bg: ({ varient = "white" }) => `relative bg-${varient} shadow-xl`,
  topBannerBG: ({ varient = "red" }) =>
    `flex h-10 items-center justify-center bg-${varient}-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8`,
  nav: () => `mt-5 `,
  navigation: () => `bg-[#37446A] h-[60px] mt-5`,
  navigationChild: () => `flex flex-col md:flex-row md:space-x-8 text-white`,
  navStyle: () => `mx-auto max-w-7xl border-gray-200`,
  navbarAlign: () => `flex md:flex-wrap w-full flex-row`,
  navMenuBtn: () => `rounded-md bg-white p-2 text-gray-400 lg:hidden`,
  logoInfo: () => ` flex`,
  logoImg: () => `h-[46px] w-[157px] items-center mr-10`,
  menuleft: () =>
    ` hidden mx-auto max-w-7xl lg:content-center lg:block lg:self-stretch capitalize flex flex-col`,
  menuRight: () => ` flex items-center capitalize md:ml-16`,
  menuGroupIcons: () => ` group-m-1 flex items-center p-1 `,
  menulinksGroup: () =>
    `flex h-full text-sm space-x-6 lg:text-center capitalize  `,
  menuLoginLists: () =>
    `bg-white capitalize flex items-center justify-between w-full px-2 py-2 hover:bg-slate-100 text-bluenavy`,
  menuLink: () =>
    `flex  items-center text-sm font-medium text-gray-700 hover:text-gray-800 lg:text-xl lg:text-center capitalize`,
  menuDropdown: () =>
    ` relative z-10 mb-px flex items-center  pt-px capitalize font-semibold text-lg duration-200 ease-out  hover:-translate-y-1 hover:scale-110  hover:border-indigo-500 hover:border-b-2`,
  MD: () => `hidden absolute group-hover:block group-hover:left-0 w-full `,
  cartSection: () =>
    `absolute -top-1 -right-0 justify-center items-center w-4 h-4 text-xs text-white bg-red-600 rounded-full`,
  MDShadow: () => ` absolute inset-0 top-1/2 bg-white   `,
  MDContainer: () => `relative bg-white z-40 mx-10 `,
  MDContainerBox: () => ` max-w-7xl pl-20   h-96 overflow-y-auto  `,
  MDPanel: () => `grid grid-cols-1 gap-y-10 gap-x-8`,
  MDChild: () => `grid grid-cols-4  gap-x-16  `,
  MDChildOverview: () => `row-start-1 grid grid-cols-3 gap-y-10 gap-x-8  `,
  MDImgOverview: () => `group relative text-base sm:text-sm`,
  MDImgChild: () =>
    `aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75`,
  MDImgChildImg: () => `object-cover object-center`,
  MDImgChildLink: () => ` font-bold  mt-6 block font-medium text-left `,
  MDImgChildBtn: () => `mt-1 font-thin `,
  MDCate: () => `font-medium text-gray-900 `,
  MDCateList: () => `mt-6 space-y-6 sm:mt-4 sm:space-y-4 `,
  MDCateListItem: () => `flex`,
  MDCateListItemLink: () => `hover:text-gray-800`,

  MM: () => `relative z-40 lg:hidden`,
  MMPosition: () => `fixed inset-0 bg-black bg-opacity-25`,
  MMContainer: () => `fixed inset-0 z-40 flex`,
  MMWrapper: () =>
    `relative flex flex-col w-full max-w-xs  overflow-y-auto bg-white shadow-xl h-screen justify-between`,
  MMHeader: () => `bg-brown flex items-center mb-2 py-8 px-6`,
  MMPProfileIcon: () => `rounded-full w-20 h-20 ring-8  ring-white`,
  MMTabs: () => `mb-2 px-3 flex space-x-8 px-4`,
  MMTabsBtns: () =>
    `text-gray-900 border-transparent flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium`,
  MMLinksGroup: () => `space-y-6 border-t border-gray-200 py-6 px-4`,
  MMLink: () => `-m-2 block p-2 font-medium text-gray-900`,
  MMrt: () => `-m-2 block p-2 font-medium text-gray-900`,
  MMrtGroup: () => `space-y-6 border-t border-slate-200 py-6 px-4 mt-3`,
  MM1: () => ``,
};

export const LcsBannerConsts = {
  bg: ({ varient = "indigo" }) => `bg-${varient}-600`,
  container: () => `mx-auto max-w-7xl py-2 px-3 sm:px-4 lg:px-8 h-10`,
  wrapper: () => `flex flex-wrap items-center justify-between `,
  icon: () => `flex w-0 flex-1 items-center `,
  content: () => `ml-3 mb-4 truncate font-medium text-white`,
  button: () =>
    `order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto`,
  buttonLink: () =>
    `flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50`,
  close: () => `order-2 flex-shrink-0 sm:order-3 sm:ml-3`,
  closeBtn: () =>
    `-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`,
};

export const ModalConsts = {
  overley: ({ varient = "black", opacity = 75 }) =>
    `fixed inset-0 bg-${varient} bg-opacity-${opacity} transition-opacity`,
  modalroot: "relative z-10",
  modalBox: "fixed inset-0 z-10 overflow-y-auto",
  modalContainer:
    "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",
  modalPanel:
    "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",
  body: ({ varient = "black" }) =>
    `bg-${varient} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`,
  bodyContainer: "sm:flex sm:items-start",
  icon: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",
  content: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left",
  title: "text-lg font-medium leading-6 text-gray-900",
  modalActions: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",
  modalDangerBtn:
    "inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm",
  modalCancelBtn:
    "mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
};

export const FormConsts = {
  fieldGroup: (classes = "") => classes,
  label: (varient = "gray") =>
    `block text-${varient}-700 text-sm font-bold mb-2`,
  input: () =>
    `px-4 block w-full flex-1 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `,
  inputPreGroup: () =>
    `inline-flex items-center  border border-r-0 border-gray-300 bg-gray-light px-3 text-sm text-gray-500`,
  inputPreGroupPayrent: () => `mt-1 flex  shadow-sm`,
  inputError: () =>
    `p-1 border shadow appearance-none border border-red-500  w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`,
  inputSuccess: () =>
    `p-1 border shadow appearance-none border border-green-500 w-full py-2 px-3 text-green-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`,
  inputWarning: () =>
    `p-1 border shadow appearance-none border border-orange-500 w-full py-2 px-3 text-orange-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`,
  textarea: () =>
    `mt-1 block w-full  border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`,
  checkbox: () =>
    `h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500`,
  getValidationMessage: (type) => `text-${type}-500 text-xs italic block`,
  button: (type) =>
    `inline-flex justify-center rounded-md border border-transparent bg-${type}-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
};

export const cartStyles = {
  root: () => `fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`,
  panel: () => `pointer-events-auto w-screen max-w-md`,
  panelOverlay: () => `relative z-10`,
  container: () => `absolute inset-0 overflow-hidden`,
  section: () => ``,
  sectionBorder: () => `-my-6 divide-y divide-gray-200`,
  imgcontainer:
    () => `h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border 
    border-gray-200`,
  imgCenter: () => `h-full w-full object-cover object-center`,
  title: () => `text-lg font-medium text-gray-900`,
  contentText: () => `mt-1 text-sm text-gray-500`,
  contentWrapper: () => `ml-4 flex flex-1 flex-col`,
  contentAlign: () =>
    `flex justify-between text-base font-medium text-gray-900`,
  contentCenter: () => `ml-3 flex h-7 items-center`,
  itemCenter: () => `flex flex-1 items-end justify-between text-sm`,
  itemTopspace: () => `mt-8`,
  listGrid: () => `flex py-6`,
  textColor: () => `text-white`,
  modalroot: () => `fixed inset-0 z-40 overflow-hidden`,
  modalPosition: () =>
    `pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10`,
  modalBg: () => `flex h-full flex-col overflow-y-scroll bg-white shadow-xl`,
  modalContainer: () => `flex-1 overflow-y-auto py-6 px-4 sm:px-6`,
  modalLink: () => `mt-6 flex justify-center text-center text-sm text-gray-500`,
  modalBtnBorder: () => `border-t border-gray-200 py-6 px-4 sm:px-6`,
  modalBtntxt: () => `font-medium text-indigo-800 hover:text-indigo-500`,
  modalBtnBg: () =>
    `flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-6`,
  modalClose: () => `flex items-start justify-between`,
  icon: () => `h-6 w-6`,
};

export const cartfullPage = {
  root: () => `flex`,
  contentWrapper: () => `ml-4 flex-col grid-cols-2`,
  modalContainer: () => `flex-1 overflow-y-auto  m-10 py-8 sm:px-6`,
  sectionBorder: () => `-my-6 divide-y divide-gray-200`,
  modalBtnBorder: () => `py-8 px-8 mt-52 mx-24 sm:px-6 w-2/5`,
  title: () => `text-3xl text-center text-black-700 mt-8 mb-10 font-bold`,
  space: () => `mr-8`,
};

export const CarouselStyles = {
  root: () =>
    `carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0`,
  container: () => `carousel-item m-4 relative w-64 h-96 snap-start`,
  carousel: () => `flex justify-between absolute top left w-full h-full`,
  carouselPosition: () => `relative overflow-hidden`,
  carouselImage: () =>
    `h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0`,
  carouselSpaceing: () => `carousel m-14`,
  iconPrev: () =>
    `hover:bg-blue-900 text-white w-10 h-30 text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300 m-auto ml-0 bg-slate-800`,
  iconNext: () =>
    `hover:bg-blue-900 text-white w-10 h-30 text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300 m-auto mr-0 bg-slate-800`,
};

export const FeatureStyles = {
  root: () => `bg-white py-12`,
  container: () => `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,
  align: () => `lg:text-center`,
  title: () => `text-lg font-semibold text-indigo-600`,
  subTitle: () =>
    `mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900  sm:text-4xl`,
  description: () => `mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto`,
};

export const FeatureDescription = {
  root: () => `relative`,
  container: () =>
    `space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0`,
  spaceing: () => `mt-16`,
  iconBg: () =>
    `absolute flex h-14 w-14 p-3 items-center justify-center rounded-md bg-indigo-500 text-white`,
  icon: () => `h-6 w-6`,
  title: () => `ml-20 text-lg font-medium leading-6 text-gray-900`,
  description: () => `mt-2 ml-20 text-base text-gray-500`,
};

export const BreadcrumbStyles = {
  root: () =>
    `mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8`,
  container: () => ``,
  align: () => `flex items-center`,
  listFont: () => `mr-2 text-sm font-medium text-gray-900`,
  listDesc: () => `text-sm`,
  linkHover: () => `font-medium text-gray-500 hover:text-gray-600`,
};

export const GalleryStyles = {
  root: () =>
    `mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8`,
  container: () => `hidden lg:grid lg:grid-cols-1 lg:gap-y-8`,
  blockLg: () =>
    `aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block`,
  blockSm: () => `aspect-w-3 aspect-h-2 overflow-hidden rounded-lg`,
  image: () => `h-full w-full object-cover object-center`,
};

export const Quickview = {
  root: () => `relative z-10`,
  backdrop: () => `fixed hidden inset-0 overflow-y-auto h-full w-full`,
  diologebox: () => `fixed inset-0 z-10 overflow-y-auto bg-gray`,
  align: () =>
    `flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4`,
  panelOverlay: () =>
    `flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl`,
  panelBg: () =>
    `relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8`,
  grid: () => `h-6 w-6`,
  closeIcon: () =>
    `absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8`,
  imgGrid: () =>
    `grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8`,
  imgSection: () =>
    `aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5`,
  img: () => `object-cover object-center`,
  optionSection: () => `sm:col-span-8 lg:col-span-7`,
  title: () => `text-2xl font-bold text-gray-900 sm:pr-12`,
};

export const ProductInfoStyles = {
  root: () =>
    `mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24`,
  border: () => `lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8`,
  container: () =>
    `py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8`,
  title: () => `text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl`,
  subTitle: () => `text-sm font-medium text-gray-900`,
  description: () => `text-sm text-gray-600`,
  list: () => `list-disc space-y-2 pl-4 text-3xl`,
  bold: () => `text-gray-600`,
  spaceing: () => `space-y-6`,
  titleSpace: () => `mt-10`,
  contentSpace: () => `mt-4 space-y-6`,
};

export const ProductFeatureStyles = {
  root: () =>
    `mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8`,
  container: () => ``,
  title: () =>
    `text-3xl mb-4 font-bold tracking-tight text-gray-900 sm:text-4xl`,
  description: () => `mt-4 text-gray-500`,
  imgGrid: () => `grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8`,
  img: () => `rounded-lg bg-gray-100`,
  grid: () =>
    `mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8`,
  imgTitle: () => `font-medium text-gray-900`,
  imgDesc: () => `mt-2 text-sm text-gray-500`,
  descBorder: () => `border-t border-gray-200 pt-4`,
};

export const PagesLayoutStyles = {
  root: () =>
    `flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8`,
  container: () => `w-full max-w-md space-y-8`,
};

export const Pages = {
  img: () => `mx-auto h-12 w-auto`,
  title: () =>
    `mt-6 text-center text-3xl font-bold tracking-tight text-gray-900`,
  titleDesc: () => `mt-2 text-center text-sm text-gray-600`,
  linkDesc: () => `font-medium text-indigo-600 hover:text-indigo-500`,
};

export const FormStyles = {
  root: () => `mt-8 space-y-6`,
  container: () => ``,
  group: () => `-space-y-px rounded-md shadow-sm`,
  button: () =>
    `group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
  iconWrap: () => `absolute inset-y-0 left-0 flex items-center pl-3`,
  icon: () => `h-5 w-5 text-indigo-500 group-hover:text-indigo-400`,
  link: () => `font-medium text-indigo-600 hover:text-indigo-500`,
};

export const SigninPage = {};

export const LcsTabStyles = {
  bg: "bg-indigo",
  root: "w-full max-w-md px-2 sm:px-3",
  list: "flex flex-wrap -mb-px text-sm font-medium text-center",
  panel:
    "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
  list_btn_nonactive:
    "border-transparent text-gray-500 hover:text-gray-600 text-gray-400 border-gray-500 hover:border-gray-300 border-gray-700 hover:text-gray-300",
  list_btn_active:
    "text-blue-600 hover:text-blue-600 hover:text-blue-500 border-blue-600 ",
  list_btn: () => `inline-block p-4 rounded-t-lg border-b-2`,
  li: () => `relative rounded-md p-3 hover:bg-gray-100`,
  h3: () => `text-sm font-medium leading-5`,
};

export const LcsPopoverConts = {
  root: "top-16 w-full max-w-sm px-4",
  position: "relative",
  btn: () =>
    `group inline-flex items-center rounded-md bg-orange px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
  content_container:
    "absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl opacity-100 translate-y-0",
  outerStyle: () =>
    `overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5`,
  containerStyle: () => `relative grid gap-8 bg-white p-7 lg:grid-cols-2`,
  anchor: () =>
    `-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`,
  icon_parent: () =>
    `flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12`,
  content_box: () => `ml-4`,
  heading: () => `text-sm font-medium text-gray-900`,
  description: () => `text-sm text-gray-500`,
};

export const LcsPaginationStyles = {
  currentColor: "currentColor",
  iconColor: "#00000075",
  root: () => `my-20`,
  ul: () => `inline-flex items-center -space-x-px`,
  previous: () =>
    `block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
  next: () =>
    `block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
  dots: () =>
    `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
  current: () =>
    `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
  disabled: () => `disabled:border-gray-700 disabled:text-gray-400`,
  srOnly: () => `sr-only`,
};

export const LcsSwitchStyles = {
  root: () => `px-6`,
  bg: () => `bg-indigo`,
  active: () => `bg-indigo-700`,
  nonActive: () => `bg-indigo-900`,
  activeTranslate: () => `translate-x-0`,
  nonActiveTranslate: () => `translate-x-9`,
  lg: () => ["h-[48px] w-[81px]", "h-[34px] w-[34px]"],
  sm: () => ["h-[46px] w-[31px]", "h-[34px] w-[34px]"],
  xs: () => ["h-[38px] w-[74px]", "h-[34px] w-[34px]"],
  defaultSize: () => ["h-[38px] w-[74px]", "h-[34px] w-[34px]"],
  uiStyle: () =>
    `relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`,
  uiSpanStyle: () =>
    `pointer-events-none inline-block  transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`,
};

export function renderIcon(props) {
  switch (props.icon) {
    case "LockClosedIcon":
      return <LockClosedIcon className={FormStyles.icon()} {...props} />;
  }
}

export const Icons = {
  Alert: ({ varient = "black" }) => (
    <svg
      className={`h-6 w-6 text-${varient}-600`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
      />
    </svg>
  ),

  Notification: ({ varient = "white" }) => (
    <svg
      className={`h-6 w-6 text-${varient}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
      />
    </svg>
  ),

  Close: ({ varient = "currentColor" }) => (
    <svg
      className="h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={varient}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),

  Menu: () => (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  ),

  prev: () => (
    <svg
      className={`h-12 w-20 -ml-5`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),

  next: () => (
    <svg
      className={`h-12 w-20 -ml-5`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),

  eye: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),

  cart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  ),

  Insights: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5"></rect>
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      ></path>
    </svg>
  ),

  Previous: ({ varient = "currentColor" }) => (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill={varient}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),

  Next: ({ varient = "currentColor" }) => (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill={varient}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        text-sm
        clipRule="evenodd"
      ></path>
    </svg>
  ),

  RightArrow: ({ varient = "black" }) => (
    <svg
      width={16}
      height={20}
      viewBox="0 0 16 20"
      fill={varient}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-5 w-4 text-gray-300"
    >
      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
    </svg>
  ),
};
