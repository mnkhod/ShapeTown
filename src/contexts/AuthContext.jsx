import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { connectWallet } from "../lib/authApiService";

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
        // Reload the page to avoid state inconsistencies
        window.location.reload();
    };

    const login = async () => {
        if (!window.ethereum) {
            throw new Error("No wallet detected");
        }

        setIsLoading(true);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // Create signature for authentication
            const message = `Login request at ${new Date().toISOString()}`;
            const signature = await signer.signMessage(message);

            // Authenticate with backend
            const userData = await connectWallet({
                walletAddress: address,
                signature,
                message,
            });

            console.log("Login response:", userData);

            // Store token if provided by backend
            if (userData.data.accessToken) {
                const accessToken = userData.data.accessToken;
                localStorage.setItem("token", accessToken);
                console.log("Token stored:", accessToken);
            } else {
                console.warn("No token received from backend:", userData);
            }

            setProvider(provider);
            setSigner(signer);
            setWalletAddress(address);
            setUser(userData);
            setIsAuthenticated(true);

            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
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

