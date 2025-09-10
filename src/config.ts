import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// Define Somnia Testnet
const somniaTestnet = {
    id: 50312,
    name: "Somnia Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "STT",
        symbol: "STT",
    },
    rpcUrls: {
        default: {
            http: ["https://dream-rpc.somnia.network/"],
        },
    },
    blockExplorers: {
        default: {
            name: "Somnia Explorer",
            url: "https://shannon-explorer.somnia.network/",
        },
    },
};

export const config = createConfig({
    chains: [mainnet, sepolia, somniaTestnet],
    connectors: [injected()],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [somniaTestnet.id]: http("https://dream-rpc.somnia.network/"),
    },
});
