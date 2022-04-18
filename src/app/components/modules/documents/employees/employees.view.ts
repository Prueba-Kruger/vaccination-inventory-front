import { View } from 'src/app/app.core/view';
import { EmployeePresenter } from 'src/app/model/employee';

export interface EmployeesView extends View {
    employees: EmployeePresenter[];
    selectedEmployee: EmployeePresenter;
    searchValue: string;
    page: number;
    size: number;
    totalElements: number;
    initDate: Date;
    endDate: Date;
    status: any[];
    statusSelected: any;

    showEmployeeComponent(workOrder: EmployeePresenter);

}

