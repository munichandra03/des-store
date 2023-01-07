import React, { createContext } from "react";

import { DefaultStyles } from "@/consts/style.consts";

export const isArray = (item) => Array.isArray(item);
export const isOfObjectType = (item) =>
  item !== null && typeof item === "object";
export const isObject = (item) => isOfObjectType(item) && !isArray(item);
export const isNull = (item) => item === null;
export const isUndefined = (item) => item === void 0;
export const isNullOrUndefined = (item) => item === void 0 || item === null;
export const isBoolean = (item) =>
  item === true || item === false || toString.call(item) === "[object Boolean]";
export const isElement = (item) => !!(item && item.nodeType === 1);
export const random = (min, max) =>
  max == null
    ? ((max = min),
      (min = 0),
      min + Math.floor(Math.random() * (max - min + 1)))
    : min + Math.floor(Math.random() * (max - min + 1));

export const parseClasses = (item) => (isArray(item) ? item.join(" ") : item);
export const parseContent = (item) => (isObject(item) ? item.text : item);
export const getIconSizeClasses = (item = DefaultStyles.icon.size) =>
  `h-${item} w-${item} `;
export const classHelper = (type, item) => {
  let styles = [];
  Object.keys(DefaultStyles[type]).map(
    (a) =>
      (styles = [...styles, ...((item && item[a]) || DefaultStyles[type][a])])
  );
  return styles;
};
export const composeClasses = (type, item) => {
  return isObject(item) ? classHelper(type, item) : item;
};

export function getElState(variable = {}, consts) {
  if (!(consts && consts.length)) return {};
  consts.forEach((a, i) => {
    if (a.indexOf(":") < 0) {
      variable[(variable[a] = i)] = a;
    } else {
      const arr = a.split(":");
      variable[(variable[arr[0]] = arr[1])] = arr[0];
    }
  });
  return variable;
}

export function getNewContext(name) {
  const context = createContext(null);
  if (name) {
    context.displayName = name;
  }
  return context;
}

export function createActionTypes(base, actions = []) {
  return actions.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;

    return acc;
  }, {});
}

export function createAction(type, data = {}) {
  return { type, payload: data };
}

export function isProductBoosted(
  productId,
  p_headerStageValues,
  p_headerStages,
  p_headerbq
) {
  let isBoosted = false;
  let boostIndex = -1;
  let stageName = "";
  let boostedObj = {};
  if (p_headerbq === undefined) {
    boostedObj.isBoosted = false;
    boostedObj.stageName = "";
    return boostedObj;
  }
  let localheaderStageValues =
    p_headerStageValues === undefined ? [] : p_headerStageValues;
  let localheaderStages = p_headerStages === undefined ? [] : p_headerStages;
  if (Array.isArray(localheaderStageValues)) {
    boostIndex = localheaderStageValues.findIndex(function (prodids) {
      //console.log(prodids);
      return prodids.includes(productId);
    });
    if (boostIndex > -1) {
    }
    stageName = boostIndex === -1 ? "" : localheaderStages[boostIndex];
    isBoosted = boostIndex === -1 ? false : true;
  } else {
    boostIndex = localheaderStageValues.includes(productId);
    if (boostIndex > -1) {
    }
    stageName = boostIndex === true ? localheaderStages : "";
    isBoosted = boostIndex;
  }
  boostedObj.isBoosted = isBoosted;
  boostedObj.stageName = stageName;
  return boostedObj;
}
export default isObject;
