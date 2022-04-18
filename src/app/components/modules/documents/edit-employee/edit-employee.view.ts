import { View } from 'src/app/app.core/view';
import { EmployeePresenter, EmployeeVaccinePresenter } from 'src/app/model/employee';

export interface EditEmployeesView extends View {
    selectedEmployee: EmployeePresenter;
    selectedVaccines: EmployeeVaccinePresenter[];
    date: Date;
    status: any[];
    statusSelected: any;
    closeView(workOrder: EmployeePresenter);
}

