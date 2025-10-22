// Script para hashear la contraseña de un usuario específico
import bcrypt from "bcryptjs";
import { User } from "../src/models/index.js";

const hashUserPassword = async () => {
  const email = process.argv[2];
  const newPassword = process.argv[3];
  
  if (!email || !newPassword) {
    console.log('❌ Uso: npm run hash-user-password <email> <nueva_contraseña>');
    console.log('   Ejemplo: npm run hash-user-password esteban.rindon@upb.edu.co nueva123');
    process.exit(1);
  }
  
  console.log(`🔐 Hasheando contraseña para: ${email}\n`);
  
  try {
    // Buscar el usuario
    const user = await User.findOne({ where: { correo: email } });
    
    if (!user) {
      console.log('❌ Usuario no encontrado');
      process.exit(1);
    }
    
    console.log(`👤 Usuario encontrado: ${user.nombre}`);
    console.log(`📧 Email: ${user.correo}`);
    console.log(`🔐 Contraseña actual: ${user.contrasena ? 'Configurada' : 'No configurada'}`);
    
    // Hashear la nueva contraseña
    console.log('\n🔄 Hasheando nueva contraseña...');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Actualizar en la base de datos
    await user.update({ contrasena: hashedPassword });
    
    console.log('✅ Contraseña actualizada exitosamente!');
    console.log(`🔐 Nueva contraseña hasheada: ${hashedPassword.substring(0, 20)}...`);
    console.log(`📏 Longitud: ${hashedPassword.length} caracteres`);
    
    console.log('\n🧪 Ahora puedes probar el login con:');
    console.log(`   Email: ${email}`);
    console.log(`   Contraseña: ${newPassword}`);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  process.exit(0);
};

hashUserPassword();
