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

// Using the global Ethereum window object interface from types/ethereum.d.ts

export default function LoginPage() {
  const router = useRouter();
  const [demoMode, setDemoMode] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [animationState, setAnimationState] = useState(0);

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined" &&
      window.ethereum.isMetaMask
    );
  };

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      // Check if running in browser
      if (typeof window === "undefined") {
        throw new Error("Browser environment not available");
      }

      // Check if MetaMask is installed
      if (!isMetaMaskInstalled()) {
        throw new Error(
          "MetaMask is not installed. Please install MetaMask to continue."
        );
      }

      // Get current chain ID
      const chainId = await window.ethereum?.request({ method: "eth_chainId" });
      setChainId(chainId);

      // Request account access
      const accounts = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error(
          "No accounts found. Please create an account in MetaMask and try again."
        );
      }

      // Successfully connected
      const account = accounts[0];
      console.log("Connected to MetaMask with account:", account);

      // Set wallet address in state
      setWalletAddress(account);

      // Store connection in localStorage for persistence
      localStorage.setItem("walletConnected", "true");
      localStorage.setItem("walletAddress", account);

      // You can add authentication with your backend here
      // For example: await authenticateWithWallet(account);

      // Optional: Redirect to dashboard or another page
      // router.push('/dashboard');

      return account;
    } catch (err: any) {
      console.error("Error connecting to MetaMask:", err);

      // Handle specific errors
      if (err.code === 4001) {
        // User rejected the request
        setError("You rejected the connection request. Please try again.");
      } else if (err.code === -32002) {
        // Request already pending
        setError(
          "A connection request is already pending. Please check your MetaMask extension."
        );
      } else {
        // Generic error
        setError(err.message || "Failed to connect to MetaMask");
      }

      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
  };

  // Check for existing connection on component mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          // Get current chain ID
          const chainId =
            (await window.ethereum?.request({ method: "eth_chainId" })) || null;
          setChainId(chainId);

          // Check if we have a stored connection
          const isConnected =
            localStorage.getItem("walletConnected") === "true";

          if (isConnected) {
            const accounts = await window.ethereum?.request({
              method: "eth_accounts",
            });

            if (accounts && accounts.length > 0) {
              setWalletAddress(accounts[0]);
              console.log("Reconnected to wallet:", accounts[0]);
            } else {
              // Clear stored connection if no accounts available
              localStorage.removeItem("walletConnected");
              localStorage.removeItem("walletAddress");
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
          localStorage.removeItem("walletConnected");
          localStorage.removeItem("walletAddress");
          console.log("Wallet disconnected");
        } else if (accounts[0] !== walletAddress) {
          // User switched accounts
          setWalletAddress(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
          console.log("Account changed to:", accounts[0]);
        }
      };

      // Handle chain changes
      const handleChainChanged = (chainId: string) => {
        console.log("Network changed to:", chainId);
        setChainId(chainId);
        // Reload the page to avoid any state inconsistencies
        window.location.reload();
      };

      window.ethereum?.on("accountsChanged", handleAccountsChanged);
      window.ethereum?.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum?.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [walletAddress]);

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Get network name from chain ID
  const getNetworkName = (chainId: string | null) => {
    if (!chainId) return "Unknown Network";

    const networks: Record<string, string> = {
      "0x1": "Ethereum Mainnet",
      "0x3": "Ropsten Testnet",
      "0x4": "Rinkeby Testnet",
      "0x5": "Goerli Testnet",
      "0x2a": "Kovan Testnet",
      "0x89": "Polygon Mainnet",
      "0x13881": "Mumbai Testnet",
      "0xa86a": "Avalanche Mainnet",
      "0xa869": "Avalanche Testnet",
      "0x38": "Binance Smart Chain",
      "0x61": "BSC Testnet",
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
        <div className="mb-6 rounded-lg bg-gray-800 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl">
          <div className="mb-6 flex flex-col items-center justify-center"><div
              className={`mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ${animationState === 1 ? "scale-110" : ""}`}
            >
              <svg
                className="size-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002-2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="mb-1 text-2xl font-bold text-white">
              Web3 Authentication
            </h2>
            <p className="text-center text-gray-400">
              {walletAddress
                ? `Connected with ${formatAddress(walletAddress)}`
                : "Connect your wallet to access Eternum Mind"}
            </p>
            {chainId && walletAddress && (
              <p className="mt-1 text-center text-sm text-purple-400">
                {getNetworkName(chainId)}
              </p>
            )}
          </div>

          {walletAddress ? (<div className="space-y-6"><div className="rounded-md bg-gray-700 p-4 transition-all duration-300 hover:bg-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Connected Wallet</p>
                    <p className="text-lg font-medium text-white">
                      {formatAddress(walletAddress)}
                    </p>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white transition-colors duration-300 hover:bg-gray-500"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              <button type="button" onClick={() => router.push("/dashboard")}
                className="relative w-full overflow-hidden rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                style={{
                  transform: isPressed ? "scale(0.98)" : "scale(1)",
                }}
              >
                <div className="flex items-center justify-center">
                  <span>Enter Eternum Mind</span>
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
            <div className="space-y-6">
              <div className={`flex flex-col items-center justify-center rounded-lg bg-gray-700/50 p-6 transition-all duration-500 ${animationState === 2 ? "scale-105" : ""}`}>
                <div className="mb-4 text-center">
                  <p className="mb-2 text-lg font-medium text-white">
                    Connect with MetaMask
                  </p>
                  <p className="text-sm text-gray-400">
                    Secure, decentralized access to Eternum Mind
                  </p>
                </div>

                <div className="mb-4 flex justify-center"><div className={`size-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 transition-all duration-500 ${animationState === 3 ? "rotate-12" : ""}`}
                  >
                    <svg
                      viewBox="0 0 122.88 107.39"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-12"
                    >
                      <path
                        d="M110.36,0.64l-36,26.91L83.27,12.43Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                      <path
                        d="M12.52,0.64l35.7,27.2L39.61,12.43Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                      <path
                        d="M94.92,77.94L83.27,95.89l28.34,7.8,8.06-27.52Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                      <path
                        d="M3.29,76.17l8,27.52,28.26-7.8L28,77.94Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                      <path
                        d="M36.6,48.8,25.74,59.2,53.64,60.3l-1-29.27Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                      <path
                        d="M86.28,48.8l-16.32-17,-.73,29.47,28-1.1Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                      <path
                        d="M39.61,95.89,52.53,88.8l-11.1-8.65Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                      <path
                        d="M70.35,88.8,83.27,95.89,81.45,80.15Z"
                        fill="white"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button type="button" onClick={connectWallet}
                className="group relative w-full overflow-hidden rounded-md bg-gradient-to-r from-orange-500 to-amber-500 p-4 font-medium text-white transition-all duration-300 ease-in-out hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                disabled={isConnecting}
              >
                <div className="absolute inset-0 origin-left scale-x-0 bg-white/10 transition-transform duration-500 group-hover:scale-x-100"></div>
                <div className="relative flex items-center justify-center"><svg
                    width="24"
                    height="24"
                    viewBox="0 0 122.88 107.39"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3"
                  >
                    <path
                      d="M110.36,0.64l-36,26.91L83.27,12.43Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M12.52,0.64l35.7,27.2L39.61,12.43Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M94.92,77.94L83.27,95.89l28.34,7.8,8.06-27.52Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M3.29,76.17l8,27.52,28.26-7.8L28,77.94Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M36.6,48.8,25.74,59.2,53.64,60.3l-1-29.27Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M86.28,48.8l-16.32-17,-.73,29.47,28-1.1Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                  </svg>
                  <span className="text-lg">
                    {isConnecting ? "Connecting..." : "Connect with MetaMask"}
                  </span>
                </div>
              </button>
              {!isMetaMaskInstalled() && (<div className="mt-4 text-center"><a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 transition-colors duration-300 hover:text-orange-300"
                  >
                    Don't have MetaMask? Install it now →
                  </a>
                </div>
              )}
            </div>
          )}
          {error && (<div className="mt-4 animate-pulse rounded-md bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
        <div className="text-center"><p className="text-gray-400">By connecting, you agree to our{" "}
            <a
              href="#"
              className="font-medium text-purple-400 transition-colors duration-300 hover:text-purple-300"
            >
              Terms of Service
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

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
