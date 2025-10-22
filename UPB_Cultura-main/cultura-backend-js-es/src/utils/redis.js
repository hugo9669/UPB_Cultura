// Cliente Redis compartido (opcional)
import Redis from "ioredis";
import { REDIS_URL } from "../config/env.js";

let client;
let redisAvailable = false;
<<<<<<< HEAD
let connectionAttempted = false;
let errorLogged = false;
=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628

export function getRedis() {
  if (!client) {
    try {
      client = new Redis(REDIS_URL, {
        retryDelayOnFailover: 100,
<<<<<<< HEAD
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
=======
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
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
        redisAvailable = false;
      });
      
      client.on('close', () => {
<<<<<<< HEAD
        redisAvailable = false;
      });
    } catch (error) {
      if (!errorLogged) {
        console.log('[Redis] ⚠️ No disponible:', error.message);
        errorLogged = true;
      }
=======
        console.log('[Redis] Conexión cerrada');
        redisAvailable = false;
      });
    } catch (error) {
      console.log('[Redis] No disponible:', error.message);
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
      redisAvailable = false;
    }
  }
  return client;
}

export function isRedisAvailable() {
  return redisAvailable;
}
