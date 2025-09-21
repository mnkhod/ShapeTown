import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { connectWallet } from "../lib/authApiService";
import { useQueryClient } from "@tanstack/react-query";
import {
    getQuests,
    getActiveQuests,
    getCompletedQuests,
    getSystemQuests,
    getAvailableQuests
} from "../lib/query-helper";
import { QUEST_KEYS } from "../hooks/useQuests";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const queryClient = useQueryClient();

    // Prefetch all quest data for instant quest journal loading
    const prefetchQuests = async () => {
        console.log("🚀 Prefetching quest data for instant access...");
        try {
            await Promise.all([
                queryClient.prefetchQuery({
                    queryKey: QUEST_KEYS.lists(),
                    queryFn: getQuests,
                    staleTime: 5 * 60 * 1000,
                }),
                queryClient.prefetchQuery({
                    queryKey: QUEST_KEYS.active(),
                    queryFn: getActiveQuests,
                    staleTime: 2 * 1000,
                }),
                queryClient.prefetchQuery({
                    queryKey: QUEST_KEYS.completed(),
                    queryFn: getCompletedQuests,
                    staleTime: 5 * 60 * 1000,
                }),
                queryClient.prefetchQuery({
                    queryKey: QUEST_KEYS.system(),
                    queryFn: getSystemQuests,
                    staleTime: 5 * 60 * 1000,
                }),
                queryClient.prefetchQuery({
                    queryKey: QUEST_KEYS.available(),
                    queryFn: getAvailableQuests,
                    staleTime: 30 * 1000,
                })
            ]);
            console.log("✅ Quest data prefetched successfully!");
        } catch (error) {
            console.error("⚠️ Failed to prefetch some quest data:", error);
        }
    };

    // Check if wallet is connected on mount
    useEffect(() => {
        checkWalletConnection();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
            window.ethereum.on("chainChanged", handleChainChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener(
                    "accountsChanged",
                    handleAccountsChanged
                );
                window.ethereum.removeListener(
                    "chainChanged",
                    handleChainChanged
                );
            }
        };
    }, []);

    const checkWalletConnection = async () => {
        try {
            const hasWallet = window.ethereum?.selectedAddress;
            const hasToken = localStorage.getItem("accessToken");
            console.log(
                "Checking wallet connection - hasWallet:",
                hasWallet,
                "hasToken:",
                hasToken
            );

            if (hasWallet && hasToken) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                setProvider(provider);
                setSigner(signer);
                setWalletAddress(address);
                setIsAuthenticated(true);
                console.log(
                    "Auto-authenticated with existing wallet and token"
                );

                // Prefetch quest data immediately after authentication
                prefetchQuests();
            } else if (hasWallet && !hasToken) {
                console.log(
                    "Wallet connected but no token - user needs to login"
                );
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                setProvider(provider);
                setSigner(signer);
                setWalletAddress(address);
                // Don't set isAuthenticated to true without token
                console.log("Wallet detected but not authenticated");
            }
        } catch (error) {
            console.error("Failed to check wallet connection:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            logout();
        } else {
            setWalletAddress(accounts[0]);
            checkWalletConnection();
        }
    };

    const handleChainChanged = () => {
        // Instead of reloading, just reset auth state
        console.log("Chain changed, resetting auth state");
        logout();
        checkWalletConnection();
    };

    const login = async () => {
        if (!window.ethereum) {
            alert("MetaMask not detected! Please install MetaMask browser extension.");
            throw new Error("No wallet detected");
        }

        console.log("🔵 Starting wallet connection...");
        setIsLoading(true);

        try {
            console.log("🔵 Creating provider...");
            const provider = new ethers.BrowserProvider(window.ethereum);

            console.log("🔵 Requesting account access from MetaMask...");
            // Try multiple methods to trigger MetaMask popup
            let accounts;
            try {
                // Method 1: Use eth_requestAccounts
                accounts = await provider.send("eth_requestAccounts", []);
                console.log("✅ MetaMask popup method 1 successful, accounts:", accounts);
            } catch (error) {
                console.log("⚠️ Method 1 failed, trying alternative method...");
                // Method 2: Direct ethereum.request
                try {
                    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    console.log("✅ MetaMask popup method 2 successful, accounts:", accounts);
                } catch (error2) {
                    console.error("❌ Both MetaMask connection methods failed:", error, error2);
                    throw new Error("Failed to connect to MetaMask. Please ensure MetaMask is unlocked and try again.");
                }
            }

            console.log("🔵 Getting signer...");
            const signer = await provider.getSigner();

            console.log("🔵 Getting wallet address...");
            const address = await signer.getAddress();
            console.log("✅ Wallet connected:", address);

            // Message and timestamp
            console.log("🔵 Creating signature...");
            const timestamp = Date.now();
            const message = `Login request at ${new Date().toISOString()}`;
            const signature = await signer.signMessage(message);
            console.log("✅ Signature created");

            // Authenticate with backend
            console.log("🔵 Connecting to backend...");
            try {
                const userData = await connectWallet({
                    walletAddress: address,
                    signature,
                    message,
                    timestamp,
                });

                console.log("✅ Backend connection successful:", userData);

                // Store token properly
                if (userData.data.accessToken) {
                    localStorage.setItem("accessToken", userData.data.accessToken);
                }

                setProvider(provider);
                setSigner(signer);
                setWalletAddress(address);
                setUser(userData);
                setIsAuthenticated(true);

                // Prefetch quest data immediately after authentication
                prefetchQuests();

                return userData;
            } catch (backendError) {
                console.error("❌ Backend connection failed:", backendError);
                throw new Error("Backend connection failed. The database may be temporarily unavailable. Please try again later.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const hasCompletedProfile = () => {
        if (!user?.data?.user) return false;
        let userData = user.data.user;
        return (userData =
            user.data.user &&
            userData.username !==
                `Player_${userData.walletAddress?.slice(2, 8)}` &&
            userData.avatar);
    };

    const logout = () => {
        setUser(null);
        setWalletAddress(null);
        setIsAuthenticated(false);
        setProvider(null);
        setSigner(null);
        localStorage.removeItem("token");
    };

    const getBalance = async () => {
        if (!provider || !walletAddress) return null;

        try {
            const balance = await provider.getBalance(walletAddress);
            return ethers.formatEther(balance);
        } catch (error) {
            console.error("Failed to get balance:", error);
            return null;
        }
    };

    const getAuthHeaders = () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("Getting auth headers, token:", accessToken);
        if (!accessToken) {
            console.error("No token found in localStorage");
            throw new Error("User not authenticated");
        }
        return {
            headers: { Authorization: `Bearer ${accessToken}` },
        };
    };

    const value = {
        user,
        walletAddress,
        isAuthenticated,
        isLoading,
        provider,
        signer,
        login,
        logout,
        getBalance,
        getAuthHeaders,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

