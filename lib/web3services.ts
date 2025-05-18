import { BrowserProvider, Contract } from 'ethers';

// Simple ABI for a basic storage contract
const storageABI = [
  "function store(string memory data) public",
  "function retrieve() public view returns (string memory)"
];

// This is a placeholder. In a real app, you would deploy your own contract
// and use its address here
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask or another Ethereum wallet");
    }
    
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, signer, address };
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
};

export const storeDataOnWeb3 = async (data: string) => {
  try {
    const { signer } = await connectWallet();
    
    // Ensure signer is resolved before creating the contract
    const contract = new Contract(CONTRACT_ADDRESS, storageABI, signer);
    
    // Store the data on the blockchain
    const tx = await contract.store(data);
    
    // Wait for the transaction to be mined
    await tx.wait();
    
    return tx.hash;
  } catch (error) {
    console.error("Failed to store data on Web3:", error);
    throw error;
  }
};

export const retrieveDataFromWeb3 = async () => {
  try {
    const { provider } = await connectWallet();
    
    const contract = new Contract(
      CONTRACT_ADDRESS,
      storageABI,
      provider
    );
    
    // Retrieve the data from the blockchain
    const data = await contract.retrieve();
    
    return data;
  } catch (error) {
    console.error("Failed to retrieve data from Web3:", error);
    throw error;
  }
};

// Add this to global window type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (_args: { method: string; params?: any[] }) => Promise<any>;
      on: (_event: string, _callback: (..._args: any[]) => void) => void;
      removeListener: (_event: string, _callback: (..._args: any[]) => void) => void;
      selectedAddress: string | null;
    };
  }
}