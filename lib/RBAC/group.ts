type Permission = "EDIT_GROUP" | "REMOVE_PARTICIPANT" | "VIEW_GROUP" | "ADD_PARTICIPANT" | "DELETE_GROUP";

type Role = "ADMIN" | "PARTICIPANT";

const RolePermissions: Record<Role, Permission[]> = {
  ADMIN: ["EDIT_GROUP", "REMOVE_PARTICIPANT", "VIEW_GROUP"],
  PARTICIPANT: ["VIEW_GROUP",  "ADD_PARTICIPANT"],
};


export const canPerformAction = (role: Role, permission: Permission): boolean => {
    return RolePermissions[role].includes(permission);
}