import config from "../config.json";

import {
  getItemfromSessionStorage,
  DEFAULT_SEARCH_ENV,
  DEFAULT_SOLR_COLLECTION,
} from "./storageutils";

const searchapi = (() => {
  const NODE_SEARCH_ROUTER_BASE = config.nodeSearchRouterBase + "/";

  const BASE_ENV_PREFIX = config.APP_ENV === undefined ? "DEV" : config.APP_ENV;
  const NODE_SEARCH_URL =
    BASE_ENV_PREFIX === "PROD"
      ? config.prod_nodeSearchBaseApiUrl
      : BASE_ENV_PREFIX === "CLOUD"
      ? config.cloud_nodeSearchBaseApiUrl
      : BASE_ENV_PREFIX === "GCP"
      ? config.gcp_nodeSearchBaseApiUrl
      : config.nodeSearchBaseApiUrl;

  const MSDES_SEARCH_URL =
    BASE_ENV_PREFIX === "PROD"
      ? config.prod_msSearchBaseApiUrl
      : BASE_ENV_PREFIX === "CLOUD"
      ? config.cloud_msSearchBaseApiUrl
      : BASE_ENV_PREFIX === "GCP"
      ? config.gcp_msSearchBaseApiUrl
      : config.msSearchBaseApiUrl;

  const MSENDECA_SEARCH_URL =
    BASE_ENV_PREFIX === "PROD"
      ? config.prod_msEndecaBaseApiUrl
      : BASE_ENV_PREFIX === "CLOUD"
      ? config.cloud_msEndecaBaseApiUrl
      : BASE_ENV_PREFIX === "GCP"
      ? config.gcp_msEndecaBaseApiUrl
      : config.msEndecaBaseApiUrl;

  const NODE_AUTH_URL =
    BASE_ENV_PREFIX === "PROD"
      ? config.prod_authbaseApiUrl
      : BASE_ENV_PREFIX === "CLOUD"
      ? config.cloud_authbaseApiUrl
      : BASE_ENV_PREFIX === "GCP"
      ? config.gcp_authbaseApiUrl
      : config.authbaseApiUrl;
  //config.authbaseApiUrl;

  const NODE_XP_URL =
    BASE_ENV_PREFIX === "PROD"
      ? config.prod_xpbaseApiUrl
      : BASE_ENV_PREFIX === "CLOUD"
      ? config.cloud_xpbaseApiUrl
      : BASE_ENV_PREFIX === "GCP"
      ? config.gcp_xpbaseApiUrl
      : config.xpbaseApiUrl;
  //config.xpbaseApiUrl;

  const NODE_SIGNAL_URL =
    BASE_ENV_PREFIX === "PROD"
      ? config.prod_signalbaseApiUrl
      : BASE_ENV_PREFIX === "CLOUD"
      ? config.cloud_signalbaseApiUrl
      : BASE_ENV_PREFIX === "GCP"
      ? config.gcp_signalbaseApiUrl
      : config.signalbaseApiUrl;

  function setSolrCollection() {
    //let collection = localStorage.getItem('com_solrcollection');
    let collection = getItemfromSessionStorage(DEFAULT_SOLR_COLLECTION);
    if (collection !== null) {
      return collection;
    } else {
      return config.collection;
    }
  }

  function getSolrCollection() {
    let collection_solr = getItemfromSessionStorage(DEFAULT_SOLR_COLLECTION);
    return collection_solr;
  }

  function getSearchEnv() {
    let comSearchEnv = getItemfromSessionStorage(DEFAULT_SEARCH_ENV);
    if (comSearchEnv !== null) {
      return comSearchEnv;
    } else {
      return process.env.SEARCH_ENV;
    }
  }

  function setSearchEnv() {
    let searchenv = getSearchEnv();
    if (searchenv === "javasearch") {
      return config.javaSearchBaseApiUrl;
    } else if (searchenv === "msdessearch") {
      return MSDES_SEARCH_URL;
    } else if (searchenv === "msendecasearch") {
      return MSENDECA_SEARCH_URL;
    } else if (searchenv === "nodesearch") {
      return NODE_SEARCH_URL;
    } else {
      return NODE_SEARCH_URL;
    }
  }
  function getCoreNodeEnv() {
    return NODE_SEARCH_URL;
  }

  function setAuthEnv() {
    return NODE_AUTH_URL;
  }

  function getCoreSignalEnv() {
    return NODE_SIGNAL_URL;
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

  function setXPEnv() {
    return NODE_XP_URL;
  }

  function getMiddleURL() {
    let sysEnv = getSysEnv();

    let middleURL = setSolrCollection();
    switch (sysEnv) {
      case "MSDES":
      case "MSATG":
        middleURL = "";
        break;
      default:
        middleURL = "";

        break;
    }
    return middleURL;
  }

  function getSearchPrefix() {
    let sysEnv = getSysEnv();

    let searchPrefix = "logsearch" + "/" + setSolrCollection() + "/";
    switch (sysEnv) {
      case "MSDES":
      case "MSATG":
        searchPrefix = "";
        break;
    }
    return searchPrefix;
  }

  function getSearchSuffix() {
    let currcoll = getSolrCollection();

    let searchSuffix = "L2Category_str,L1Category_str,Brand_str";
    switch (currcoll) {
      case "KamanSolr":
        searchSuffix = "L1Category_str,L2Category_str,Brand_str";
        break;
    }
    return searchSuffix;
  }
  function getActualURL(partObj) {
    let extSys = localStorage.getItem("com_sysEnv");
    return partObj[extSys];
  }
  return {
    NODE_SEARCH_ROUTER_BASE,
    BASE_ENV_PREFIX,
    NODE_SEARCH_URL,
    NODE_AUTH_URL,
    NODE_XP_URL,
    setSolrCollection,
    getSolrCollection,
    getSearchEnv,
    setSearchEnv,
    setAuthEnv,
    setXPEnv,
    getMiddleURL,
    getActualURL,
    getCoreNodeEnv,
    getSearchPrefix,
    getSearchSuffix,
    getCoreSignalEnv,
  };
})();

export default searchapi;
