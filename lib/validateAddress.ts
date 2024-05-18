import { ethers } from "ethers";

export const isValidEvmAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};
