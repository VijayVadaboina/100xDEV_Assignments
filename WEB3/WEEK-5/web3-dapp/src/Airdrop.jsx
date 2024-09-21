import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendAirdropToUser() {
    let amount = document.getElementById("publicKey").value;
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert("airdropped " + amount + "Sol to " + wallet.publicKey.toBase58());
  }
  return (
    <div>
      <input id="publicKey" type="text" placeholder="Amount"></input>
      <button onClick={sendAirdropToUser}>Send Airdrop</button>
    </div>
  );
}
