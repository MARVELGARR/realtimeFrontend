type Permission = "EDIT_GROUP" | "REMOVE_PARTICIPANT" | "VIEW_GROUP" | "ADD_PARTICIPANT" | "DELETE_GROUP";

type Role = "admin" | "participant";

const RolePermissions: Record<Role, Permission[]> = {
  admin: ["EDIT_GROUP", "REMOVE_PARTICIPANT", "VIEW_GROUP"],
  participant: ["VIEW_GROUP",  "ADD_PARTICIPANT"],
};


export const canPerformAction = (role: Role, permission: Permission): boolean => {
    return RolePermissions[role].includes(permission);
}