// Script para probar el modelo de eventos
import { Event } from "../src/models/index.js";
import "../src/db/relations.js";

async function testEventModel() {
  try {
    console.log('🔍 Probando modelo de eventos...\n');
    
    // Intentar hacer una consulta simple
    console.log('📋 Intentando obtener todos los eventos...');
    const events = await Event.findAll({
      limit: 5,
      raw: true
    });
    
    console.log('✅ Consulta exitosa!');
    console.log(`📊 Se encontraron ${events.length} eventos`);
    
    if (events.length > 0) {
      console.log('\n📋 Primer evento:');
      console.log(JSON.stringify(events[0], null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error en el modelo de eventos:');
    console.error('Mensaje:', error.message);
    console.error('Stack:', error.stack);
  }
}

testEventModel();
