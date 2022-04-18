import { Permission } from './permission.model';

export interface RolModel {
    roleId: string;
    name: string;
    permissions: Permission[];
}
