// Script para ver la estructura de las tablas en PostgreSQL
import { sequelize } from "../src/db/sequelize.js";

async function checkTableStructure() {
  try {
    console.log("🔍 Analizando estructura de las tablas...\n");
    
    const tables = [
      'Roles',
      'Usuarios',
      'Grupos_Culturales',
      'Categorias',
      'Miembros_Grupo',
      'Imagenes_Grupo',
      'Elementos_Repertorio',
      'Publicaciones',
      'Eventos',
      'Repertorios',
      'Comentarios'
    ];

    for (const tableName of tables) {
      console.log(`\n📋 Tabla: ${tableName}`);
      console.log("─".repeat(60));
      
      const [results] = await sequelize.query(`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_name = '${tableName}'
        ORDER BY ordinal_position;
      `);

      if (results.length === 0) {
        console.log("   ⚠️  Tabla no encontrada o sin permisos");
        continue;
      }

      results.forEach(col => {
        const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        console.log(`   ${col.column_name.padEnd(30)} ${col.data_type.toUpperCase()}${length} ${nullable}${defaultVal}`);
      });
    }

    console.log("\n\n✅ Análisis completado");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al analizar las tablas:", error.message);
    process.exit(1);
  }
}

checkTableStructure();



