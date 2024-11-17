const getTrimmedTxHash = (
  hash: string,
  length = 7,
  isDivided = false
): string => {
  if (hash.toLowerCase() === '0x1ab76ff327fde5409bb29428283220e7e811a3bd') {
    return 'Degate'
  }
  const firstPartEnd = length / 2;
  if (isDivided)
    return `${hash.substr(0, firstPartEnd)}...${hash.substr(-firstPartEnd)}`;
  else return `${hash.substr(0, length)}...`;
};

export default getTrimmedTxHash;
