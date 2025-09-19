// Cliente Redis compartido
import Redis from "ioredis";
import { REDIS_URL } from "../config/env.js";

let client;
export function getRedis() {
  if (!client) client = new Redis(REDIS_URL);
  return client;
}
