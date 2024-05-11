const getTokenAmount = (balance, decimals) => {
  var result = balance / Math.pow(10, decimals);
  if (Number.isNaN(result)) {
    return 0;
  }
  return result;
};

export default getTokenAmount;
