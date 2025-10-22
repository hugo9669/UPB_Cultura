// Cliente Redis compartido (opcional)
import Redis from "ioredis";
import { REDIS_URL } from "../config/env.js";

let client;
let redisAvailable = false;
let connectionAttempted = false;
let errorLogged = false;

export function getRedis() {
  if (!client) {
    try {
      client = new Redis(REDIS_URL, {
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 1,
        lazyConnect: true,
        connectTimeout: 2000,
        commandTimeout: 2000,
        enableOfflineQueue: false,
        reconnectOnError: null
      });
      
      client.on('connect', () => {
        if (!connectionAttempted) {
          console.log('[Redis] ✅ Conectado exitosamente');
          connectionAttempted = true;
        }
        redisAvailable = true;
        errorLogged = false;
      });
      
      client.on('error', (err) => {
        if (!errorLogged) {
          console.log('[Redis] ⚠️ No disponible - La aplicación funcionará sin caché');
          errorLogged = true;
        }
        redisAvailable = false;
      });
      
      client.on('close', () => {
        redisAvailable = false;
      });
    } catch (error) {
      if (!errorLogged) {
        console.log('[Redis] ⚠️ No disponible:', error.message);
        errorLogged = true;
      }
      redisAvailable = false;
    }
  }
  return client;
}

export function isRedisAvailable() {
  return redisAvailable;
}
