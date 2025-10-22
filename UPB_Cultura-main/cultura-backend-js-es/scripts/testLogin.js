// Script para probar el login

const testLogin = async () => {
  console.log('🧪 Probando login...\n');
  
  try {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'hugo.hernandezm@upb.edu.co',
        password: 'hahm2006'
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

testLogin();
