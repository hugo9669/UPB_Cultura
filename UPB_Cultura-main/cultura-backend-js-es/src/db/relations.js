// Definición de asociaciones entre modelos
import { 
  User, 
  Role, 
  Group, 
  Category, 
<<<<<<< HEAD
  Membership,
  MembershipRequest,
  Event, 
  Publication, 
  Repertorio, 
  Comment,
  Message,
  UserMessage
=======
  Membership, 
  Event, 
  Publication, 
  Repertorio, 
  Comment 
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
} from "../models/index.js";

// Relaciones User - Role
User.belongsTo(Role, { foreignKey: "idRol", as: "rol" });
Role.hasMany(User, { foreignKey: "idRol", as: "usuarios" });

// Relaciones Group - User (líder)
Group.belongsTo(User, { foreignKey: "idLider", as: "lider" });
User.hasMany(Group, { foreignKey: "idLider", as: "gruposLiderados" });

// Relaciones Group - Category
Group.belongsTo(Category, { foreignKey: "idCategoria", as: "categoria" });
Category.hasMany(Group, { foreignKey: "idCategoria", as: "grupos" });

// Relaciones Membership (User - Group)
Membership.belongsTo(User, { foreignKey: "idUsuario", as: "usuario" });
Membership.belongsTo(Group, { foreignKey: "idGrupo", as: "grupo" });
User.hasMany(Membership, { foreignKey: "idUsuario", as: "membresias" });
Group.hasMany(Membership, { foreignKey: "idGrupo", as: "miembros" });

// Relaciones Event - Group
Event.belongsTo(Group, { foreignKey: "idGrupo", as: "grupo" });
Group.hasMany(Event, { foreignKey: "idGrupo", as: "eventos" });

// Relaciones Publication - Group
Publication.belongsTo(Group, { foreignKey: "idGrupo", as: "grupo" });
Group.hasMany(Publication, { foreignKey: "idGrupo", as: "publicaciones" });

// Relaciones Repertorio - Group
Repertorio.belongsTo(Group, { foreignKey: "idGrupo", as: "grupo" });
Group.hasMany(Repertorio, { foreignKey: "idGrupo", as: "repertorios" });

// Relaciones Comment
Comment.belongsTo(User, { foreignKey: "idUsuario", as: "usuario" });
Comment.belongsTo(Event, { foreignKey: "idEvento", as: "evento" });
Comment.belongsTo(Publication, { foreignKey: "idPublicacion", as: "publicacion" });

User.hasMany(Comment, { foreignKey: "idUsuario", as: "comentarios" });
Event.hasMany(Comment, { foreignKey: "idEvento", as: "comentarios" });
Publication.hasMany(Comment, { foreignKey: "idPublicacion", as: "comentarios" });
<<<<<<< HEAD

// Relaciones Message - Group
Message.belongsTo(Group, { foreignKey: "idGrupo", as: "grupo" });
Group.hasMany(Message, { foreignKey: "idGrupo", as: "mensajes" });

// Relaciones UserMessage - User (remitente y destinatario)
UserMessage.belongsTo(User, { foreignKey: "idRemitente", as: "remitente" });
UserMessage.belongsTo(User, { foreignKey: "idDestinatario", as: "destinatario" });
User.hasMany(UserMessage, { foreignKey: "idRemitente", as: "mensajesEnviados" });
User.hasMany(UserMessage, { foreignKey: "idDestinatario", as: "mensajesRecibidos" });

// Relaciones UserMessage - Group
UserMessage.belongsTo(Group, { foreignKey: "idGrupo", as: "grupo" });
Group.hasMany(UserMessage, { foreignKey: "idGrupo", as: "mensajesUsuarios" });

// Relaciones UserMessage - Event (opcional)
UserMessage.belongsTo(Event, { foreignKey: "idEvento", as: "evento" });
Event.hasMany(UserMessage, { foreignKey: "idEvento", as: "mensajes" });

// Relaciones MembershipRequest - User y Group
MembershipRequest.belongsTo(User, { foreignKey: "idUsuario", as: "usuario" });
MembershipRequest.belongsTo(Group, { foreignKey: "idGrupo", as: "grupo" });
User.hasMany(MembershipRequest, { foreignKey: "idUsuario", as: "solicitudesMembresia" });
Group.hasMany(MembershipRequest, { foreignKey: "idGrupo", as: "solicitudesMembresia" });
=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
