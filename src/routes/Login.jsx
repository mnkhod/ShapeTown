import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated, isLoading } = useAuth();
    const [connecting, setConnecting] = useState(false);

    // Check if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/customize");
        }
    }, [isAuthenticated, navigate]);

    const openLogin = async () => {
        setConnecting(true);

        try {
            await login();
            navigate("/customize");
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
