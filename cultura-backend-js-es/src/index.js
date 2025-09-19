// Punto de entrada del servidor HTTP
import { createServer } from "http";
import app from "./app.js";
import { PORT } from "./config/env.js";
import { initDb } from "./db/init.js";

const server = createServer(app);

(async () => {
  // Inicializa conexión a la BD (sin sync destructivo).
  await initDb();

  server.listen(PORT, () => {
    console.log(`[OK] API escuchando en http://localhost:${PORT}`);
  });
})().catch((err) => {
  console.error("Error de arranque:", err);
  process.exit(1);
});
