import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "./config.ts";
import { WagmiProvider } from "wagmi";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const queryClient = new QueryClient();

// Make queryClient available globally for Phaser game to invalidate cache
if (typeof window !== "undefined") {
    window.queryClient = queryClient;
}

export default function Providers(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <AuthProvider>{props.children}</AuthProvider>
            </WagmiProvider>
        </QueryClientProvider>
    );
}
