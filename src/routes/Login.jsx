import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated, isLoading, user } = useAuth();
    const [connecting, setConnecting] = useState(false);

    // Check if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            // Check if user has completed profile setup
            const hasCompletedProfile =
                user.data?.user?.username &&
                !user.data.user.username.startsWith("Player_");

            if (hasCompletedProfile) {
                navigate("/game"); // Skip customization for returning users
            } else {
                navigate("/customize"); // First time users go to customization
            }
        }
    }, [isAuthenticated, user, navigate]);

    const openLogin = async () => {
        console.log("🔵 Connect button clicked!");
        setConnecting(true);

        try {
            console.log("🔵 Calling login function...");
            const userData = await login();

            // Check if user needs customization after login
            const needsCustomization =
                !userData.data?.user?.username ||
                userData.data.user.username.startsWith("Player_");

            if (needsCustomization) {
                console.log("🔵 Navigating to customize page...");
                navigate("/customize");
            } else {
                console.log("🔵 Navigating to game page...");
                navigate("/game");
            }
        } catch (err) {
            console.error("❌ Login error:", err);
            alert(`Failed to connect wallet: ${err.message || err}`);
        } finally {
            setConnecting(false);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <img
                src="/assets/harvesting.jpg"
                className="absolute top-0 left-0 z-0 object-cover h-full w-full"
                alt="Harvesting Background"
            />

            {/* Overlay for better contrast */}
            <div className="absolute top-0 left-0 z-5 h-full w-full bg-black bg-opacity-20"></div>

            {/* Main Content */}
            <div className="z-10 relative h-screen flex items-center justify-center">
                <div className="text-center z-15">
                    {/* Connect Button */}
                    <button
                        className="z-20 hover:scale-105 transition-transform duration-200 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-white font-bold text-xl shadow-2xl border-2 border-green-400"
                        onClick={openLogin}
                        disabled={connecting || isLoading}
                        style={{
                            filter: connecting || isLoading ? 'brightness(0.7)' : 'brightness(1)',
                            pointerEvents: connecting || isLoading ? 'none' : 'auto'
                        }}
                    >
                        {connecting ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                <span>Connecting...</span>
                            </div>
                        ) : (
                            'Connect Wallet'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
