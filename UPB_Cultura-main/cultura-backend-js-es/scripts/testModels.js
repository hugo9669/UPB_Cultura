// Script para probar los modelos con las tablas reales
import { 
  User, 
  Role, 
  Group, 
  Category, 
  Membership, 
  Event, 
  Publication, 
  Repertorio, 
  Comment 
} from "../src/models/index.js";
import "../src/db/relations.js"; // Importar relaciones

async function testModels() {
  try {
    console.log("🔍 Probando modelos con la base de datos...\n");

    // Test 1: Contar registros en cada tabla
    console.log("📊 Contando registros en cada tabla:");
    console.log("─".repeat(60));

    const counts = await Promise.all([
      Role.count().then(count => ({ name: "Roles", count })),
      User.count().then(count => ({ name: "Usuarios", count })),
      Category.count().then(count => ({ name: "Categorias", count })),
      Group.count().then(count => ({ name: "Grupos_Culturales", count })),
      Membership.count().then(count => ({ name: "Miembros_Grupo", count })),
      Event.count().then(count => ({ name: "Eventos", count })),
      Publication.count().then(count => ({ name: "Publicaciones", count })),
      Repertorio.count().then(count => ({ name: "Repertorios", count })),
      Comment.count().then(count => ({ name: "Comentarios", count }))
    ]);

    counts.forEach(({ name, count }) => {
      console.log(`   ${name.padEnd(30)} ${count} registros`);
    });

    // Test 2: Obtener algunos datos de ejemplo
    console.log("\n\n📋 Ejemplos de datos:");
    console.log("─".repeat(60));

    const roles = await Role.findAll({ limit: 3 });
    console.log("\n✅ Roles encontrados:");
    roles.forEach(role => {
      console.log(`   - ID: ${role.id}, Nombre: ${role.nombreRol}`);
    });

    const users = await User.findAll({ limit: 3 });
    console.log("\n✅ Usuarios encontrados:");
    users.forEach(user => {
      console.log(`   - ID: ${user.id}, Nombre: ${user.nombre}, Correo: ${user.correo}`);
    });

    const groups = await Group.findAll({ limit: 3 });
    console.log("\n✅ Grupos encontrados:");
    groups.forEach(group => {
      console.log(`   - ID: ${group.id}, Nombre: ${group.nombreGrupo}`);
    });

    // Test 3: Probar relaciones
    console.log("\n\n🔗 Probando relaciones:");
    console.log("─".repeat(60));

    const userWithRole = await User.findOne({
      include: [{ model: Role, as: "rol" }]
    });

    if (userWithRole) {
      console.log(`\n✅ Usuario con rol:`);
      console.log(`   Usuario: ${userWithRole.nombre}`);
      console.log(`   Rol: ${userWithRole.rol?.nombreRol || "Sin rol"}`);
    }

    const groupWithCategory = await Group.findOne({
      include: [{ model: Category, as: "categoria" }]
    });

    if (groupWithCategory) {
      console.log(`\n✅ Grupo con categoría:`);
      console.log(`   Grupo: ${groupWithCategory.nombreGrupo}`);
      console.log(`   Categoría: ${groupWithCategory.categoria?.nombreCategoria || "Sin categoría"}`);
    }

    console.log("\n\n✅ Todos los modelos funcionan correctamente!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al probar los modelos:");
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testModels();

