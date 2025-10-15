// Definición de asociaciones entre modelos
import { 
  User, 
  Role, 
  Group, 
  Category, 
  Membership, 
  Event, 
  Publication, 
  Repertorio, 
  Comment 
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
