import { createConfig } from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
const uiConfig = {
    illustrationStyle: "outline",
    auth: {
        sections: [[{ "type": "email" }], [{ "type": "passkey" }, { "type": "social", "authProviderId": "google", "mode": "popup" }, { "type": "social", "authProviderId": "facebook", "mode": "popup" }], [{ "type": "external_wallets", "walletConnect": { "projectId": "your-project-id" } }]],
        addPasskeyOnSignup: false,
    },
};

export const config = createConfig({
    // if you don't want to leak api keys, you can proxy to a backend and set the rpcUrl instead here
    // get this from the app config you create at https://dashboard.alchemy.com/accounts?utm_source=demo_alchemy_com&utm_medium=referral&utm_campaign=demo_to_dashboard
    // transport: alchemy({ apiKey: import.meta.env.ALCHEMY_API }),
    transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API }),
    chain: sepolia,
    ssr: true, // set to false if you're not using server-side rendering
    enablePopupOauth: true,
}, uiConfig);

export function generateConfig(key){
    return createConfig({
        transport: alchemy({ apiKey: key }),
        chain: sepolia,
        ssr: true, // set to false if you're not using server-side rendering
        enablePopupOauth: true,
    }, uiConfig);
}