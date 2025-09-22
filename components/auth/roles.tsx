import { createContext } from "react-router";

export type SerializedRole = { userId: string; roles: RoleData[] };

export interface RoleData {
  id: string;
  role: string;
  permission: string;
}

export class Role {
  userId: string;

  roles: RoleData[];

  constructor(userId: string, roles: RoleData[]) {
    this.userId = userId;
    this.roles = roles;
  }

  hasRole(checkRole: string): boolean {
    return this.roles.some((row) => row.role == checkRole);
  }

  public isProspectiveMember(): boolean {
    return this.hasRole("prospective_member");
  }

  public isMember(): boolean {
    return this.hasRole("member");
  }
}

export const RoleContext = createContext<Role | null>(null);
