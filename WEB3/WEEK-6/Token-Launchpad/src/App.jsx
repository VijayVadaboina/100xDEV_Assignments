import { useState } from "react";
import { TokenLaunchpad } from "../components/TokenLaunchpad";
// wallet adapter imports
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";

function App() {
  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/s-b9S8d4FgkG6Zi2nZ1xaZfGVEK_j6Gq"
      }
    >
      <WalletProvider wallets={[]} autoconnect>
        <WalletModalProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <WalletMultiButton></WalletMultiButton>
            <WalletDisconnectButton></WalletDisconnectButton>
          </div>
          <TokenLaunchpad></TokenLaunchpad>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
