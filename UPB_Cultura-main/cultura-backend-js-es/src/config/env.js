// Carga de variables de entorno y exportación como constantes
import "dotenv/config";

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || "development";

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "5432";
export const DB_NAME = process.env.DB_NAME || "cultural_db";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PASS = process.env.DB_PASS || "postgres";

export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";

export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const OAUTH2 = {
  AUTH_URL: process.env.OAUTH2_AUTH_URL,
  TOKEN_URL: process.env.OAUTH2_TOKEN_URL,
  CLIENT_ID: process.env.OAUTH2_CLIENT_ID,
  CLIENT_SECRET: process.env.OAUTH2_CLIENT_SECRET,
  CALLBACK_URL: process.env.OAUTH2_CALLBACK_URL
};

export const FRONT_AFTER_LOGIN_URL = process.env.FRONT_AFTER_LOGIN_URL || "http://localhost:5173/auth/callback";

export const CORS_ORIGINS = process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:3000";
