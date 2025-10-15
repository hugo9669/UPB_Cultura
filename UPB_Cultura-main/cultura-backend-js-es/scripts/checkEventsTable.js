// Script para verificar la estructura de la tabla de eventos
import { sequelize } from "../src/db/sequelize.js";

async function checkEventsTable() {
  try {
    console.log('🔍 Verificando estructura de la tabla de eventos...\n');
    
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida\n');
    
    // Obtener información de la tabla
    const [results] = await sequelize.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'Eventos' 
      ORDER BY ordinal_position;
    `);
    
    if (results.length === 0) {
      console.log('❌ No se encontró la tabla "Eventos"');
      
      // Buscar tablas similares
      const [tables] = await sequelize.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name ILIKE '%event%';
      `);
      
      console.log('\n📋 Tablas relacionadas con eventos:');
      tables.forEach(table => {
        console.log(`   - ${table.table_name}`);
      });
    } else {
      console.log('📋 Estructura de la tabla "Eventos":');
      console.log('┌─────────────────┬─────────────┬──────────┬─────────────────┐');
      console.log('│ Nombre Columna  │ Tipo        │ Nullable │ Default         │');
      console.log('├─────────────────┼─────────────┼──────────┼─────────────────┤');
      
      results.forEach(col => {
        const name = col.column_name.padEnd(15);
        const type = col.data_type.padEnd(11);
        const nullable = col.is_nullable === 'YES' ? 'Sí' : 'No';
        const defaultVal = col.column_default || '';
        
        console.log(`│ ${name} │ ${type} │ ${nullable.padEnd(8)} │ ${defaultVal.padEnd(15)} │`);
      });
      
      console.log('└─────────────────┴─────────────┴──────────┴─────────────────┘');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkEventsTable();
