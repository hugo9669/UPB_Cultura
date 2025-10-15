// Script para actualizar la configuración de CORS
import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

console.log('🔧 Actualizando configuración de CORS...\n');

try {
  // Leer el archivo .env actual
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Agregar o actualizar CORS_ORIGINS
  const corsLine = 'CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:3000';
  
  if (envContent.includes('CORS_ORIGINS=')) {
    // Actualizar línea existente
    envContent = envContent.replace(
      /CORS_ORIGINS=.*/,
      corsLine
    );
    console.log('✅ CORS_ORIGINS actualizado');
  } else {
    // Agregar nueva línea
    envContent += `\n${corsLine}\n`;
    console.log('✅ CORS_ORIGINS agregado');
  }

  // Escribir el archivo actualizado
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n📋 Configuración CORS:');
  console.log('   - http://localhost:5173 (puerto por defecto)');
  console.log('   - http://localhost:5174 (puerto actual)');
  console.log('   - http://localhost:3000 (puerto alternativo)');
  
  console.log('\n🔄 Reinicia el backend para aplicar los cambios:');
  console.log('   Ctrl+C para detener');
  console.log('   npm run dev para reiniciar');
  
} catch (error) {
  console.error('❌ Error al actualizar CORS:', error.message);
  process.exit(1);
}
