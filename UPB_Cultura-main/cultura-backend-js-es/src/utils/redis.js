// Cliente Redis compartido (opcional)
import Redis from "ioredis";
import { REDIS_URL } from "../config/env.js";

let client;
let redisAvailable = false;

export function getRedis() {
  if (!client) {
    try {
      client = new Redis(REDIS_URL, {
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        connectTimeout: 5000,
        commandTimeout: 5000
      });
      
      client.on('connect', () => {
        console.log('[Redis] Conectado');
        redisAvailable = true;
      });
      
      client.on('error', (err) => {
        console.log('[Redis] Error:', err.message);
        redisAvailable = false;
      });
      
      client.on('close', () => {
        console.log('[Redis] Conexión cerrada');
        redisAvailable = false;
      });
    } catch (error) {
      console.log('[Redis] No disponible:', error.message);
      redisAvailable = false;
    }
  }
  return client;
}

export function isRedisAvailable() {
  return redisAvailable;
}
