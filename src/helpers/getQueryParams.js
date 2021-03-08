// getUrlParams
// returns an object of all url params
const getUrlParams = (queryString) => {
  const urlParams = new URLSearchParams(queryString);
  const params = {};

  const entries = urlParams.entries();

  for (const entry of entries) {
    params[entry[0]] = entry[1];
  }

  return params;
};

export default getUrlParams;
