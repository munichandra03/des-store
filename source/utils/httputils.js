//import Axios from 'Axios';
import Axios from "./httpinterceptor";
import { isNullOrUndefined } from "@/utils/index";
import config from "../config.json";

import {
  getItemfromSessionStorage,
  DEFAULT_JWT_COMUI,
  DEFAULT_SEARCH_ENV,
  getUserId,
  DEFAULT_SOLR_COLLECTION,
  getB2BUserfromLocalStorage,
  // , getCookie
  // , DEFAULT_SYS_ENV
} from "./storageutils";
import searchapi from "./http.search.utils";

function getSolrCollection() {
  // localStorage.setItem("storefront_solr_collection", "NewCommerceSolr"); //dont push this to git // rmeove this
  let collection_solr = getItemfromSessionStorage(DEFAULT_SOLR_COLLECTION);
  return collection_solr;
}

function getSearchEnv() {
  //let comSearchEnv = localStorage.getItem('com_search_env');
  let comSearchEnv = getItemfromSessionStorage(DEFAULT_SEARCH_ENV);
  if (comSearchEnv !== null) {
    return comSearchEnv;
  } else {
    return process.env.SEARCH_ENV;
  }
}

function getSysEnv() {
  let searchEnv = getSearchEnv();
  let sysEnv = "DES";
  switch (searchEnv) {
    case "msdessearch":
      sysEnv = "MSDES";
      break;
    case "msendecasearch":
      sysEnv = "MSATG";
      break;
    default:
      sysEnv = "DES";
      break;
  }
  return sysEnv;
}

function setAuthorizationHeader(setCred) {
  //let auth = localStorage.getItem(TOKEN_KEY);
  var clientTimezoneOffset = new Date().getTimezoneOffset() / 60; //offset in hours

  let auth = getItemfromSessionStorage(DEFAULT_JWT_COMUI);
  let authToken = {
    headers: {
      Authorization: "Bearer " + auth,
    },
  };
  if (setCred) {
    //authToken.withCredentials = true
    //authToken.credentials = 'include'
  }
  return authToken;
}

function setSearchAuthorizationHeader() {
  let auth = getItemfromSessionStorage(DEFAULT_JWT_COMUI);
  let authToken = {
    headers: {
      Authorization: "Bearer " + auth,
    },
  };
  return authToken;
}

const api = (() => {
  const getAuthService = (PART_URL) => {
    let fullUrl = searchapi.setAuthEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.get(fullUrl, setAuthorizationHeader(true))
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const getCartService = (PART_URL) => {
    //let fullUrl = "http://localhost:4100/" + PART_URL;
    let fullUrl = searchapi.getCoreNodeEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.get(fullUrl, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const getUserPreference = (PART_URL, data) => {
    let fullUrl = searchapi.getCoreNodeEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.post(fullUrl, data, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const getLogSearchService = (
    PART_URL,
    productId,
    searchTerm,
    facetTerm,
    signalType,
    prevProdId,
    seenfor,
    paramproductName,
    categoryId,
    oldproductName,
    parambrandName
  ) => {
    let fullUrl =
      searchapi.setSearchEnv() + searchapi.getMiddleURL() + PART_URL;
    sendClickSignal(
      productId, // 1
      searchTerm, // 2
      facetTerm, // 3
      signalType, // 4
      undefined, // 5
      seenfor, // 6
      paramproductName, // 7
      categoryId, // 8
      oldproductName, // 9
      parambrandName // 10
    );
    if (prevProdId != productId && prevProdId != undefined) {
      if (prevProdId != "") {
        sendClickSignal(
          productId, // 1
          searchTerm, // 2
          facetTerm, // 3
          "linked", // 4
          prevProdId, // 5
          null, // 6
          paramproductName, // 7
          categoryId, // 8
          oldproductName, // 9
          parambrandName // 10
        );
      }
    }

    return new Promise((resolve, reject) => {
      Axios.get(fullUrl, setSearchAuthorizationHeader(), {
        //withCredentials: true,
        //credentials: 'include',
      })
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const getXPService = async (PART_URL, token) => {
    let fullUrl = searchapi.setXPEnv() + PART_URL;

    let headersObj;
    if (token) {
      headersObj = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      headersObj = await setAuthorizationHeader();
    }

    return new Promise((resolve, reject) => {
      Axios.get(fullUrl, headersObj)
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const postAuthService = (PART_URL, data) => {
    let fullUrl = searchapi.setAuthEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.post(fullUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
        //withCredentials: true
      })
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const postAuthenticatedService = (PART_URL, data) => {
    let fullUrl = searchapi.setAuthEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.post(fullUrl, data, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const postCartService = (
    PART_URL, // 1
    data, // 2
    productId, // 3
    searchTerm, // 4
    facetTerm, // 5
    cartType, // 6
    product_name, // 7
    category, // 8
    invoiceAmount, //9
    totalProducts //10
  ) => {
    if (searchTerm === undefined) {
      searchTerm = "Cart Signal";
    }
    cartType === undefined ? "cart" : cartType;

    if (cartType !== "purchase") {
      sendClickSignal(
        productId, // 1
        searchTerm, // 2
        facetTerm, // 3
        cartType, // 4
        undefined, // 5
        undefined, // 6
        product_name, // 7
        category, // 8
        undefined, // 9
        undefined, // 10
        invoiceAmount,
        totalProducts
      );
    }

    let fullUrl = searchapi.getCoreNodeEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.post(fullUrl, data, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const postLogSearchService = (PART_URL, data) => {
    let fullUrl = searchapi.setSearchEnv() + searchapi.getMiddleURL();
    PART_URL;
    return new Promise((resolve, reject) => {
      Axios.post(fullUrl, data, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const postXPService = (PART_URL, data) => {
    let fullUrl = searchapi.setXPEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.post(fullUrl, data, setAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const sendClickSignal = (
    productId, // 1
    searchTerm, // 2
    facetTerm, // 3
    signalType, // 4
    prevProdId, // 5
    seenfor, // 6
    product_name, // 7
    category, // 8
    prev_product_name, // 9
    parambrandName, // 10
    invoiceAmount, // 11
    totalProducts, // 12
    cancelproduct_reason, //13
    orderId,
    cartTotal
  ) => {
    if (signalType !== undefined) {
      let signalObj = {};
      //signalObj.user_id = localStorage.getItem('com_userid');
      signalObj.user_id = getUserId();
      if (getItemfromSessionStorage("com_user_dont_track") === "true") {
        // console.log("**************************************************");
        // console.log("**************** NOT TRACKING " + signalObj.user_id);
        // console.log("**************************************************");
        return;
      } else {
        // console.log("**************************************************");
        // console.log("**************** tracking for " + signalObj.user_id);
        // console.log("**************************************************");
      }
      signalObj.app = getSolrCollection();
      signalObj.signalType = signalType;
      if (searchTerm !== null && productId != undefined) {
        signalObj.query_term = searchTerm;
      } else {
        signalObj.query_term = "nodesearch";
      }
      if (productId !== null && productId != undefined) {
        signalObj.product_id = productId; //required false
      }
      if (facetTerm !== null && facetTerm != undefined) {
        signalObj.facet_term = facetTerm; //required false
      }
      if (category !== null && category != undefined) {
        signalObj.category = category; //required
      } else {
        signalObj.category = "NONE";
      }

      if (prevProdId !== null && prevProdId != undefined) {
        signalObj.linked_product_id = prevProdId; //required false
      }
      if (seenfor !== null && seenfor != undefined) {
        signalObj.seenfor = seenfor; //required false
      }
      if (product_name !== null && product_name != undefined) {
        signalObj.product_name = product_name; //required false
      }
      if (prev_product_name !== null && prev_product_name != undefined) {
        signalObj.linked_product_name = prev_product_name; //required false
      }
      if (parambrandName !== null && parambrandName != undefined) {
        signalObj.brandName = parambrandName; //required false
      }
      if (invoiceAmount !== null && invoiceAmount != undefined) {
        signalObj.invoiceAmount = invoiceAmount; //required false
      }
      if (totalProducts !== null && totalProducts != undefined) {
        if (signalType === "purchase") {
          signalObj.products = totalProducts; //required false
        } else {
          signalObj.totalProducts = totalProducts; //required false
        }
      }
      if (cancelproduct_reason !== null && cancelproduct_reason != undefined) {
        signalObj.cancelproduct_reason = cancelproduct_reason; //required false
      }
      if (orderId !== null && orderId !== undefined) {
        signalObj.orderId = orderId; //required false
      }
      if (cartTotal !== null && cartTotal !== undefined) {
        signalObj.cartTotal = cartTotal;
      }
      try {
        let firstname = localStorage.getItem("com_firstname");
        let catalogue = "cat2";
        if (firstname === "Anne" || firstname === "Tom") {
          catalogue = "cat1";
        }
        if (signalObj.app === "KamanSolr") {
          signalObj.prod_catalogue = catalogue;
        }
      } catch (error) {
        console.log(error);
      }
      // console.log("=================================================");
      // console.log(signalObj);
      // console.log("=================================================");
      //sendClickSignalV1(signalObj)
      sendClickSignalV2(signalObj);
      // sendGTM(signalObj);
    }
  };

  const sendGTM = (signalObj) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ signalObj });
    // console.log("sendGTM", window.dataLayer);
  };
  const sendClickSignalV2 = (signalObj) => {
    return new Promise((resolve, reject) => {
      let fullUrl =
        searchapi.getCoreSignalEnv() + config.apiUrlData.signals.part_url;
      Axios.post(fullUrl, signalObj, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };
  const sendClickSignalV1 = (signalObj) => {
    return new Promise((resolve, reject) => {
      let fullUrl =
        searchapi.getCoreNodeEnv() + config.apiUrlData.signals.part_url;
      Axios.post(fullUrl, signalObj, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const sendPageSignal = (pageName, previousPage, seenfor, isExternal) => {
    let pageSignalObj = {};
    //signalObj.user_id = localStorage.getItem('com_userid');
    pageSignalObj.user_id = getUserId();
    pageSignalObj.app = getSolrCollection();
    pageSignalObj.pageName = pageName;
    pageSignalObj.previousPage = previousPage;
    pageSignalObj.isExternal = isExternal === undefined ? false : isExternal;
    if (seenfor !== null && seenfor != undefined) {
      pageSignalObj.seenfor = seenfor; //required false
    }
    // send to GTM
    //sendGTM(pageSignalObj);
    return new Promise((resolve, reject) => {
      let fullUrl =
        searchapi.getCoreSignalEnv() + config.apiUrlData.pagesignals.part_url;
      Axios.post(fullUrl, pageSignalObj, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };
  //-----------------------------------------------------------------------------
  const getRefreshToken = (PART_URL) => {
    let fullUrl = searchapi.setAuthEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.get(fullUrl, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };

  const getUserLogout = (PART_URL) => {
    let fullUrl = searchapi.setAuthEnv() + PART_URL;
    return new Promise((resolve, reject) => {
      Axios.get(fullUrl, setSearchAuthorizationHeader())
        .then((response) =>
          resolve({
            response,
          })
        )
        .catch((response) =>
          reject({
            response,
          })
        );
    });
  };
  const getGuestUser = () => {
    console.log("this is guest user");
    if (typeof window !== "undefined") {
      var navigator_info = window?.navigator;
      var screen_info = window?.screen;
      var uid = navigator_info.mimeTypes.length;
      uid += navigator_info.userAgent.replace(/\D+/g, "");
      uid += navigator_info.plugins.length;
      uid += screen_info.height || "";
      uid += screen_info.width || "";
      uid += screen_info.pixelDepth || "";
      let data = "stackabuse.com";
      let buff = new Buffer(data);
      let base64data = buff.toString("base64");
      uid += "~~~" + base64data || "";

      console.log(uid);
      let isGuest = localStorage.getItem("guestsess");
      if (isNullOrUndefined(isGuest)) {
        // call nextj/api/jwt
        Axios({
          method: "post",
          url: "/api/jwt",
          data: {
            uid,
          },
        })
          .then((res) => {
            console.log("res", res.data);
            // set in localstorage or cookies
            localStorage.setItem("guestsess", res.data.token);
            // Cookies.set("guestsess", res.data.token);
          })
          .catch((error) => {
            console.log("error in axios guest", error);
          });
      }
    }
  };
  return {
    getAuthService,
    getCartService,
    getLogSearchService,
    getXPService,
    getUserPreference,
    postAuthService,
    postCartService,
    postLogSearchService,
    postXPService,
    getSolrCollection,
    sendClickSignal,
    sendPageSignal,
    //NODE_XP_URL,
    getRefreshToken,
    getSysEnv,
    postAuthenticatedService,
    getUserLogout,
    getGuestUser,
  };
})();

export default api;
