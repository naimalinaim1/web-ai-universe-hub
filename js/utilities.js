// load api data
const loadApiData = async (url) => {
  if (!url) {
    return "ERR: please provide valid url";
  }

  // load data with api
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
