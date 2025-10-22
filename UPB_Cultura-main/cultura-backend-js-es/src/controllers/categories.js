import * as svc from "../services/categories.js";

export async function listCategoriesCtrl(req, res, next) {
  try {
    const categories = await svc.listCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
}


