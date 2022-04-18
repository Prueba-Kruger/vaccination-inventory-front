import { View } from 'src/app/app.core/view';
import { Employee } from 'src/app/model/employee';

export interface EmployeesView extends View {
    employees: Employee[];
    selectedEmployee: Employee;
    searchValue: string;
    page: number;
    size: number;
    totalElements: number;

    showEmployeeComponent(workOrder: Employee);

}

