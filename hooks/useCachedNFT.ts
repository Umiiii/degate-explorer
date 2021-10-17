import React from "react";
import { ethers } from "ethers";

import { INFURA_ENDPOINT } from "../utils/config";
import LRUCache from "../utils/cache";

interface NFTMetadata {
  [index: string]: unknown;
}

// Two caches need to maintained
// NFT URI cache {key-> token_address:nft_id}
// NFT metadata cache { key -> metadata_url}

const uriCache = new LRUCache();
const metadataCache = new LRUCache();
const provider = new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT);

const getERC721URI = async (nft) => {
  try {
    const contractABIERC721 = [
      `function tokenURI(uint256 tokenId) public view virtual override returns (string memory)`,
    ];
    //TODO: remove default address
    const nftContract = new ethers.Contract(
      "0x4f03b26031198d5b69cdd3b1f6756ed14090c94d",
      contractABIERC721,
      provider
    );
    const uri = await nftContract.tokenURI(nft.id);
    return uri;
  } catch (error) {
    console.error(error);
    return await getERC1155URI(nft);
  }
};

const getERC1155URI = async (nft) => {
  try {
    const contractABIERC1155 = [
      `function uri(uint256 id) public returns (string memory)`,
    ];
    //TODO: remove default address
    const nftContract = new ethers.Contract(
      "0x4f03b26031198d5b69cdd3b1f6756ed14090c94d",
      contractABIERC1155,
      provider
    );
    const uri = await nftContract.uri(nft.id);
    return uri;
  } catch (error) {
    console.error(error);
    return await getERC721URI(nft);
  }
};

const getNFTURI = async (nft) => {
  const cacheKey = `${
    nft.token ?? "0x4f03b26031198d5b69cdd3b1f6756ed14090c94d"
  }:${nft.id}`;
  let cacheResult = uriCache.get(cacheKey);
  if (cacheResult) {
    console.log("uriCache: cache hit");
    return cacheResult;
  } else {
    if (nft.nftType === 1) {
      const uri = await getERC721URI(nft);
      uriCache.set(cacheKey, uri);
      return uri;
    } else {
      const uri = await getERC1155URI(nft);
      uriCache.set(cacheKey, uri);
      return uri;
    }
  }
};

const getNFTMetadata = async (uri, nft) => {
  const cacheKey = `${
    nft.token ?? "0x4f03b26031198d5b69cdd3b1f6756ed14090c94d"
  }:${nft.id}`;
  let cacheResult = metadataCache.get(cacheKey);
  if (cacheResult) {
    console.log("metadataCache: cache hit");
    return cacheResult;
  } else {
    const metadata = await fetch(
      uri.replace("ipfs://", "https://ipfs.io/ipfs/")
    ).then((res) => res.json());
    metadataCache.set(cacheKey, metadata);
    return metadata;
  }
};

const useCachedNFT = (nft) => {
  const [metadata, setMetadata] = React.useState<NFTMetadata>({});
  const isMountedRef = React.useRef<boolean>();

  React.useEffect(() => {
    isMountedRef.current = true;
    if (nft) {
      (async () => {
        const uri = await getNFTURI(nft);
        const metadata = await getNFTMetadata(uri, nft);
        isMountedRef.current &&
          setMetadata({
            ...metadata,
            image: metadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
          });
      })();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [nft]);

  return metadata;
};

export default useCachedNFT;
