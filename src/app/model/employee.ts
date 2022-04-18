export interface EmployeePresenter {
    employeeId: string;
    dni: string;
    firstName: string;
    lastName: string;
    mail: string;
    dateOfBirth: Date;
    address: string;
    phone: string;
    status: string;
    employeeVaccinePresenters: EmployeeVaccinePresenter[];
}

export interface EmployeeVaccinePresenter {

    employeeVaccineId: string;
    date: string;
    dose: string;
    vaccinePresenter: VaccinePresenter;
}

export interface VaccinePresenter {
    vaccineId: string;
    name: string;
    description: string;
}
