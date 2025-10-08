import { Router } from "express";
import { globalSearchCtrl } from "../controllers/search.js";

const r = Router();
r.get("/", globalSearchCtrl); // ?q=&limit=&offset=
export default r;
