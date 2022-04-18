import { View } from 'src/app/app.core/view';
import { Employee } from 'src/app/model/employee';
import { Vaccine } from 'src/app/model/vaccine';

export interface EditEmployeesView extends View {
    selectedEmployee: Employee;
    selectedVaccines: Vaccine[];

    closeView(workOrder: Employee);
}

