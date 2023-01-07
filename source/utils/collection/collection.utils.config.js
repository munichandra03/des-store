import API from "../httputils";
// import { importAllImages } from "utils/custom";

const COLLECTION_DOC_SOLR = "DocCommerceSolr";
const COLLECTION_WINE_SOLR = "WineCommerceSolr";
const COLLECTION_KAMAN_SOLR = "KamanSolr";
const COLLECTION_NEWCOMM_SOLR = "NewCommerceSolr";
const COLLECTION_PRIDE_SOLR = "PrideCommerceSolr";
const COLLECTION_BBB_SOLR = "BBBCommerceSolr";

const COLLECTION_KDG_SOLR = "KDGCommerceSolr";

const CONFIG_IMAGE_CLASS = "PRODUCTIMAGE";
const CONFIG_IMAGE_SEP = "PRODUCTIMAGESEP";

// const images = importAllImages(
//   require.context('images', false, /\.(png|jpe?g|JPE?G)$/),
// );

const collconfig = (() => {
  var colldata = undefined;
  const loadCollConfig = () => {
    let collconfig = {};
    collconfig[COLLECTION_DOC_SOLR] = {
      prodImgClass: "docImg_rect",
      seperator: "| ",
      cartImgClass: "docImg_rect",
      theme: "dcs",
    };
    collconfig[COLLECTION_WINE_SOLR] = {
      prodImgClass: "productImg_rect",
      seperator: "| ",
      cartImgClass: "productImg_rect",
      theme: "wcs",
    };
    collconfig[COLLECTION_KAMAN_SOLR] = {
      prodImgClass: "productImg",
      seperator: "| ",
      cartImgClass: "productImg",
      theme: "kcs",
    };
    collconfig[COLLECTION_NEWCOMM_SOLR] = {
      prodImgClass: "productImg",
      seperator: "| ",
      cartImgClass: "productImg",
      theme: "normal",
    };
    collconfig[COLLECTION_PRIDE_SOLR] = {
      prodImgClass: "productImg",
      seperator: "| ",
      cartImgClass: "productImg",
      theme: "normal",
    };
    collconfig[COLLECTION_BBB_SOLR] = {
      prodImgClass: "productImg",
      seperator: "| ",
      cartImgClass: "productImg",
      theme: "bbb",
    };
    return collconfig;
  };

  const loadColldata = () => {
    if (colldata === undefined) {
      colldata = loadCollConfig();
    }
    return colldata;
  };
  const getTenantConfig = (configKey) => {
    let currSolrColl = API.getSolrCollection();
    // currSolrColl === 'KamanSolr' ? ',' : '| '
    switch (configKey) {
      case CONFIG_IMAGE_CLASS:
        return getImageClass(currSolrColl);
        break;
      case CONFIG_IMAGE_SEP:
        return getImageSeperator(currSolrColl);
        break;
      default:
        break;
    }
  };

  const getImageClass = (currSolrColl) => {
    let imageClass =
      currSolrColl === COLLECTION_DOC_SOLR
        ? "docImg_rect"
        : currSolrColl === COLLECTION_WINE_SOLR
        ? "productImg_rect"
        : "productImg";
    return imageClass;
  };

  const getImageSeperator = (currSolrColl) => {
    let imgSeperator = ",";
    switch (currSolrColl) {
      case COLLECTION_KAMAN_SOLR:
        imgSeperator = "| "; //'| '
        break;
      default:
        imgSeperator = "| ";
        break;
    }
    return imgSeperator;
  };
  // const getImgSrcFromImageUrls = (product) => {

  //     console.log(product);
  //     if(product === undefined || product === null ){
  //         return images['imgnotavailable.jpg'];
  //     }
  //     let imgsrc =  product && product != undefined
  //                 ? product.split(getImageSeperator() )[0]
  //                 : images['imgnotavailable.jpg']
  //     return imgsrc
  // };
  const images = [];
  const getImgSrcFromImageUrls = (product) => {
    if (product === undefined || product === null) {
      return images["imgnotavailable.jpg"];
    }

    if (typeof product == "object") {
      let imgsrc =
        product.ImageUrls && product.ImageUrls != undefined
          ? product.ImageUrls.split(getImageSeperator())[0]
          : images["imgnotavailable.jpg"];
      return imgsrc;
    } else {
      let imgsrc =
        product && product != undefined
          ? product.split(getImageSeperator())[0]
          : images["imgnotavailable.jpg"];
      return imgsrc;
    }
  };

  const getSmallImgSrcFromImageUrls = (productitem) => {
    let imgsrc =
      productitem != undefined
        ? productitem.split(getImageSeperator())[0]
        : images["imgnotavailable.jpg"];
    //console.log("----------------------------------------------")
    //console.log(imgsrc)
    //console.log("----------------------------------------------")
    return imgsrc;
  };

  const getCollConfigByKey = (configKey) => {
    let cachedcolldata = loadColldata();
    let currSolrColl = API.getSolrCollection();
    let collObj = cachedcolldata[currSolrColl];
    if (collObj === undefined) {
      return "normal";
    }
    let collConfigKey = collObj[configKey];
    return collConfigKey;
  };
  return {
    CONFIG_IMAGE_CLASS,

    COLLECTION_DOC_SOLR,
    COLLECTION_WINE_SOLR,
    COLLECTION_KAMAN_SOLR,
    COLLECTION_NEWCOMM_SOLR,
    COLLECTION_PRIDE_SOLR,
    COLLECTION_BBB_SOLR,
    COLLECTION_KDG_SOLR,
    getTenantConfig,
    getImgSrcFromImageUrls,
    getCollConfigByKey,
    getSmallImgSrcFromImageUrls,
  };
})();

export default collconfig;
