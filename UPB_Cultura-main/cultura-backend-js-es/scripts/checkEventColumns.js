// Script para verificar las columnas exactas de la tabla de eventos
import { sequelize } from "../src/db/sequelize.js";

async function checkEventColumns() {
  try {
    console.log('🔍 Verificando columnas exactas de la tabla de eventos...\n');
    
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida\n');
    
    // Obtener información detallada de las columnas
    const [results] = await sequelize.query(`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default,
        character_maximum_length
      FROM information_schema.columns 
      WHERE table_name = 'Eventos' 
      ORDER BY ordinal_position;
    `);
    
    console.log('📋 Columnas de la tabla "Eventos":');
    results.forEach((col, index) => {
      console.log(`${index + 1}. ${col.column_name} (${col.data_type})`);
    });
    
    // Verificar si existe la columna descripcion
    const descripcionExists = results.some(col => col.column_name === 'descripcion');
    console.log(`\n🔍 ¿Existe la columna "descripcion"? ${descripcionExists ? '✅ Sí' : '❌ No'}`);
    
    // Buscar columnas similares
    const similarColumns = results.filter(col => 
      col.column_name.toLowerCase().includes('desc') || 
      col.column_name.toLowerCase().includes('descrip')
    );
    
    if (similarColumns.length > 0) {
      console.log('\n📋 Columnas similares a "descripcion":');
      similarColumns.forEach(col => {
        console.log(`   - ${col.column_name}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkEventColumns();
