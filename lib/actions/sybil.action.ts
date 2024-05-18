"use server";

import { connectToDatabase } from "@/database/mongoose";
import Sybil from "@/database/sybil.model";

export async function checkSybilStatus(address: string) {
  await connectToDatabase();

  if (!address || typeof address !== "string") {
    throw new Error("Invalid address");
  }

  try {
    const sybil = await Sybil.findOne({ address: address.toLowerCase() });
    if (sybil) {
      return { isSybil: true };
    } else {
      return { isSybil: false };
    }
  } catch (error) {
    console.error("Error checking SYBIL status:", error);
    throw new Error("Failed to check address");
  }
}
