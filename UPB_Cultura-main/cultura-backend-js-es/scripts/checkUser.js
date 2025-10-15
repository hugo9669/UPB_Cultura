// Script para verificar información de un usuario
import { User, Role } from "../src/models/index.js";
import "../src/db/relations.js";

const checkUser = async () => {
  const email = process.argv[2] || 'esteban.rindon@upb.edu.co';
  
  console.log(`🔍 Verificando usuario: ${email}\n`);
  
  try {
    const user = await User.findOne({
      where: { correo: email },
      include: [{ model: Role, as: "rol" }]
    });
    
    if (user) {
      console.log('✅ Usuario encontrado:');
      console.log(`   ID: ${user.id}`);
      console.log(`   Nombre: ${user.nombre}`);
      console.log(`   Email: ${user.correo}`);
      console.log(`   Contraseña configurada: ${user.contrasena ? 'Sí' : 'No'}`);
      console.log(`   Rol: ${user.rol?.nombreRol || 'No asignado'}`);
      console.log(`   Longitud de contraseña: ${user.contrasena ? user.contrasena.length : 0} caracteres`);
    } else {
      console.log('❌ Usuario no encontrado');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  process.exit(0);
};

checkUser();
