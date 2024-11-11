"server-only";

import { Client, Account, Storage, Users, Databases } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!) // Your project ID
    .setKey(process.env.NEXT_APPWRITE_KEY!); // Your secret API key

  return {
    get account() {
      return new Account(client);
    },
  };
}
