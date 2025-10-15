// Script para verificar la configuración del entorno
import { config } from 'dotenv'

// Cargar variables de entorno
config()

console.log('🔍 Verificando configuración del entorno...\n')

const requiredVars = [
  'DB_HOST',
  'DB_PORT', 
  'DB_NAME',
  'DB_USER',
  'DB_PASS'
]

console.log('📋 Variables de entorno:')
console.log('─'.repeat(50))

requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    // Ocultar contraseña
    const displayValue = varName === 'DB_PASS' ? '***' : value
    console.log(`✅ ${varName}: ${displayValue}`)
  } else {
    console.log(`❌ ${varName}: NO DEFINIDA`)
  }
})

console.log('\n📊 Otras variables:')
console.log(`PORT: ${process.env.PORT || '4000'}`)
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`)
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '***' : 'NO DEFINIDA'}`)

// Verificar si todas las variables están definidas
const missingVars = requiredVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.log('\n❌ Variables faltantes:')
  missingVars.forEach(varName => console.log(`   - ${varName}`))
  console.log('\n💡 Crea un archivo .env con las credenciales de tu base de datos PostgreSQL')
} else {
  console.log('\n✅ Todas las variables de entorno están configuradas')
}

process.exit(0)
