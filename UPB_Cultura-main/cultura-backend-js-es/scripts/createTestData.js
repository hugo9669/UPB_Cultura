// Script para crear datos de prueba en la base de datos
import { sequelize } from './src/db/sequelize.js'
import { User, Group, Event, Membership } from './src/models/index.js'
import bcrypt from 'bcryptjs'

async function createTestData() {
  try {
    // Sincronizar modelos con la base de datos
    await sequelize.sync({ force: true })
    console.log('[DB] Modelos sincronizados')

    // Crear usuarios de prueba
    const adminPassword = await bcrypt.hash('admin123', 10)
    const coordinatorPassword = await bcrypt.hash('coord123', 10)
    
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@upb.edu.co',
      fullName: 'Administrador UPB',
      passwordHash: adminPassword,
      role: 'admin'
    })

    const coordinatorUser = await User.create({
      username: 'coordinator',
      email: 'coordinator@upb.edu.co',
      fullName: 'Coordinador de Cultura',
      passwordHash: coordinatorPassword,
      role: 'coordinator'
    })

    console.log('[DB] Usuarios creados')

    // Crear grupos de prueba
    const groups = await Group.bulkCreate([
      {
        name: 'Coro UPB',
        category: 'Música',
        description: 'Grupo vocal dedicado a la interpretación de música coral clásica y contemporánea.',
        image: 'https://placehold.co/400x300/1e40af/ffffff?text=Coro+UPB',
        categoryColor: 'blue',
        members: 25,
        founded: '2015',
        director: 'María González',
        photos: []
      },
      {
        name: 'Grupo de Teatro UPB',
        category: 'Teatro',
        description: 'Compañía teatral estudiantil que presenta obras clásicas y contemporáneas.',
        image: 'https://placehold.co/400x300/b91c1c/ffffff?text=Teatro+UPB',
        categoryColor: 'red',
        members: 18,
        founded: '2012',
        director: 'Carlos Mendoza',
        photos: []
      },
      {
        name: 'Danza Folclórica UPB',
        category: 'Danza',
        description: 'Grupo de danza tradicional colombiana que preserva y difunde nuestras raíces culturales.',
        image: 'https://placehold.co/400x300/059669/ffffff?text=Danza+Folclórica',
        categoryColor: 'green',
        members: 30,
        founded: '2010',
        director: 'Ana Rodríguez',
        photos: []
      },
      {
        name: 'Orquesta Sinfónica UPB',
        category: 'Música',
        description: 'Orquesta estudiantil que interpreta repertorio sinfónico y de cámara.',
        image: 'https://placehold.co/400x300/7c3aed/ffffff?text=Orquesta+UPB',
        categoryColor: 'purple',
        members: 45,
        founded: '2008',
        director: 'Roberto Silva',
        photos: []
      },
      {
        name: 'Cine Club UPB',
        category: 'Cine',
        description: 'Grupo dedicado al análisis, producción y difusión del arte cinematográfico.',
        image: 'https://placehold.co/400x300/4f46e5/ffffff?text=Cine+Club',
        categoryColor: 'indigo',
        members: 22,
        founded: '2018',
        director: 'Laura Torres',
        photos: []
      },
      {
        name: 'Literatura UPB',
        category: 'Literatura',
        description: 'Círculo literario que promueve la lectura, escritura y análisis de textos.',
        image: 'https://placehold.co/400x300/eab308/ffffff?text=Literatura+UPB',
        categoryColor: 'yellow',
        members: 15,
        founded: '2016',
        director: 'Pedro Vargas',
        photos: []
      }
    ])

    console.log('[DB] Grupos creados')

    // Crear membresías
    await Membership.bulkCreate([
      { userId: coordinatorUser.id, groupId: groups[0].id, role: 'coordinator' },
      { userId: coordinatorUser.id, groupId: groups[1].id, role: 'coordinator' },
      { userId: adminUser.id, groupId: groups[0].id, role: 'member' },
      { userId: adminUser.id, groupId: groups[1].id, role: 'member' }
    ])

    console.log('[DB] Membresías creadas')

    // Crear eventos de prueba
    const now = new Date()
    const futureDate1 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // +7 días
    const futureDate2 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) // +14 días
    const futureDate3 = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000) // +21 días

    await Event.bulkCreate([
      {
        title: 'Concierto de Fin de Semestre',
        description: 'Una noche mágica de melodías con el coro de la UPB. ¡No te lo pierdas!',
        category: 'Música',
        groupId: groups[0].id,
        location: 'Forum UPB',
        startAt: futureDate1,
        endAt: new Date(futureDate1.getTime() + 2 * 60 * 60 * 1000), // +2 horas
        visibility: 'public',
        image: 'https://placehold.co/600x400/1a202c/ffffff?text=Concierto+de+Coro',
        categoryColor: 'blue'
      },
      {
        title: 'La Casa de Bernarda Alba',
        description: 'La aclamada obra de Federico García Lorca, interpretada por el grupo de teatro UPB.',
        category: 'Teatro',
        groupId: groups[1].id,
        location: 'Forum UPB',
        startAt: futureDate2,
        endAt: new Date(futureDate2.getTime() + 3 * 60 * 60 * 1000), // +3 horas
        visibility: 'public',
        image: 'https://placehold.co/600x400/9b2c2c/ffffff?text=Obra+de+Teatro',
        categoryColor: 'red'
      },
      {
        title: 'Festival Folclórico Nacional',
        description: 'Un vibrante festival que celebra las danzas tradicionales de todo el país.',
        category: 'Danza',
        groupId: groups[2].id,
        location: 'Coliseo Cubierto (Bloque 20)',
        startAt: futureDate3,
        endAt: new Date(futureDate3.getTime() + 4 * 60 * 60 * 1000), // +4 horas
        visibility: 'public',
        image: 'https://placehold.co/600x400/10b981/ffffff?text=Festival+de+Danza',
        categoryColor: 'green'
      }
    ])

    console.log('[DB] Eventos creados')
    console.log('[DB] ✅ Datos de prueba creados exitosamente!')
    console.log('[DB] Usuarios de prueba:')
    console.log('[DB] - admin@upb.edu.co / admin123 (admin)')
    console.log('[DB] - coordinator@upb.edu.co / coord123 (coordinator)')

  } catch (error) {
    console.error('[DB] Error creando datos de prueba:', error)
  } finally {
    await sequelize.close()
  }
}

// Ejecutar solo si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createTestData()
}

export { createTestData }
