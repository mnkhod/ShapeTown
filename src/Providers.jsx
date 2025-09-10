import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "./config.ts";
import { WagmiProvider } from "wagmi";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const queryClient = new QueryClient();

export default function Providers(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <AuthProvider>{props.children}</AuthProvider>
            </WagmiProvider>
        </QueryClientProvider>
    );
}
