import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { connectWallet } from "../lib/authApiService";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Check if wallet is already connected
    useEffect(() => {
        const checkWallet = async () => {
            if (window.ethereum?.selectedAddress) {
                try {
                    // Optional: Verify with backend if already authenticated
                    // const data = await verifySession();
                    navigate("/customize");
                } catch (err) {
                    console.error("Failed to verify session:", err);
                }
            }
        };
        checkWallet();
    }, []);

    const openLogin = async () => {
        if (!window.ethereum) {
            alert("No MetaMask detected");
            return;
        }

        setLoading(true);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Request access
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();

            // Create a message to sign
            const message = `Login request at ${new Date().toISOString()}`;
            const signature = await signer.signMessage(message);

            // Send to backend
            const data = await connectWallet({
                walletAddress,
                signature,
                message,
            });
            console.log("Backend response:", data);

            // You could store token or user info in localStorage here if needed
            // localStorage.setItem("token", data.token);

            navigate("/customize");
        } catch (err) {
            console.error(err);
            alert("Failed to connect wallet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full">
            <img
                src="/assets/ShapeTownBg.png"
                className="absolute top-0 left-0 z-0 object-cover h-full w-full"
            />

            <div className="z-10 relative h-screen flex items-center justify-center ml-32">
                <div className="relative">
                    <img
                        src="/assets/shapeTownSign.png"
                        className="relative"
                        height={920}
                        width={705}
                    />
                    <button
                        className="absolute bottom-6 left-0 w-full flex justify-center"
                        onClick={openLogin}
                        disabled={loading}
                    >
                        <img
                            src="/assets/loginConnect.png"
                            alt="Connect Wallet"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
