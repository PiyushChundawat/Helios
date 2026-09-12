import { createClient } from "redis";


const redisClient = createClient({
  url: "redis://localhost:6379",
});


redisClient.on("error", (err: Error) => console.error("Redis error:", err));

let isConnected = false;

export async function getRedisClient() {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
  }
  return redisClient;
}