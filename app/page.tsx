"use client";

import { checkSybilStatus } from "@/lib/actions/sybil.action";
import { isValidEvmAddress } from "@/lib/validateAddress";
import { useState, FormEvent, useRef } from "react";
import Image from "next/image";

const Home = () => {
  const [address, setAddress] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResult(null);
    setError(null);

    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }

    if (!isValidEvmAddress(address)) {
      setError("Invalid EVM address");
      return;
    }

    try {
      const { isSybil } = await checkSybilStatus(address);

      if (isSybil) {
        setResult("SYBIL");
      } else {
        setResult("NOT SYBIL");
      }
    } catch (error) {
      console.error("Error checking SYBIL status:", error);
      setResult("Error checking address");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="sniper-scope-background"></div>
      <main className="flex flex-col justify-center items-center relative z-10">
        <div className="justify-center">
          <h1 className="mt-10 primary-gradient h1-bold rounded-xl px-2 mb-10">
            LayerZero Sybil Hunter
          </h1>
        </div>
        <div className="mt-16 paragraph-semibold">
          Enter your address to check if it is a SYBIL address
        </div>
        <form onSubmit={handleSubmit} className="flex items-center mt-5">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="ml-2 p-2 primary-gradient rounded-xl"
          >
            Search
          </button>
        </form>
        {error && <p className="mt-5 text-red-500">{error}</p>}
        {result && (
          <div>
            <p
              className={`mt-5 h1-bold ${
                result === "SYBIL" ? "text-red-500" : "text-green-500"
              }`}
            >
              The address is {result}
            </p>
          </div>
        )}
        <audio ref={audioRef} src="/shooting-sound.mp3" preload="auto"></audio>
      </main>

      <footer className="footer-right">
        <Image src="/x-logo.png" alt="X Logo" width={24} height={24} />
        <a
          href="https://twitter.com/reallyaaryan"
          target="_blank"
          rel="noopener noreferrer"
        >
          @reallyaaryan
        </a>
      </footer>
      <footer className="footer-left">
        <p>Based on the sybil list released on 17th May*</p>
      </footer>
    </div>
  );
};

export default Home;
