import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { PropsWithChildren,useEffect,useState } from "react";
import { config } from './config.js';


const queryClient = new QueryClient()

export default function Providers(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={props.initialState}
      >
        {props.children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  )
}