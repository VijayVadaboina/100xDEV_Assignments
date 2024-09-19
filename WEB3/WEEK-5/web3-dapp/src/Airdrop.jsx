import { useConnection, useWallet } from "@solana/wallet-adapter-react";
export function Airdrop() {
  const wallet = useWallet();
  const { Connection } = useConnection();

  async function sendAirdropToUser() {
    const amount = document.getElementById("publicKey").value;
    await Connection.requestAirdrop(wallet.publicKey, amount * 100000000);
    alert("airdropped sol");
  }
  return (
    <div>
      <input id="publicKey" type="text" placeholder="Amount"></input>
      <button onClick={sendAirdropToUser}>Send Airdrop</button>
    </div>
  );
}
