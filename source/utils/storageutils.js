import Cookies from "js-cookie";
import { isNullOrUndefined } from "@/utils/index";
const DEFAULT_USER_OBJ = "userObj";

const DEFAULT_JWT_COMUI = "jwt_descomui";
const DEFAULT_JWT_REFRESH_COMUI = "jwt_refresh_descomui";
const DEFAULT_USERID_COMUI = "com_userid";
const DEFAULT_USERSEG_COMUI = "com_user_segment";
const DEFAULT_SOLR_COLLECTION = "com_solr_collection";
const DEFAULT_SEARCH_TERM = "com_searchTerm";
const DEFAULT_SEARCH_ENV = "com_searchTerm";
const DEFAULT_USERNAME_COMUI = "com_firstname";
const DEFAULT_SYS_ENV = "com_sysEnv";
const DEFAULT_ORG_COMUI = "com_user_org";
const DEFAULT_B2B_USER = "com_user_b2b";

const ISSERVER = typeof window === "undefined";

const getUserDatafromLocalStorage = (itemNode) => {
  let sourceUserObj = "";
  let itemData = "";
  try {
    sourceUserObj = JSON.parse(localStorage.getItem(DEFAULT_USER_OBJ));
    itemData = sourceUserObj.userDetails[itemNode];
  } catch (error) {
    itemData = "";
  }
  return itemData;
};

const getItemfromLocalStorage = (itemNode) => {
  let itemData = localStorage.getItem(itemNode);
  return itemData;
};

const setItemtoLocalStorage = (itemNode, itemValue) => {
  localStorage.setItem(itemNode, itemValue);
  // TODO: get this done from server side later
  if (itemNode === "jwt_descomui") {
    Cookies.set("token", itemValue);
  }
};

const getUserDatafromSessionStorage = (itemNode) => {
  let sourceUserObj = JSON.parse(localStorage.getItem(DEFAULT_USER_OBJ));
  let itemData = sourceUserObj.userDetails[itemNode];
  return itemData;
};

const getStrCharacteristicsfromLS = (charNode) => {
  let itemData = localStorage.getItem("com_user_char");
  if (itemData != undefined) {
    let charObj = JSON.parse(itemData);
    return charObj[charNode];
  }
  return itemData;
};

const getIntCharacteristicsfromLS = (charNode) => {
  if (!ISSERVER) {
    let itemData = localStorage.getItem("com_user_char");
    let intData = 0;
    if (itemData != undefined) {
      try {
        let charObj = JSON.parse(itemData);
        intData = parseInt(charObj[charNode]);
      } catch (error) {
        intData = 0;
      }
    }
    return intData;
  }
};

const getItemfromSessionStorage = (itemNode) => {
  let token;
  if (!ISSERVER) {
    if (itemNode === "jwt_descomui") {
      token = localStorage.getItem(itemNode);
      if (isNullOrUndefined(token)) {
        token = localStorage.getItem("guestsess");
        return token;
      }
      return token;
    } else {
      return localStorage.getItem(itemNode);
    }
  }
};

const setItemtoSessionStorage = (itemNode, itemValue) => {
  localStorage.setItem(itemNode, itemValue);
  // TODO: get this done from server side later
  if (itemNode === "jwt_descomui") {
    Cookies.set("token", itemValue);
  }
};

const removeItemtoSessionStorage = (itemNode) => {
  if (!ISSERVER) {
    window.localStorage.removeItem(itemNode);
  }
};

const getUserId = () => {
  let itemData = localStorage.getItem(DEFAULT_USERID_COMUI);
  return itemData;
};

const getUserName = () => {
  let itemData = localStorage.getItem(DEFAULT_USERNAME_COMUI);
  return itemData;
};

const getUserSeg = () => {
  let itemData = localStorage.getItem(DEFAULT_USERSEG_COMUI);
  return itemData;
};

const getComToken = () => {
  let itemData = localStorage.getItem(DEFAULT_JWT_COMUI);
  return itemData;
};

const getUserOrg = () => {
  let itemData = localStorage.getItem(DEFAULT_ORG_COMUI);
  try {
    return itemData === undefined || itemData === null || itemData === ""
      ? "None"
      : itemData;
  } catch (error) {
    return "None";
  }
};

const getComRefreshToken = () => {
  let itemData = localStorage.getItem(DEFAULT_JWT_REFRESH_COMUI);
  return itemData;
};

const getCookie = (name) => {
  let cookieData = document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
  return cookieData;
};

const getB2BUserfromLocalStorage = () => {
  let sourceUserB2BObj = undefined;
  try {
    sourceUserB2BObj = JSON.parse(localStorage.getItem(DEFAULT_B2B_USER));
  } catch (error) {
    sourceUserB2BObj = undefined;
  }
  return sourceUserB2BObj;
};

export {
  getUserDatafromLocalStorage,
  getItemfromLocalStorage,
  setItemtoLocalStorage,
  getUserDatafromSessionStorage,
  getItemfromSessionStorage,
  setItemtoSessionStorage,
  removeItemtoSessionStorage,
  DEFAULT_JWT_COMUI,
  DEFAULT_USERID_COMUI,
  DEFAULT_USERSEG_COMUI,
  DEFAULT_SOLR_COLLECTION,
  DEFAULT_SEARCH_TERM,
  DEFAULT_SEARCH_ENV,
  DEFAULT_USERNAME_COMUI,
  DEFAULT_SYS_ENV,
  DEFAULT_ORG_COMUI,
  getUserId,
  getUserSeg,
  getCookie,
  getUserName,
  getComToken,
  getComRefreshToken,
  getUserOrg,
  getStrCharacteristicsfromLS,
  getIntCharacteristicsfromLS,
  getB2BUserfromLocalStorage,
};
