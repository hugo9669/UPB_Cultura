// Script para hashear las contraseñas de los usuarios existentes
import bcrypt from "bcryptjs";
import { sequelize } from "../src/db/sequelize.js";

async function hashPasswords() {
  try {
    console.log("🔐 Hasheando contraseñas de usuarios...\n");

    // Contraseñas en texto plano (según la imagen)
    const users = [
      {
        id: 511566,
        nombre: "Hugo Hernandez",
        correo: "hugo.hernandezm@upb.edu.co",
        passwordPlain: "hahm2006",
        idRol: 2
      },
      {
        id: 523855,
        nombre: "Felipe cano",
        correo: "juan.canon@upb.edu.co",
        passwordPlain: "12345678",
        idRol: 3
      },
      {
        id: 571683,
        nombre: "cesar rodriguez",
        correo: "cesar.rodriguez@upb.edu.co",
        passwordPlain: "hola1234",
        idRol: 1
      }
    ];

    for (const user of users) {
      console.log(`\n📝 Procesando: ${user.nombre}`);
      console.log(`   Email: ${user.correo}`);
      console.log(`   Rol ID: ${user.idRol}`);
      
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(user.passwordPlain, 10);
      
      // Actualizar en la base de datos
      const [affectedRows] = await sequelize.query(`
        UPDATE "Usuarios"
        SET "contrasena" = :hashedPassword
        WHERE "ID" = :id
      `, {
        replacements: {
          hashedPassword: hashedPassword,
          id: user.id
        }
      });

      console.log(`   ✅ Contraseña hasheada y actualizada`);
      console.log(`   🔑 Contraseña original: ${user.passwordPlain}`);
      console.log(`   🔒 Hash: ${hashedPassword.substring(0, 50)}...`);
    }

    console.log("\n\n✅ Todas las contraseñas han sido hasheadas correctamente!");
    console.log("\n📋 Resumen de usuarios:");
    console.log("─".repeat(70));
    
    for (const user of users) {
      const roleName = user.idRol === 1 ? "administrador" : 
                      user.idRol === 2 ? "usuario" : 
                      "Lcultural";
      console.log(`\n${user.nombre}`);
      console.log(`  Email: ${user.correo}`);
      console.log(`  Rol: ${roleName}`);
      console.log(`  Contraseña: ${user.passwordPlain}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al hashear contraseñas:", error.message);
    process.exit(1);
  }
}

hashPasswords();



