/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Animated logo component with ripple effect
const AnimatedLogo = ({ size = "16" }: { size?: string }) => {
  return (
    <div
      className={`w- relative flex items-center justify-center${size} h-${size}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-8 rounded-full bg-purple-600 opacity-70"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-ripple size-8 rounded-full border-2 border-purple-500"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-ripple-delay size-8 rounded-full border-2 border-purple-400"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-ripple-delay-2 size-8 rounded-full border-2 border-purple-300"></div>
      </div>
      <div className="relative size-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg">
        <div className="absolute inset-0 rounded-full bg-black opacity-20"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black opacity-30"></div>
      </div>
    </div>
  );
};

// Input field component
interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ 
  icon, 
  type, 
  placeholder, 
  id, 
  value, 
  onChange 
}: InputFieldProps) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        className="w-full rounded-md border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 
                  text-gray-200 transition-all duration-300 placeholder:text-gray-500
                  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

// Define interface for Ethereum window object
declare global {
  interface Window {

      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
      chainId?: string;
    }
  }
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, callback: (...args: any[]) => void) => void;
    removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    chainId?: string;
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [demoMode, setDemoMode] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chainId, setChainId] = useState<string | null>(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && 
           typeof window.ethereum !== 'undefined' && 
           window.ethereum.isMetaMask;
  };

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    setError(null);
    setIsConnecting(true);
    
    try {
      // Check if running in browser
      if (typeof window === 'undefined') {
        throw new Error('Browser environment not available');
      }
      
      // Check if MetaMask is installed
      if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }
      
      // Get current chain ID
      const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
      setChainId(chainId);
      
      // Request account access
      const accounts = await window.ethereum?.request({
        method: 'eth_requestAccounts' 
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in MetaMask and try again.');
      }
      
      // Successfully connected
      const account = accounts[0];
      console.log('Connected to MetaMask with account:', account);
      
      // Set wallet address in state
      setWalletAddress(account);
      
      // Store connection in localStorage for persistence
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', account);
      
      // You can add authentication with your backend here
      // For example: await authenticateWithWallet(account);
      
      // Optional: Redirect to dashboard or another page
      // router.push('/dashboard');
      
      return account;
    } catch (err: any) {
      console.error('Error connecting to MetaMask:', err);
      
      // Handle specific errors
      if (err.code === 4001) {
        // User rejected the request
        setError('You rejected the connection request. Please try again.');
      } else if (err.code === -32002) {
        // Request already pending
        setError('A connection request is already pending. Please check your MetaMask extension.');
      } else {
        // Generic error
        setError(err.message || 'Failed to connect to MetaMask');
      }
      
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
  };

  // Check for existing connection on component mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          // Get current chain ID
          const chainId = await window.ethereum?.request({ method: 'eth_chainId' }) || null;
          setChainId(chainId);
          
          // Check if we have a stored connection
          const isConnected = localStorage.getItem('walletConnected') === 'true';
          
          if (isConnected) {
            const accounts = await window.ethereum?.request({
              method: 'eth_accounts'
            });
            
            if (accounts && accounts.length > 0) {
              setWalletAddress(accounts[0]);
              console.log("Reconnected to wallet:", accounts[0]);
            } else {
              // Clear stored connection if no accounts available
              localStorage.removeItem('walletConnected');
              localStorage.removeItem('walletAddress');
            }
          }
        } catch (error) {
          console.error("Error checking existing connection:", error);
        }
      }
    };
    
    checkExistingConnection();
  }, []);

  // Listen for account and chain changes
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      // Handle account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setWalletAddress(null);
          localStorage.removeItem('walletConnected');
          localStorage.removeItem('walletAddress');
          console.log('Wallet disconnected');
        } else if (accounts[0] !== walletAddress) {
          // User switched accounts
          setWalletAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
          console.log('Account changed to:', accounts[0]);
        }
      };

      // Handle chain changes
      const handleChainChanged = (chainId: string) => {
        console.log('Network changed to:', chainId);
        setChainId(chainId);
        // Reload the page to avoid any state inconsistencies
        window.location.reload();
      };

      window.ethereum?.on("accountsChanged", handleAccountsChanged);
      window.ethereum?.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum?.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [walletAddress]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress) {
      // If not connected to wallet, try to connect
      const account = await connectWallet();
      if (account) {
        console.log("Successfully connected with wallet:", account);
      }
    } else {
      // Already connected, proceed with form submission
      console.log("Form submitted with wallet:", walletAddress);
      console.log("Email:", email);
      console.log("Password:", password);
      
      // Here you would typically authenticate with your backend
      // For example:
      // const success = await loginWithCredentials(email, password, walletAddress);
      // if (success) router.push('/dashboard');
    }
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Get network name from chain ID
  const getNetworkName = (chainId: string | null) => {
    if (!chainId) return 'Unknown Network';
    
    const networks: Record<string, string> = {
      '0x1': 'Ethereum Mainnet',
      '0x3': 'Ropsten Testnet',
      '0x4': 'Rinkeby Testnet',
      '0x5': 'Goerli Testnet',
      '0x2a': 'Kovan Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Mumbai Testnet',
      '0xa86a': 'Avalanche Mainnet',
      '0xa869': 'Avalanche Testnet',
      '0x38': 'Binance Smart Chain',
      '0x61': 'BSC Testnet'
    };
    
    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center space-x-4">
            <AnimatedLogo />
            <h1 className="text-3xl font-bold text-white">Eternum Mind</h1>
          </div>
          <p className="mt-2 text-center text-gray-400">
            Unlock the full potential of your mental well-being journey
          </p>
        </div>
        <div className="mb-6 rounded-lg bg-gray-800 p-8 shadow-xl">
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-purple-600">
              <svg
                className="size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h2 className="mb-1 text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-center text-gray-400">
              {walletAddress
                ? `Connected with ${formatAddress(walletAddress)}`
                : "Enter your credentials or connect with MetaMask"}
            </p>
            {chainId && walletAddress && (
              <p className="mt-1 text-center text-sm text-purple-400">
                {getNetworkName(chainId)}
              </p>
            )}
            <div className="mt-2 flex items-center">
              <span className="mr-2 text-sm text-gray-400">Demo Mode</span>
              <button
                className={`flex h-6 w-10 items-center rounded-full p-1 
                          ${demoMode ? "bg-purple-600" : "bg-gray-700"} transition-colors duration-300 ease-in-out`}
                onClick={() => setDemoMode(!demoMode)}
              >
                <div
                  className={`size-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
                    demoMode ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
          {walletAddress ? (
            <div className="space-y-6">
              <div className="rounded-md bg-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Connected Wallet</p>
                    <p className="text-lg font-medium text-white">
                      {formatAddress(walletAddress)}
                    </p>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-500"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="relative w-full overflow-hidden rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                style={{
                  transform: isPressed ? "scale(0.98)" : "scale(1)",
                }}
              >
                <div className="flex items-center justify-center">
                  <span>Continue with MetaMask</span>
                  <svg
                    className="ml-2 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          ) : (
            <>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-400"
                  >
                    Email
                  </label>
                  <InputField
                    icon={
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    }
                    type="email"
                    placeholder="you@example.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-400"
                  >
                    Password
                  </label>
                  <InputField
                    icon={
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    type="password"
                    placeholder="••••••••"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  onMouseLeave={() => setIsPressed(false)}
                  style={{
                    transform: isPressed ? "scale(0.98)" : "scale(1)",
                  }}
                  disabled={isConnecting}
                >
                  <div className="flex items-center justify-center">
                    <span>{isConnecting ? "Connecting..." : "Sign In"}</span>
                    <svg
                      className="ml-2 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              </form>
              <div className="mt-6 flex items-center">
                <div className="grow border-t border-gray-700"></div>
                <span className="mx-4 text-sm text-gray-500">OR</span>
                <div className="grow border-t border-gray-700"></div>
              </div>
              <button
                type="button"
                onClick={connectWallet}
                className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                disabled={isConnecting}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 122.88 107.39"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M110.36,0.64l-36,26.91L83.27,12.43Z"
                    fill="#e17726"
                    stroke="#e17726"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M12.52,0.64l35.7,27.2L39.61,12.43Z"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M94.92,77.94L83.27,95.89l28.34,7.8,8.06-27.52Z"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M3.29,76.17l8,27.52,28.26-7.8L28,77.94Z"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M36.6,48.8,25.74,59.2,53.64,60.3l-1-29.27Z"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M86.28,48.8l-16.32-17,-.73,29.47,28-1.1Z"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M39.61,95.89,52.53,88.8l-11.1-8.65Z"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M70.35,88.8,83.27,95.89,81.45,80.15Z"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                </svg>
                <span>
                  {isConnecting ? "Connecting..." : "Connect with MetaMask"}
                </span>
              </button>
            </>
          )}
          {error && (
            <div className="mt-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-purple-400 transition-colors duration-300 hover:text-purple-300"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ripple {
          animation: ripple 2s ease-out infinite;
        }

        .animate-ripple-delay {
          animation: ripple 2s ease-out 0.3s infinite;
        }

        .animate-ripple-delay-2 {
          animation: ripple 2s ease-out 0.6s infinite;
        }
      `}</style>
    </div>
  );
}