import { Injectable } from '@angular/core';
import { Presenter } from 'src/app/app.core/presenter';
import { EmployeePresenter, EmployeeVaccinePresenter } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EditEmployeesView } from '../edit-employee.view';

@Injectable({
    providedIn: 'root',
})
export class EditEmployeesPresenter implements Presenter {
    view: EditEmployeesView;

    constructor(
        private employeeService: EmployeeService
    ) { }

    updateEmployee(form: any) {
        const employee: EmployeePresenter = this.createEmployee(form);
        this.view.blockUi();
        this.employeeService.saveEmployee(employee).subscribe((res: any) => {
            if (res) {
                this.view.closeView(res.data.saveVehicle);
            }
        }, (error) => {
            this.view.showBackException(error);
        });
    }
    createEmployee(form: any): EmployeePresenter {
        const employee: EmployeePresenter = {
            employeeId: this.view.selectedEmployee ? this.view.selectedEmployee.employeeId : null,
            dni: form.value.dni,
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            mail: form.value.mail,
            dateOfBirth: form.value.dateOfBirth,
            address: form.value.address,
            phone: form.value.phone,
            status: form.value.status,
            employeeVaccinePresenters: this.createVaccines()
        };
        return employee;
    }
    createVaccines(): EmployeeVaccinePresenter[] {
        const vacinnes: EmployeeVaccinePresenter[] = [];
        this.view.selectedVaccines.forEach(vaccine => {
            const newVacinne: EmployeeVaccinePresenter = {
                employeeVaccineId: vaccine.employeeVaccineId,
                vaccinePresenter: {
                    vaccineId: vaccine.vaccinePresenter.vaccineId,
                    name: vaccine.vaccinePresenter.name,
                    description: vaccine.vaccinePresenter.description,
                },
                date: vaccine.date,
                dose: vaccine.dose
            };
            vacinnes.push(newVacinne);
        });
        return vacinnes;
    }
}
