import { Injectable } from '@angular/core';
import { Presenter } from 'src/app/app.core/presenter';
import { EmployeePresenter } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeesView } from '../employees.view';

@Injectable({
    providedIn: 'root',
})
export class EmployeesPresenter implements Presenter {
    view: EmployeesView;

    constructor(
        private employeeService: EmployeeService
    ) { }
    findEmployees() {
        const searchValue = this.view.searchValue;
        const page = this.view.page;
        const size = this.view.size;
        if (page < 0) {
            return;
        }
        if (!size || size < 1) {
            return;
        }
        this.view.blockUi();
        this.employeeService.getEmployeesPaginated(searchValue, page, size).subscribe((res: any) => {
            if (res) {
                this.view.employees = res.data;
                this.view.totalElements = res.totalElements;
            }
            this.view.allowUi();
        }, error => {
            this.view.showBackException(error);
            this.view.allowUi();
        });

    }
    getEmployeeId() {
        this.view.blockUi();
        this.employeeService.getEmployeeById(this.view.selectedEmployee.employeeId).subscribe((res: any) => {
            if (res) {
                this.view.showEmployeeComponent(res);
            }
            this.view.allowUi();
        }, error => {
            this.view.showBackException(error);
            this.view.allowUi();
        });
    }
    deleteEmplote(employee: EmployeePresenter) {
        this.view.blockUi();
        this.employeeService.getEmployeeById(employee.employeeId).subscribe((res: any) => {
            if (res) {
                this.view.showSuccess('Éxito', 'Empleado eliminado correctamente');
            }
            this.view.allowUi();
        }, error => {
            this.view.showBackException(error);
            this.view.allowUi();
        });
    }

}
