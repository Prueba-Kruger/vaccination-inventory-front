import { RolModel } from './rol.model';

export interface User {
    userId: string;
    dni: string;
    fullName: string;
    username: string;
    roles: RolModel[];
}
