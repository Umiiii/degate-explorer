import getDateString from "./getDateString";

const getTimeFromNow = (timestamp) => {
  return new Date(timestamp*1000).toLocaleString();
  
};

export default getTimeFromNow;
