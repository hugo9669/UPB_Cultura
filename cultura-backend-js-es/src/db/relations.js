// Definición de asociaciones entre modelos
import { User, Group, Membership, Event, Media, Announcement } from "../models/index.js";

Group.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
User.hasMany(Group, { as: "ownedGroups", foreignKey: "ownerId" });

Membership.belongsTo(User, { foreignKey: "userId" });
Membership.belongsTo(Group, { foreignKey: "groupId" });
User.hasMany(Membership, { foreignKey: "userId" });
Group.hasMany(Membership, { foreignKey: "groupId" });

Event.belongsTo(Group, { foreignKey: "groupId" });
Group.hasMany(Event, { foreignKey: "groupId" });

Media.belongsTo(Group, { foreignKey: "groupId", allowNull: true });
Media.belongsTo(Event, { foreignKey: "eventId", allowNull: true });

Announcement.belongsTo(Group, { foreignKey: "groupId" });
Announcement.belongsTo(User, { as: "author", foreignKey: "authorId" });
