// Script de diagnóstico para el backend
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
config({ path: join(__dirname, '..', '.env') });

console.log('🔍 Diagnóstico del Backend\n');

// Verificar variables de entorno
console.log('📋 Variables de entorno:');
console.log(`   PORT: ${process.env.PORT || 'No definido'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'No definido'}`);
console.log(`   CORS_ORIGINS: ${process.env.CORS_ORIGINS || 'No definido'}`);
console.log(`   DB_HOST: ${process.env.DB_HOST || 'No definido'}`);
console.log(`   DB_PORT: ${process.env.DB_PORT || 'No definido'}`);
console.log(`   DB_NAME: ${process.env.DB_NAME || 'No definido'}`);
console.log(`   DB_USER: ${process.env.DB_USER || 'No definido'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? 'Definido' : 'No definido'}`);

// Verificar archivos
import fs from 'fs';
const files = [
  'src/index.js',
  'src/app.js',
  'src/db/sequelize.js',
  '.env'
];

console.log('\n📁 Archivos del proyecto:');
files.forEach(file => {
  const exists = fs.existsSync(join(__dirname, '..', file));
  console.log(`   ${file}: ${exists ? '✅ Existe' : '❌ No existe'}`);
});

// Verificar puerto
import net from 'net';

const checkPort = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
};

console.log('\n🔌 Verificación de puertos:');
const port4000 = await checkPort(4000);
console.log(`   Puerto 4000: ${port4000 ? '✅ Disponible' : '❌ Ocupado'}`);

console.log('\n🚀 Para iniciar el backend:');
console.log('   npm run dev');
console.log('\n🔧 Si hay errores, revisa:');
console.log('   1. Variables de entorno en .env');
console.log('   2. Conexión a PostgreSQL');
console.log('   3. Dependencias instaladas (npm install)');
