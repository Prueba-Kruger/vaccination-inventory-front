import { Vaccine } from './vaccine';

export interface Employee {
    employeeId: string;
    dni: string;
    firstName: string;
    lastName: string;
    mail: string;
    dateOfBirth: string;
    address: string;
    phone: string;
    status: string;
    vaccines: Vaccine[];
}
