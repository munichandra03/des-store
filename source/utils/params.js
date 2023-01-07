export const getParams = (url, query) => {
  const paramsArr = new URLSearchParams(url).get(query);
  if (paramsArr) return paramsArr.split(",");
  return [];
};
