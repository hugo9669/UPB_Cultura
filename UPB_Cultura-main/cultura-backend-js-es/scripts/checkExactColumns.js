// Script para verificar las columnas exactas con caracteres especiales
import { sequelize } from "../src/db/sequelize.js";

async function checkExactColumns() {
  try {
    console.log('🔍 Verificando columnas exactas con caracteres especiales...\n');
    
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida\n');
    
    // Obtener información detallada de las columnas con caracteres exactos
    const [results] = await sequelize.query(`
      SELECT 
        column_name,
        length(column_name) as name_length,
        ascii(substring(column_name from 1 for 1)) as first_char_ascii,
        ascii(substring(column_name from length(column_name) for 1)) as last_char_ascii
      FROM information_schema.columns 
      WHERE table_name = 'Eventos' 
      ORDER BY ordinal_position;
    `);
    
    console.log('📋 Columnas con información detallada:');
    results.forEach((col, index) => {
      console.log(`${index + 1}. "${col.column_name}" (longitud: ${col.name_length})`);
      console.log(`   Primer carácter ASCII: ${col.first_char_ascii}`);
      console.log(`   Último carácter ASCII: ${col.last_char_ascii}`);
      console.log('');
    });
    
    // Buscar la columna que contiene "descripcion"
    const descripcionCol = results.find(col => col.column_name.includes('descripcion'));
    if (descripcionCol) {
      console.log('🔍 Columna que contiene "descripcion":');
      console.log(`   Nombre exacto: "${descripcionCol.column_name}"`);
      console.log(`   Longitud: ${descripcionCol.name_length}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkExactColumns();
