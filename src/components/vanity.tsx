import { useState } from "react";
import { Keypair } from "@solana/web3.js";

const VanityAddressGenerator = () => {
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundKey, setFoundKey] = useState(null);

  const generateVanityAddress = async () => {
    setLoading(true);
    setFoundKey(null);
    let keypair;
    let publicKey;

    console.log("Generating address...");

    while (true) {
      keypair = Keypair.generate();
      publicKey = keypair.publicKey.toBase58();

      if (
        (prefix && publicKey.startsWith(prefix)) ||
        (suffix && publicKey.endsWith(suffix))
      ) {
        break; // Found a matching address
      }

    }

    setFoundKey({ publicKey, secretKey: Buffer.from(keypair.secretKey).toString("hex") });
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Solana Vanity Address Generator</h2>
      <input
        type="text"
        placeholder="Enter prefix (e.g., abc)"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Enter suffix (e.g., xyz)"
        value={suffix}
        onChange={(e) => setSuffix(e.target.value)}
        disabled={loading}
      />
      <button onClick={generateVanityAddress} disabled={loading}>
        {loading ? "Generating..." : "Find Vanity Address"}
      </button>

      {foundKey && (
        <div style={{ marginTop: "20px" }}>
          <h3>Found Vanity Address 🎉</h3>
          <p><strong>Public Key:</strong> {foundKey.publicKey}</p>
          <p><strong>Secret Key:</strong> {foundKey.secretKey}</p>
        </div>
      )}
    </div>
  );
};

export default VanityAddressGenerator;
