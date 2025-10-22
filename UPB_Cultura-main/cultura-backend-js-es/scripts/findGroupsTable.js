// Script para encontrar el nombre correcto de la tabla de grupos
import { sequelize } from "../src/db/sequelize.js";

async function findGroupsTable() {
  try {
    console.log("🔍 Buscando tabla de grupos...\n");
    
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%Grupo%'
      ORDER BY table_name;
    `);

    console.log("📋 Tablas encontradas que contienen 'Grupo':");
    results.forEach((row, index) => {
      console.log(`   ${index + 1}. ${row.table_name}`);
    });

    if (results.length > 0) {
      console.log("\n🔍 Analizando estructura de la tabla principal de grupos:");
      const groupsTable = results[0].table_name;
      console.log(`   Tabla: ${groupsTable}\n`);

      const [columns] = await sequelize.query(`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_name = '${groupsTable}'
        ORDER BY ordinal_position;
      `);

      columns.forEach(col => {
        const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        console.log(`   ${col.column_name.padEnd(30)} ${col.data_type.toUpperCase()}${length} ${nullable}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

findGroupsTable();



