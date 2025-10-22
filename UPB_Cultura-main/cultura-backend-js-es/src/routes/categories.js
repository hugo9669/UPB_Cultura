import { Router } from "express";
import { listCategoriesCtrl } from "../controllers/categories.js";

const r = Router();

// Ruta pública para listar categorías
r.get("/", listCategoriesCtrl);

export default r;


