// Configuración de Express y middlewares globales (CORS, Helmet, rate limit)
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import createError from "http-errors";
import { CORS_ORIGINS } from "./config/env.js";
import { passportInit } from "./config/passport.js";

// Rutas
import authRoutes from "./routes/auth.js";
import groupRoutes from "./routes/groups.js";
import eventRoutes from "./routes/events.js";
import memberRoutes from "./routes/memberships.js";
import announcementRoutes from "./routes/announcements.js";
import mediaRoutes from "./routes/media.js";
import searchRoutes from "./routes/search.js";
import calendarRoutes from "./routes/calendars.js";
import dashboardRoutes from "./routes/dashboard.js";
import userRoutes from "./routes/users.js";
import categoryRoutes from "./routes/categories.js";
import messageRoutes from "./routes/messages.js";
import userMessageRoutes from "./routes/userMessages.js";
import reportRoutes from "./routes/reports.js";
import membershipRequestRoutes from "./routes/membershipRequests.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: CORS_ORIGINS.split(","), credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

// Inicializa Passport (JWT + OAuth2 placeholder)
passportInit(app);

// Healthcheck
app.get("/", (_req, res) => res.json({ ok: true, servicio: "cultura-backend", docs: "/docs" }));

// Montaje de rutas
app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);
app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes); // obtener categorías disponibles
app.use("/memberships", memberRoutes); // rutas directas si se usa por ID
app.use("/announcements", announcementRoutes);
app.use("/media", mediaRoutes);
app.use("/search", searchRoutes);
app.use("/calendars", calendarRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/user-messages", userMessageRoutes);
app.use("/reports", reportRoutes);
app.use("/membership-requests", membershipRequestRoutes);

// 404
app.use((_req, _res, next) => next(createError(404, "Recurso no encontrado")));

// Manejador de errores
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "Error interno";
  
  // Enviar el mensaje en ambos campos para mayor compatibilidad
  res.status(status).json({ 
    error: message,
    message: message,
    status: status
  });
});

export default app;
