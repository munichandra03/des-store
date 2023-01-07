import { LockClosedIcon } from "@heroicons/react/20/solid";

export const BannerImg = {
  root: () => `border border-gray-light h-[480px] overflow-hidden my-0 mx-8 `,
  container: () => `absolute `,
  title: () => `uppercase font-semibold text-3xl`,
  description: () => `flex font-semibold text-sm mt-3`,
  button: () =>
    `p-3 mt-8 font-bold inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700 pointer-events-auto`,
};

export const OrderConfirm = {
  root: () => `flex flex-col my-16 mx-64 p-20 bg-gray-200 text-center `,
  title: () => `font-bold text-2xl mb-8 border`,
  container: () => `flex justify-center mb-8`,
  content: () => `text-white bg-green-success p-3 rounded-3xl`,
  firstChildP: () => `mb-4 text-xl`,
  secondChildP: () => `mb-1`,
  thirdChildP: () => `text-sm`,
  btnmargin: () => `mt-6 text-xl`,
  btn: () =>
    `border font-bold text-white p-3 justify-center text-sm font-semibold bg-slate-900 hover:bg-slate-700 pointer-events-auto`,
};
export const CheckoutStyle = {
  maintitle: () =>
    `flex mt-14 items-center justify-center font-bold text-gray-600 text-md lg:text-3xl`,
  root: () => `flex flex-col p-8 w-10/12 mx-auto`,
  container: () => `flex flex-col md:w-full`,
  title: () => `mb-4 font-semibold md:text-xl text-gray-600`,
  subTitle: () => `mt-12 mb-4 font-semibold text-gray-600 md:text-xl`,
  form: () => `justify-center w-full mx-auto`,
  btn: () =>
    `p-3 mt-8 font-bold inline-flex justify-center text-sm font-semibold py-3 px-4 bg-slate-800 text-white hover:bg-indigo-700 pointer-events-auto w-[100%]`,
  paymentbtn: () =>
    `text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2`,
  mastercard: () =>
    `text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2`,
  paymentCardbtn: () =>
    `text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2`,
  paymentCardbtnSelected: () =>
    `text-gray-900 bg-[#2557D6] border border-gray-200   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2`,
  formsection: () => `mt-4 space-x-0 lg:flex lg:space-x-4`,
  formwidth: () => `w-full  lg:w-1/2`,
  spacing: () => `mt-4`,
  fullwidth: () => `w-full`,
  paymentsection: () => `mt-4 space-x-0 lg:flex lg:space-x-4`,
  input: () => ` ml-5 block text-sm font-semibold text-gray-600 capitalize`,
  cardSection: () => `space-x-0 lg:flex lg:space-x-4 mt-4`,
  check: () => `flex items-center mt-4`,
};

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
    `p-1 block w-full flex-1 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`,
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

export const BreadcrumbStyles = {
  root: () => `mx-auto flex max-w-2xl items-center px-4 sm:px-6 lg:max-w-7xl`,
  container: () => ``,
  align: () => `flex items-center`,
  listFont: () => `mx-2 text-sm font-medium text-gray-900`,
  listDesc: () => `text-sm`,
  linkHover: () => `font-medium text-gray-500 hover:text-gray-600`,
};

export const Quickview = {
  root: () => `relative`,
  backdrop: () => `fixed hidden inset-0 overflow-y-auto h-full w-full`,
  diologebox: () => `fixed inset-0 z-40 overflow-y-auto`,
  align: () =>
    `flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4 bg-black bg-opacity-70`,
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
  are: () => "",
};

export const PagesLayoutStyles = {
  root: () =>
    `flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8`,
  container: () => `w-full max-w-md space-y-8`,
};

export const Pages = {
  img: () => `mx-auto h-12 w-auto`,
  title: () =>
    `mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 md:text-xs`,
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

export const LcsTabStyles = {
  bg: "bg-indigo",
  root: " px-2 sm:px-3",
  list: "flex flex-wrap -mb-px text-sm font-medium text-center border-b border-slate-300",
  panel:
    "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
  list_btn_nonactive:
    "border-transparent text-gray-500 hover:text-gray-600 text-gray-400 border-gray-500 hover:border-gray-300 border-gray-700 hover:text-gray-500",
  list_btn_active:
    "text-blue-600 hover:text-blue-600 hover:text-blue-500 border-blue-600 ",
  list_btn: () => `inline-block p-4 rounded-t-lg border-b-2`,
  li: () => `relative rounded-md p-3 hover:bg-gray-100`,
  h3: () => `text-sm font-medium leading-5`,
};

export const LcsPaginationStyles = {
  currentColor: "currentColor",
  iconColor: "#00000075",
  root: () => `mx-auto my-20`,
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

export function renderIcon(props) {
  switch (props.icon) {
    case "LockClosedIcon":
      return <LockClosedIcon className={FormStyles.icon()} {...props} />;
  }
}

export const Icons = {
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

  eye: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#ffffff"
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
        clipRule="evenodd"
      ></path>
    </svg>
  ),

  BackSlash: ({ varient = "black" }) => (
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

  RightArrow: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 mr-0.5"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  ),

  Clock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-[#979797]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),

  Facebook: () => (
    <svg
      width="20"
      height="20"
      fill="currentColor"
      className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
    </svg>
  ),

  Twitter: () => (
    <svg
      width="20"
      height="20"
      fill="currentColor"
      className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
    </svg>
  ),

  ViewBox: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
      viewBox="0 0 1792 1792"
    >
      <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
    </svg>
  ),

  Linkdin: () => (
    <svg
      width="20"
      height="20"
      fill="currentColor"
      className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z"></path>
    </svg>
  ),

  Amazon: () => (
    <svg
      width="20"
      height="20"
      fill="currentColor"
      className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1551 1476q15-6 26-3t11 17.5-15 33.5q-13 16-44 43.5t-95.5 68-141 74-188 58-229.5 24.5q-119 0-238-31t-209-76.5-172.5-104-132.5-105-84-87.5q-8-9-10-16.5t1-12 8-7 11.5-2 11.5 4.5q192 117 300 166 389 176 799 90 190-40 391-135zm207-115q11 16 2.5 69.5t-28.5 102.5q-34 83-85 124-17 14-26 9t0-24q21-45 44.5-121.5t6.5-98.5q-5-7-15.5-11.5t-27-6-29.5-2.5-35 0-31.5 2-31 3-22.5 2q-6 1-13 1.5t-11 1-8.5 1-7 .5h-10l-3-.5-2-1.5-1.5-3q-6-16 47-40t103-30q46-7 108-1t76 24zm-394-443q0 31 13.5 64t32 58 37.5 46 33 32l13 11-227 224q-40-37-79-75.5t-58-58.5l-19-20q-11-11-25-33-38 59-97.5 102.5t-127.5 63.5-140 23-137.5-21-117.5-65.5-83-113-31-162.5q0-84 28-154t72-116.5 106.5-83 122.5-57 130-34.5 119.5-18.5 99.5-6.5v-127q0-65-21-97-34-53-121-53-6 0-16.5 1t-40.5 12-56 29.5-56 59.5-48 96l-294-27q0-60 22-119t67-113 108-95 151.5-65.5 190.5-24.5q100 0 181 25t129.5 61.5 81 83 45 86 12.5 73.5v589zm-672 21q0 86 70 133 66 44 139 22 84-25 114-123 14-45 14-101v-162q-59 2-111 12t-106.5 33.5-87 71-32.5 114.5z"></path>
    </svg>
  ),

  Continue: () => (
    <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512">
      <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
    </svg>
  ),

  Plus: () => (
    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
  ),

  Minus: () => (
    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
  ),

  DownArrow: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="
          ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),

  Right: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  ),

  amex: () => (
    <svg
      aria-hidden="true"
      className="mr-2 -ml-1 w-10 h-3"
      viewBox="0 0 256 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z"
        fill="white"
      />
    </svg>
  ),

  visa: () => (
    <svg
      aria-hidden="true"
      className="mr-2 -ml-1 w-10 h-3"
      viewBox="0 0 660 203"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996"
        fill="#0E4595"
      />
      <path
        d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718"
        fill="#F2AE14"
      />
    </svg>
  ),

  mastercard: () => (
    <svg
      aria-hidden="true"
      className="mr-2 -ml-1 w-7 h-4"
      viewBox="0 0 601 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M359.01 179.504C359.01 278.647 278.639 359.004 179.5 359.004C80.361 359.004 0 278.643 0 179.504C0 80.3709 80.362 0.00390625 179.5 0.00390625C278.637 0.00390625 359.01 80.3749 359.01 179.504Z"
        fill="#D9222A"
      />
      <path
        d="M420.489 0C374.11 0 331.846 17.596 299.989 46.467C293.499 52.356 287.441 58.704 281.864 65.463H318.131C323.096 71.5 327.667 77.85 331.816 84.475H268.181C264.354 90.597 260.9 96.944 257.839 103.483H342.152C345.046 109.668 347.583 116.013 349.753 122.487H250.24C248.15 128.721 246.408 135.067 245.023 141.495H354.963C357.652 153.985 359.008 166.726 359.005 179.503C359.005 199.438 355.751 218.615 349.751 236.524H250.238C252.402 243.001 254.938 249.348 257.834 255.532H342.15C339.087 262.073 335.631 268.421 331.803 274.545H268.178C272.325 281.165 276.897 287.511 281.863 293.541H318.122C312.552 300.313 306.492 306.668 299.992 312.554C331.849 341.42 374.109 359.008 420.492 359.008C519.631 359.008 600.002 278.647 600.002 179.508C600.002 80.379 519.631 0.00799561 420.492 0.00799561"
        fill="#EE9F2D"
      />
      <path
        d="M576.07 279.564C576.07 276.365 578.662 273.763 581.866 273.763C585.07 273.763 587.662 276.365 587.662 279.564C587.662 282.763 585.07 285.365 581.866 285.365C578.662 285.365 576.07 282.763 576.07 279.564ZM581.866 283.972C584.3 283.971 586.273 281.998 586.274 279.564C586.274 277.132 584.303 275.162 581.872 275.16H581.866C579.437 275.157 577.466 277.123 577.462 279.551V279.565C577.46 281.998 579.43 283.971 581.862 283.973C581.863 283.972 581.865 283.972 581.866 283.972V283.972ZM581.083 282.112H579.896V277.016H582.045C582.495 277.016 582.953 277.016 583.35 277.27C583.763 277.549 583.996 278.041 583.996 278.549C583.996 279.12 583.658 279.653 583.112 279.861L584.05 282.111H582.735L581.956 280.094H581.085L581.083 282.112V282.112ZM581.083 279.222H581.741C581.987 279.222 582.246 279.243 582.467 279.122C582.662 278.997 582.763 278.763 582.763 278.538C582.758 278.329 582.651 278.136 582.475 278.02C582.268 277.891 581.939 277.919 581.717 277.919H581.083V279.222ZM137.583 199.159C135.537 198.921 134.638 198.858 133.233 198.858C122.187 198.858 116.595 202.645 116.595 210.126C116.595 214.737 119.324 217.671 123.582 217.671C131.521 217.671 137.241 210.112 137.583 199.159V199.159ZM151.754 232.155H135.608L135.979 224.479C131.053 230.544 124.483 233.428 115.553 233.428C104.99 233.428 97.7492 225.178 97.7492 213.199C97.7492 195.175 110.345 184.658 131.966 184.658C134.174 184.658 137.008 184.857 139.907 185.228C140.511 182.787 140.67 181.74 140.67 180.427C140.67 175.519 137.274 173.69 128.17 173.69C118.637 173.582 110.774 175.961 107.545 177.023C107.749 175.794 110.245 160.364 110.245 160.364C119.957 157.518 126.361 156.447 133.57 156.447C150.302 156.447 159.166 163.96 159.149 178.159C159.182 181.964 158.552 186.659 157.57 192.83C155.879 203.564 152.25 226.551 151.754 232.155V232.155ZM89.5962 232.155H70.1092L81.2712 162.158L56.3462 232.155H43.0672L41.4252 162.558L29.6922 232.155H11.4502L26.6872 141.099H54.7082L56.4082 192.067L73.5002 141.099H104.667L89.5962 232.155ZM444.566 199.159C442.529 198.921 441.625 198.858 440.224 198.858C429.183 198.858 423.59 202.645 423.59 210.126C423.59 214.737 426.316 217.671 430.573 217.671C438.513 217.671 444.237 210.112 444.566 199.159V199.159ZM458.75 232.155H442.604L442.97 224.479C438.044 230.544 431.47 233.428 422.548 233.428C411.983 233.428 404.748 225.178 404.748 213.199C404.748 195.175 417.336 184.658 438.961 184.658C441.169 184.658 443.998 184.857 446.895 185.228C447.499 182.787 447.658 181.74 447.658 180.427C447.658 175.519 444.266 173.69 435.162 173.69C425.629 173.582 417.775 175.961 414.533 177.023C414.737 175.794 417.242 160.364 417.242 160.364C426.954 157.518 433.354 156.447 440.555 156.447C457.295 156.447 466.159 163.96 466.142 178.159C466.174 181.964 465.545 186.659 464.563 192.83C462.879 203.564 459.242 226.551 458.75 232.155V232.155ZM238.36 231.03C233.027 232.709 228.869 233.428 224.36 233.428C214.398 233.428 208.961 227.703 208.961 217.161C208.819 213.89 210.394 205.281 211.632 197.424C212.757 190.507 220.081 146.895 220.081 146.895H239.452L237.189 158.103H248.888L246.246 175.899H234.504C232.254 189.982 229.05 207.524 229.013 209.849C229.013 213.665 231.05 215.332 235.684 215.332C237.905 215.332 239.624 215.105 240.938 214.632L238.36 231.03V231.03ZM297.752 230.43C291.098 232.464 284.677 233.447 277.873 233.43C256.189 233.409 244.886 222.084 244.886 200.398C244.886 175.085 259.266 156.451 278.785 156.451C294.756 156.451 304.956 166.884 304.956 183.247C304.956 188.676 304.256 193.976 302.568 201.459H263.994C262.689 212.2 269.564 216.676 280.831 216.676C287.766 216.676 294.019 215.247 300.973 212.013L297.752 230.43V230.43ZM286.864 186.53C286.971 184.987 288.919 173.313 277.851 173.313C271.68 173.313 267.268 178.017 265.471 186.53H286.864V186.53ZM163.444 181.513C163.444 190.88 167.986 197.339 178.286 202.189C186.178 205.898 187.398 206.999 187.398 210.359C187.398 214.976 183.919 217.06 176.207 217.06C170.394 217.06 164.986 216.152 158.749 214.138C158.749 214.138 156.186 230.459 156.069 231.24C160.499 232.207 164.449 233.101 176.348 233.43C196.911 233.43 206.407 225.601 206.407 208.68C206.407 198.505 202.431 192.534 192.67 188.046C184.499 184.296 183.562 183.459 183.562 180.001C183.562 175.997 186.799 173.955 193.099 173.955C196.924 173.955 202.149 174.363 207.099 175.067L209.874 157.892C204.828 157.092 197.178 156.45 192.724 156.45C170.923 156.451 163.377 167.838 163.444 181.513V181.513ZM392.534 158.397C397.946 158.397 402.992 159.818 409.946 163.318L413.134 143.555C410.28 142.434 400.23 135.855 391.717 135.855C378.676 135.855 367.652 142.326 359.897 153.005C348.588 149.259 343.939 156.83 338.24 164.372L333.177 165.551C333.56 163.068 333.906 160.601 333.789 158.105H315.893C313.448 181.022 309.115 204.233 305.722 227.18L304.838 232.156H324.334C327.588 211.013 329.371 197.476 330.455 188.314L337.796 184.23C338.893 180.152 342.325 178.772 349.213 178.939C348.287 183.947 347.824 189.03 347.83 194.123C347.83 218.348 360.9 233.431 381.88 233.431C387.284 233.431 391.921 232.719 399.101 230.773L402.531 210.014C396.073 213.195 390.772 214.691 385.972 214.691C374.643 214.691 367.788 206.328 367.788 192.506C367.788 172.455 377.984 158.397 392.534 158.397"
        fill="black"
      />
      <path
        d="M95.2095 226.744H75.7184L86.8895 156.756L61.9635 226.744H48.6805L47.0385 157.156L35.3055 226.744H17.0645L32.3015 135.702H60.3224L61.1104 192.064L80.0145 135.702H110.281L95.2095 226.744Z"
        fill="white"
      />
      <path
        d="M557.52 141.104L553.199 167.413C547.87 160.4 542.145 155.325 534.587 155.325C524.754 155.325 515.804 162.78 509.945 173.75C501.787 172.058 493.348 169.187 493.348 169.187L493.344 169.254C494.002 163.12 494.265 159.379 494.206 158.108H476.306C473.868 181.025 469.535 204.236 466.149 227.183L465.256 232.159H484.748C487.381 215.063 489.396 200.868 490.881 189.608C497.539 183.592 500.873 178.342 507.602 178.692C504.623 185.897 502.877 194.195 502.877 202.709C502.877 221.222 512.243 233.434 526.41 233.434C533.552 233.434 539.031 230.972 544.377 225.263L543.464 232.147H561.899L576.741 141.105L557.52 141.104V141.104ZM533.149 215.045C526.515 215.045 523.166 210.137 523.166 200.449C523.166 185.894 529.437 175.574 538.278 175.574C544.973 175.574 548.598 180.678 548.598 190.083C548.599 204.762 542.228 215.045 533.149 215.045V215.045Z"
        fill="black"
      />
      <path
        d="M143.19 193.764C141.148 193.528 140.244 193.465 138.844 193.465C127.798 193.465 122.21 197.252 122.21 204.731C122.21 209.335 124.939 212.278 129.189 212.278C137.136 212.277 142.857 204.719 143.19 193.764V193.764ZM157.368 226.748H141.222L141.589 219.085C136.668 225.139 130.089 228.035 121.168 228.035C110.601 228.035 103.363 219.785 103.363 207.806C103.363 189.774 115.955 179.264 137.58 179.264C139.788 179.264 142.622 179.464 145.518 179.835C146.122 177.394 146.281 176.348 146.281 175.027C146.281 170.118 142.889 168.298 133.785 168.298C124.248 168.19 116.389 170.569 113.156 171.619C113.36 170.394 115.856 154.982 115.856 154.982C125.564 152.124 131.976 151.053 139.176 151.053C155.913 151.053 164.78 158.57 164.764 172.757C164.793 176.578 164.16 181.27 163.18 187.432C161.493 198.156 157.861 221.156 157.368 226.748V226.748ZM418.748 138.156L415.557 157.923C408.607 154.427 403.557 153.003 398.15 153.003C383.599 153.003 373.4 167.061 373.4 187.109C373.4 200.93 380.257 209.29 391.584 209.29C396.384 209.29 401.68 207.798 408.138 204.615L404.717 225.365C397.533 227.322 392.901 228.035 387.492 228.035C366.515 228.035 353.441 212.951 353.441 188.726C353.441 156.176 371.5 133.426 397.329 133.426C405.836 133.427 415.89 137.035 418.748 138.156V138.156ZM450.191 193.764C448.15 193.528 447.25 193.465 445.844 193.465C434.803 193.465 429.211 197.252 429.211 204.731C429.211 209.335 431.94 212.278 436.194 212.278C444.132 212.277 449.857 204.719 450.191 193.764V193.764ZM464.369 226.748H448.219L448.59 219.085C443.665 225.139 437.09 228.035 428.169 228.035C417.606 228.035 410.365 219.785 410.365 207.806C410.365 189.774 422.961 179.264 444.577 179.264C446.79 179.264 449.619 179.464 452.518 179.835C453.119 177.394 453.281 176.348 453.281 175.027C453.281 170.118 449.888 168.298 440.786 168.298C431.253 168.19 423.39 170.569 420.156 171.619C420.36 170.394 422.86 154.982 422.86 154.982C432.569 152.124 438.976 151.053 446.176 151.053C462.917 151.053 471.78 158.57 471.759 172.757C471.792 176.578 471.163 181.27 470.18 187.432C468.498 198.156 464.857 221.156 464.369 226.748ZM243.979 225.627C238.641 227.306 234.483 228.035 229.979 228.035C220.017 228.035 214.58 222.309 214.58 211.767C214.442 208.488 216.018 199.887 217.255 192.031C218.375 185.105 225.7 141.497 225.7 141.497H245.068L242.808 152.709H252.749L250.103 170.497H240.128C237.878 184.589 234.665 202.117 234.632 204.447C234.632 208.277 236.673 209.929 241.303 209.929C243.524 209.929 245.241 209.713 246.557 209.238L243.979 225.627V225.627ZM303.37 225.035C296.72 227.068 290.291 228.047 283.491 228.035C261.806 228.014 250.504 216.689 250.504 195.002C250.504 169.681 264.883 151.052 284.403 151.052C300.374 151.052 310.574 161.481 310.574 177.852C310.574 183.286 309.874 188.585 308.19 196.064H269.616C268.31 206.805 275.185 211.286 286.453 211.286C293.383 211.286 299.641 209.851 306.591 206.609L303.37 225.035V225.035ZM292.479 181.123C292.595 179.585 294.539 167.906 283.466 167.906C277.299 167.906 272.887 172.623 271.091 181.123H292.479ZM169.059 176.118C169.059 185.485 173.601 191.936 183.901 196.793C191.793 200.502 193.013 201.605 193.013 204.965C193.013 209.581 189.53 211.664 181.825 211.664C176.009 211.664 170.6 210.756 164.358 208.743C164.358 208.743 161.804 225.064 161.687 225.844C166.108 226.811 170.062 227.694 181.962 228.035C202.528 228.035 212.021 220.206 212.021 203.289C212.021 193.109 208.05 187.139 198.284 182.652C190.117 178.893 189.171 178.068 189.171 174.606C189.171 170.606 192.417 168.547 198.713 168.547C202.534 168.547 207.759 168.968 212.717 169.672L215.488 152.493C210.446 151.693 202.796 151.052 198.342 151.052C176.538 151.052 168.996 162.431 169.059 176.118V176.118ZM567.509 226.748H549.071L549.988 219.855C544.641 225.572 539.163 228.035 532.02 228.035C517.854 228.035 508.492 215.822 508.492 197.309C508.492 172.679 523.013 151.917 540.2 151.917C547.759 151.917 553.479 155.004 558.804 162.013L563.129 135.705H582.35L567.509 226.748V226.748ZM538.763 209.639C547.838 209.639 554.213 199.356 554.213 184.686C554.213 175.281 550.584 170.177 543.888 170.177C535.051 170.177 528.773 180.492 528.773 195.052C528.772 204.738 532.13 209.639 538.763 209.639ZM481.921 152.71C479.48 175.627 475.148 198.84 471.759 221.773L470.867 226.749H490.358C497.33 181.474 499.016 172.632 509.946 173.74C511.688 164.473 514.928 156.357 517.345 152.261C509.182 150.561 504.624 155.174 498.657 163.936C499.128 160.148 499.99 156.469 499.819 152.711L481.921 152.71V152.71ZM321.501 152.71C319.055 175.627 314.722 198.84 311.334 221.773L310.446 226.749H329.946C336.909 181.474 338.592 172.632 349.516 173.74C351.266 164.473 354.507 156.357 356.915 152.261C348.761 150.561 344.198 155.174 338.236 163.936C338.707 160.148 339.56 156.469 339.398 152.711L321.501 152.71V152.71ZM576.071 220.951C576.067 217.752 578.657 215.156 581.855 215.152H581.867C585.064 215.148 587.66 217.738 587.663 220.935V220.951C587.662 224.152 585.068 226.746 581.867 226.748C578.666 226.746 576.072 224.152 576.071 220.951V220.951ZM581.867 225.356C584.298 225.358 586.269 223.387 586.27 220.957V220.953C586.273 218.52 584.302 216.547 581.871 216.545H581.867C579.432 216.546 577.46 218.519 577.459 220.953C577.461 223.385 579.434 225.356 581.867 225.356ZM581.083 223.485H579.895V218.403H582.048C582.494 218.403 582.957 218.412 583.344 218.657C583.761 218.94 583.998 219.424 583.998 219.931C583.998 220.506 583.661 221.043 583.11 221.248L584.051 223.484H582.731L581.952 221.475H581.082L581.083 223.485ZM581.083 220.606H581.736C581.982 220.606 582.249 220.625 582.465 220.506C582.661 220.381 582.761 220.145 582.761 219.918C582.752 219.708 582.647 219.514 582.474 219.395C582.27 219.278 581.932 219.311 581.711 219.311H581.082L581.083 220.606V220.606Z"
        fill="white"
      />
    </svg>
  ),

  Mic: () => (
    <svg
      className="w-7 h-6"
      fill="none"
      stroke="#848F91"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  ),
  Search: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#848F91"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
};

export const CarouselStyles = {
  root: () =>
    `flex items-center justify-center w-full h-full py-5 sm:py-8 px-4 overflow-hidden mx-auto`,
  container: () => `w-full relative flex items-center justify-center`,
  carousel: () => `w-full h-full mx-auto overflow-x-hidden overflow-y-hidden`,
  grid: () => ``,
  carouselPosition: () =>
    `h-full flex gap-6 items-center justify-start transition ease-out duration-700`,
  iconPrev: () =>
    ` absolute bg-slate-100 p-2 left-0 cursor-pointer rounded-sm border border-indigo-50 `,
  iconNext: () =>
    ` absolute bg-slate-100 p-2 right-0 cursor-pointer rounded-sm border border-slate-100 `,
};

export const LcsRadioGroupStyles = {
  root: () => `grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto`,
  label: () =>
    `flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent`,
  input: () => `sr-only peer`,
  position: () => `relative`,
};
