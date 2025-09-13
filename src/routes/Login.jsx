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
        setConnecting(true);

        try {
            const userData = await login();

            // Check if user needs customization after login
            const needsCustomization =
                !userData.data?.user?.username ||
                userData.data.user.username.startsWith("Player_");

            if (needsCustomization) {
                navigate("/customize");
            } else {
                navigate("/game");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to connect wallet");
        } finally {
            setConnecting(false);
        }
    };

    return (
        <div className="relative h-screen w-full">
            <img
                src="/assets/harvesting.jpg"
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
                        disabled={connecting || isLoading}
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
