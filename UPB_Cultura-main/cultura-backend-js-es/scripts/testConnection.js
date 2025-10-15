// Script para probar la conexión a la base de datos PostgreSQL
import { sequelize } from "../src/db/sequelize.js";

async function testConnection() {
  try {
    console.log("🔌 Intentando conectar a la base de datos...");
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a PostgreSQL!");
    console.log("\n📊 Información de la conexión:");
    console.log(`   Host: ${sequelize.config.host}`);
    console.log(`   Puerto: ${sequelize.config.port}`);
    console.log(`   Base de datos: ${sequelize.config.database}`);
    console.log(`   Usuario: ${sequelize.config.username}`);
    
    // Listar las tablas disponibles
    console.log("\n📋 Tablas en la base de datos:");
    const tables = await sequelize.getQueryInterface().showAllTables();
    if (tables.length > 0) {
      tables.forEach((table, index) => {
        console.log(`   ${index + 1}. ${table}`);
      });
    } else {
      console.log("   ⚠️  No se encontraron tablas en la base de datos");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:");
    console.error(error.message);
    console.error("\n💡 Verifica:");
    console.error("   1. Que PostgreSQL esté corriendo");
    console.error("   2. Que las credenciales en el archivo .env sean correctas");
    console.error("   3. Que la base de datos exista en pgAdmin");
    process.exit(1);
  }
}

testConnection();



