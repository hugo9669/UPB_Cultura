// Script para probar login con nuevo usuario

const testNewUserLogin = async () => {
  console.log('🧪 Probando login con nuevo usuario...\n');
  
  // Solicitar datos del usuario
  const email = process.argv[2] || 'esteban.rindon@upb.edu.co';
  const password = process.argv[3] || 'password123';
  
  console.log(`📧 Email: ${email}`);
  console.log(`🔐 Contraseña: ${password}\n`);
  
  try {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    console.log('📊 Estado de respuesta:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Login exitoso!');
      console.log('📋 Datos del usuario:', {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.name,
        role: data.user?.role
      });
      console.log('🔑 Token generado:', data.token ? 'Sí' : 'No');
    } else {
      const error = await response.text();
      console.log('❌ Error en login:', error);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    console.log('💡 Verifica que el backend esté corriendo en puerto 4000');
  }
};

testNewUserLogin();
