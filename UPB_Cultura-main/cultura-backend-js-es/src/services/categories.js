import { Category } from "../models/index.js";

export async function listCategories() {
  const categories = await Category.findAll({
    attributes: ['id', 'nombreCategoria', 'descripcion'],
    order: [['id', 'ASC']]
  });
  
  // Mapear a formato más amigable para el frontend
  return categories.map(cat => ({
    id: cat.id,
    name: cat.nombreCategoria,
    description: cat.descripcion
  }));
}


