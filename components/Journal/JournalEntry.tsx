import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Save,
  Sparkles,
  Info,
  Lock,
  Upload,
  Heart,
  Clock,
  Smile,
  Frown,
  ThumbsDown,
  Zap,
  Moon,
  Sun,
  RefreshCcw,
  HelpCircle,
  Tag,
  Plus,
  ImageIcon,
  X,
  PenLine,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
// @ts-ignore
import CryptoJS from 'crypto-js';
// @ts-ignore - Ignoring missing type declarations for crypto-js
import { storeDataOnWeb3, retrieveDataFromWeb3 } from "../../lib/web3services";

const JournalEntry: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [showEncryptionKey, setShowEncryptionKey] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isWeb3Connected, setIsWeb3Connected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load saved entry from localStorage if it exists
  useEffect(() => {
    const savedEntry = localStorage.getItem("journalEntry");
    if (savedEntry) {
      try {
        const parsedEntry = JSON.parse(savedEntry);
        
        // Check if the entry is encrypted
        if (parsedEntry.isEncrypted) {
          setIsEncrypted(true);
          // Don't auto-decrypt, wait for user to enter key
        } else {
          // Load unencrypted entry
          setTitle(parsedEntry.title || "");
          setContent(parsedEntry.content || "");
          setSelectedMood(parsedEntry.mood || null);
          setTags(parsedEntry.tags || []);
          setImages(parsedEntry.images || []);
          setWordCount(
            parsedEntry.content ? parsedEntry.content.trim().split(/\s+/).length : 0
          );
        }
      } catch (error) {
        console.error("Error parsing saved entry:", error);
      }
    }
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(
      newContent.trim() === "" ? 0 : newContent.trim().split(/\s+/).length
    );
    setShowPlaceholder(newContent.trim() === "");
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => {
        return URL.createObjectURL(file);
      });
      setImages([...images, ...newImages]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // Encrypt data with the provided key
  const encryptData = (data: string, key: string): string => {
    if (!key) return data; // Don't encrypt if no key
    return CryptoJS.AES.encrypt(data, key).toString();
  };

  // Decrypt data with the provided key
  const decryptData = (encryptedData: string, key: string): string => {
    if (!key) return encryptedData; // Don't decrypt if no key
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption failed:", error);
      return ""; // Return empty string if decryption fails
    }
  };

  // Connect to Web3 wallet
  const connectToWeb3 = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsWeb3Connected(true);
        setSaveMessage("Wallet connected successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        setSaveMessage("Failed to connect wallet. Please try again.");
        setTimeout(() => setSaveMessage(""), 3000);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSaveMessage("Please install MetaMask or another Ethereum wallet");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  // Attempt to decrypt the saved entry with the provided key
  const decryptEntry = () => {
    if (!encryptionKey) {
      setSaveMessage("Please enter an encryption key");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    try {
      const savedEntry = localStorage.getItem("journalEntry");
      if (savedEntry) {
        const parsedEntry = JSON.parse(savedEntry);
        
        if (parsedEntry.isEncrypted) {
          // Decrypt the content
          const decryptedTitle = decryptData(parsedEntry.title || "", encryptionKey);
          const decryptedContent = decryptData(parsedEntry.content || "", encryptionKey);
          
          // If decryption was successful (content is not empty)
          if (decryptedContent) {
            setTitle(decryptedTitle);
            setContent(decryptedContent);
            setSelectedMood(parsedEntry.mood || null);
            setTags(parsedEntry.tags || []);
            setImages(parsedEntry.images || []);
            setWordCount(
              decryptedContent.trim() === "" ? 0 : decryptedContent.trim().split(/\s+/).length
            );
            setIsEncrypted(false);
            setSaveMessage("Journal entry decrypted successfully!");
          } else {
            setSaveMessage("Incorrect encryption key");
          }
        }
      }
    } catch (error) {
      console.error("Error decrypting entry:", error);
      setSaveMessage("Decryption failed. Incorrect key?");
    }
    
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Save encrypted data to Web3
  const saveEntry = async () => {
    const now = new Date();
    
    // Determine if we should encrypt this save
    const shouldEncrypt = encryptionKey.length > 0;

    if (shouldEncrypt && !isWeb3Connected) {
      setSaveMessage("Please connect your wallet first to save encrypted data to Web3");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }
    
    const entry = {
      title: shouldEncrypt ? encryptData(title, encryptionKey) : title,
      content: shouldEncrypt ? encryptData(content, encryptionKey) : content,
      mood: selectedMood,
      tags,
      images,
      date: now.toISOString(),
      wordCount,
      isEncrypted: shouldEncrypt,
      walletAddress: walletAddress || null
    };

    try {
      setIsLoading(true);
      
      // Always store a copy in localStorage for convenience
      localStorage.setItem("journalEntry", JSON.stringify(entry));
      
      // If connected to Web3 and the entry is encrypted, also store it on Web3
      if (isWeb3Connected && shouldEncrypt) {
        // Convert the entry to a string for storage on Web3
        const entryString = JSON.stringify(entry);
        
        // Store the encrypted entry on Web3
        const txHash = await storeDataOnWeb3(entryString);
        
        setSaveMessage(`Journal entry encrypted and saved to Web3! Transaction: ${txHash.substring(0, 10)}...`);
        setIsEncrypted(true);
      } else if (shouldEncrypt) {
        setSaveMessage("Journal entry encrypted and saved locally!");
        setIsEncrypted(true);
      } else {
        setSaveMessage("Journal entry saved successfully to localStorage!");
      }
      
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastSaved(timeString);
    } catch (error) {
      console.error("Error saving entry:", error);
      setSaveMessage("Failed to save entry. Please try again.");
    } finally {
      setIsLoading(false);
      
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 5000);
    }
  };

  // Fetch data from Web3
  const retrieveFromWeb3 = async () => {
    if (!isWeb3Connected) {
      setSaveMessage("Please connect your wallet first");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }
    
    if (!encryptionKey) {
      setSaveMessage("Please enter your encryption key to decrypt data");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }
    
    try {
      setIsLoading(true);
      setSaveMessage("Retrieving your data from Web3...");
      
      const data = await retrieveDataFromWeb3();
      
      if (data) {
        const parsedEntry = JSON.parse(data);
        
        // Decrypt the data
        const decryptedTitle = decryptData(parsedEntry.title || "", encryptionKey);
        const decryptedContent = decryptData(parsedEntry.content || "", encryptionKey);
        
        if (decryptedContent) {
          setTitle(decryptedTitle);
          setContent(decryptedContent);
          setSelectedMood(parsedEntry.mood || null);
          setTags(parsedEntry.tags || []);
          setImages(parsedEntry.images || []);
          setWordCount(
            decryptedContent.trim() === "" ? 0 : decryptedContent.trim().split(/\s+/).length
          );
          setSaveMessage("Journal entry retrieved and decrypted from Web3!");
        } else {
          setSaveMessage("Failed to decrypt data. Incorrect key?");
        }
      } else {
        setSaveMessage("No data found on Web3 for your account");
      }
    } catch (error) {
      console.error("Error retrieving from Web3:", error);
      setSaveMessage("Failed to retrieve from Web3. Check console for details.");
    } finally {
      setIsLoading(false);
      
      setTimeout(() => {
        setSaveMessage("");
      }, 5000);
    }
  };

  const moods = [
    { id: "happy", label: "Happy", icon: <Smile className="size-5" /> },
    { id: "calm", label: "Calm", icon: <Moon className="size-5" /> },
    {
      id: "reflective",
      label: "Reflective",
      icon: <RefreshCcw className="size-5" />,
    },
    { id: "energetic", label: "Energetic", icon: <Zap className="size-5" /> },
    { id: "anxious", label: "Anxious", icon: <Frown className="size-5" /> },
    { id: "sad", label: "Sad", icon: <ThumbsDown className="size-5" /> },
    { id: "excited", label: "Excited", icon: <Sparkles className="size-5" /> },
    { id: "tired", label: "Tired", icon: <Moon className="size-5" /> },
    { id: "grateful", label: "Grateful", icon: <Heart className="size-5" /> },
    { id: "neutral", label: "Neutral", icon: <Sun className="size-5" /> },
  ];

  return (
    <div className="flex bg-[#0c1222] text-white">
      {/* Left side - Journal Entry */}
      <div className="relative flex-1 p-6">
        {/* Futuristic elements */}
        <div className="absolute left-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute right-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 h-px w-1/3 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50"></div>
            <h1 className="text-2xl font-bold tracking-wide">Journal Entry</h1>
            {isEncrypted && (
              <div className="ml-2 flex items-center gap-1 rounded-full bg-green-600/20 px-3 py-1 text-xs text-green-400">
                <Lock size={12} />
                <span>Encrypted</span>
              </div>
            )}
            {isWeb3Connected && (
              <div className="ml-2 flex items-center gap-1 rounded-full bg-indigo-600/20 px-3 py-1 text-xs text-indigo-400">
                <span>Web3 Connected</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 rounded-full bg-[#1e293b]/50 px-3 py-1">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{formattedDate}</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-sm">{wordCount} words</span>
            </div>
          </div>
        </div>
        <div className="mb-6 flex gap-3">
          <button
            onClick={saveEntry}
            disabled={isLoading}
            className={`group relative flex items-center gap-2 overflow-hidden rounded-full ${
              isLoading ? "bg-[#1e293b]/50 text-gray-500" : "bg-[#1e293b] text-gray-300 hover:shadow-md"
            } px-5 py-2 text-sm transition-all`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <Save size={16} className="relative z-10" />
            <span className="relative z-10">{isLoading ? "Saving..." : "Save"}</span>
          </button>
          <button
            onClick={connectToWeb3}
            disabled={isLoading || isWeb3Connected}
            className={`group relative flex items-center gap-2 overflow-hidden rounded-full ${
              isWeb3Connected
                ? "bg-indigo-600/30 text-indigo-300"
                : isLoading
                ? "bg-[#1e293b]/50 text-gray-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md hover:shadow-indigo-500/20"
            } px-5 py-2 text-sm transition-all`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <Key size={16} className="relative z-10" />
            <span className="relative z-10">
              {isWeb3Connected
                ? "Wallet Connected"
                : isLoading
                ? "Connecting..."
                : "Connect Web3 Wallet"}
            </span>
          </button>
          {isWeb3Connected && (
            <button
              onClick={retrieveFromWeb3}
              disabled={isLoading}
              className={`group relative flex items-center gap-2 overflow-hidden rounded-full ${
                isLoading
                  ? "bg-[#1e293b]/50 text-gray-500"
                  : "bg-[#1e293b] text-gray-300 hover:shadow-md"
              } px-5 py-2 text-sm transition-all`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
              <RefreshCcw size={16} className="relative z-10" />
              <span className="relative z-10">{isLoading ? "Loading..." : "Retrieve from Web3"}</span>
            </button>
          )}
          {saveMessage && (
            <div className="flex items-center rounded-full bg-green-600/20 px-5 py-2 text-sm text-green-400">
              {saveMessage}
            </div>
          )}
          {lastSaved && !saveMessage && (
            <div className="flex items-center rounded-full bg-[#1e293b]/30 px-5 py-2 text-sm text-gray-400">
              Last saved at {lastSaved}
            </div>
          )}
        </div>
        
        {/* Encryption Key Input */}
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <div className="absolute -left-2 top-1/2 h-px w-2 -translate-y-1/2 bg-indigo-500/50"></div>
            <div className="flex rounded-md border border-[#1e293b] bg-[#0c1222] focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/30">
              <div className="flex items-center pl-3 text-indigo-400">
                <Key size={16} />
              </div>
              <input
                type={showEncryptionKey ? "text" : "password"}
                value={encryptionKey}
                onChange={(e) => setEncryptionKey(e.target.value)}
                placeholder="Enter encryption key"
                className="w-full border-0 bg-transparent p-3 text-sm transition-all placeholder:text-gray-500 focus:outline-none"
              />
              <button
                onClick={() => setShowEncryptionKey(!showEncryptionKey)}
                className="px-3 text-gray-400 hover:text-gray-300"
              >
                {showEncryptionKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="absolute -right-2 top-1/2 h-px w-2 -translate-y-1/2 bg-indigo-500/50"></div>
          </div>
          {isEncrypted && (
            <button
              onClick={decryptEntry}
              className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-700"
            >
              <Lock size={16} />
              Decrypt
            </button>
          )}
        </div>
        
        {/* Web3 Wallet Info */}
        {isWeb3Connected && (
          <div className="mb-4 rounded-md border border-indigo-500/20 bg-indigo-500/5 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50"></div>
                <span className="text-sm text-indigo-300">Connected wallet:</span>
              </div>
              <div className="text-sm text-indigo-300">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </div>
            </div>
          </div>
        )}
        
        <div className="relative mb-4">
          <div className="absolute -left-2 top-1/2 h-px w-2 -translate-y-1/2 bg-yellow-500/50"></div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your journal entry"
            className="w-full rounded-md border border-[#1e293b] bg-[#0c1222] p-4 text-lg transition-all placeholder:text-gray-500 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/30"
          />
          <div className="absolute -right-2 top-1/2 h-px w-2 -translate-y-1/2 bg-yellow-500/50"></div>
        </div>
        <div className="mb-2 flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          <span className="text-sm">{formattedDate}</span>
        </div>
        <div className="relative min-h-[300px] w-full overflow-hidden rounded-md border border-[#1e293b] bg-[#0c1222] transition-all focus-within:border-yellow-500/50 focus-within:ring-1 focus-within:ring-yellow-500/30">
          {/* Futuristic corner accents */}
          <div className="absolute left-0 top-0 h-4 w-px bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
          <div className="absolute left-0 top-0 h-px w-4 bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-4 w-px bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-px w-4 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
          <div className="absolute bottom-0 left-0 h-4 w-px bg-gradient-to-t from-yellow-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-px w-4 bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-4 w-px bg-gradient-to-t from-yellow-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-4 w-4 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder=""
            className="min-h-[300px] w-full bg-transparent p-4 text-lg focus:outline-none"
          />
          {showPlaceholder && (
            <div className="pointer-events-none absolute left-0 top-0 flex size-full flex-col items-center justify-center p-4 text-gray-500">
              <PenLine size={40} className="mb-4 opacity-20" />
              <p className="text-center">Start writing your thoughts...</p>
              {isWeb3Connected && (
                <p className="mt-2 text-sm text-indigo-400">Your entry will be encrypted and stored on Web3</p>
              )}
            </div>
          )}
          
          {/* Images section */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              multiple
            />
            <button
              onClick={triggerFileInput}
              className="flex items-center gap-1 rounded-md bg-[#1e293b] px-3 py-1.5 text-xs text-gray-300 hover:bg-[#283548]"
            >
              <ImageIcon size={14} />
              Add Images
            </button>
          </div>
          {images.length > 0 && (
            <div className="absolute bottom-12 right-4 mt-4 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative size-20 overflow-hidden rounded-md border border-[#1e293b]"
                >
                  <img
                    src={image}
                    alt="Journal image"
                    className="size-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Rest of the component */}
        <div className="mb-8 rounded-lg border border-[#1e293b] bg-[#0f1729] p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="size-1.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/30"></div>
            <h3 className="text-xl font-medium">How are you feeling today?</h3>
            <div className="h-px grow bg-gradient-to-r from-yellow-500/20 to-transparent"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 transition-all ${
                  selectedMood === mood.id
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-sm shadow-yellow-500/20"
                    : "bg-[#1e293b] text-gray-300 hover:bg-[#1e293b]/80 hover:shadow-sm hover:shadow-yellow-500/10"
                }`}
              >
                <span
                  className={`relative z-10 ${selectedMood === mood.id ? "text-white" : "text-gray-300"}`}
                >
                  {mood.icon}
                </span>
                <span className="relative z-10">{mood.label}</span>
                {selectedMood !== mood.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-amber-600/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
            <Tag size={18} />
            Add tags to categorize your entry
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-[#1e293b] px-3 py-1.5 text-sm text-gray-300"
              >
                <span>{tag}</span>
                <button
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  className="ml-2 text-gray-500 hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Add a tag..."
              className="flex-1 rounded-l-md border border-[#1e293b] bg-[#0f1729] px-4 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAddTag}
              className="flex items-center gap-1 rounded-r-md bg-[#1e293b] px-4 py-2 text-sm hover:bg-[#283548]"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">
            <span>{wordCount} words</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (encryptionKey) {
                  if (!isWeb3Connected) {
                    connectToWeb3();
                  } else {
                    saveEntry();
                  }
                } else {
                  setSaveMessage("Please enter an encryption key first");
                  setTimeout(() => setSaveMessage(""), 3000);
                }
              }}
              disabled={isLoading}
              className={`flex items-center gap-2 rounded-md ${
                isLoading ? "bg-[#1e293b]/50 text-gray-500" : "bg-[#1e293b] text-gray-300 hover:bg-[#283548]"
              } px-4 py-2 text-sm`}
            >
              <Lock size={16} />
              {isWeb3Connected ? "Encrypt & Save to Web3" : "Encrypt & Connect Web3"}
            </button>
            <button
              onClick={saveEntry}
              disabled={isLoading}
              className={`flex items-center gap-2 rounded-md ${
                isLoading ? "bg-indigo-700/50 text-indigo-300/50" : "bg-[#4f46e5] hover:bg-[#4338ca]"
              } px-4 py-2 text-sm`}
            >
              <Save size={16} />
              {isLoading ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </div>
      </div>
      {/* Right side - Prompts and Analysis */}
      <div className="w-[350px] border-l border-[#1e293b] bg-[#0c1523] p-6">
        <div className="mb-8 rounded-lg border border-[#1e293b] bg-[#0f1729] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reflection Prompts</h3>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-gray-300">
                <RefreshCcw size={16} />
              </button>
              <button className="text-yellow-400 hover:text-yellow-300">
                <HelpCircle size={16} />
              </button>
            </div>
          </div>
          <div className="mb-4 rounded-md bg-[#1e293b]/50 p-3 text-amber-100">
            <p className="italic">
              "Write about something you're grateful for today."
            </p>
          </div>
          <button className="w-full rounded-md bg-[#4f46e5] py-2 text-center font-medium hover:bg-[#4338ca]">
            Write About This
          </button>
          <div className="mt-4 text-sm text-gray-400">
            <p>
              If your emotions had colors, what's one small thing you could do.
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f1729] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">SoulPrint Analysis</h3>
            <button className="text-indigo-400 hover:text-indigo-300">
              <Info size={16} />
            </button>
          </div>
          <div className="mb-6 rounded-md bg-[#1e293b]/50 p-3 text-gray-300">
            <p className="text-sm">
              This entry will add to your SoulPrint profile, capturing your
              unique thought patterns and values.
            </p>
          </div>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Emotional Depth</span>
              <span className="text-indigo-400">78%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-2 w-[78%] rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Memory Impact</span>
              <span className="text-indigo-400">65%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-2 w-[65%] rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Legacy Value</span>
              <span className="text-indigo-400">82%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-2 w-[82%] rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => {
                if (encryptionKey) {
                  saveEntry();
                } else {
                  setSaveMessage("Please enter an encryption key first");
                  setTimeout(() => setSaveMessage(""), 3000);
                }
              }}
              disabled={isLoading}
              className={`flex items-center gap-2 rounded-md ${
                isLoading ? "bg-[#1e293b]/50 text-gray-500" : "bg-[#1e293b] text-gray-300 hover:bg-[#283548]"
              } px-4 py-2 text-sm`}
            >
              <Lock size={16} />
              Encrypt
            </button>
            <button 
              onClick={() => {
                if (!isWeb3Connected) {
                  connectToWeb3();
                } else if (encryptionKey) {
                  saveEntry();
                } else {
                  setSaveMessage("Please enter an encryption key first");
                  setTimeout(() => setSaveMessage(""), 3000);
                }
              }}
              disabled={isLoading}
              className={`flex items-center gap-2 rounded-md ${
                isLoading ? "bg-indigo-700/50 text-indigo-300/50" : "bg-indigo-600 hover:bg-indigo-700"
              } px-4 py-2 text-sm`}
            >
              <Upload size={16} />
              {isWeb3Connected ? "Save to Web3" : "Connect Web3"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;
