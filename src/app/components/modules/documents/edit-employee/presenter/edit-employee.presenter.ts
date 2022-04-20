import { Injectable } from '@angular/core';
import { Presenter } from 'src/app/app.core/presenter';
import { EmployeePresenter, EmployeeVaccinePresenter } from 'src/app/model/employee';
import { Status } from 'src/app/model/status';
import { EmployeeService } from 'src/app/services/employee.service';
import { VaccineService } from 'src/app/services/vaccine.service';
import { EditEmployeesView } from '../edit-employee.view';

@Injectable({
    providedIn: 'root',
})
export class EditEmployeesPresenter implements Presenter {
    view: EditEmployeesView;

    constructor(
        private employeeService: EmployeeService,
        private vaccineService: VaccineService
    ) { }

    getVaccines() {
        this.view.blockUi();
        this.vaccineService.getVaccines().subscribe((res: any) => {
            this.view.vaccines = res;
            this.view.allowUi();
        }, (error) => {
            this.view.allowUi();

            this.view.showBackException(error);
        });
    }
    updateEmployee(form: any) {
        const employee: EmployeePresenter = this.createEmployee(form);
        this.view.blockUi();
        this.employeeService.saveEmployee(employee).subscribe((res: any) => {
            this.view.allowUi();

            if (res) {
                this.view.closeView(res);
            }
        }, (error) => {
            this.view.allowUi();

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
            dateOfBirth: this.view.selectedEmployee.dateOfBirth,
            address: form.value.address,
            phone: form.value.phone,
            status: this.view.selectedEmployee.employeeVaccinePresenters.length ? Status.VACCINE : Status.NOT_VACCINE,
            employeeVaccinePresenters: this.createVaccines()
        };
        return employee;
    }
    createVaccines(): EmployeeVaccinePresenter[] {
        const vacinnes: EmployeeVaccinePresenter[] = [];
        this.view.selectedEmployee.employeeVaccinePresenters.forEach(vaccine => {
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
