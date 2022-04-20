import { View } from 'src/app/app.core/view';
import { EmployeePresenter, EmployeeVaccinePresenter, VaccinePresenter } from 'src/app/model/employee';

export interface EditEmployeesView extends View {
    selectedEmployee: EmployeePresenter;
    // selectedVaccines: EmployeeVaccinePresenter[];
    date: Date;
    status: any[];
    statusSelected: any;
    vaccines: VaccinePresenter[];
    closeView(workOrder: EmployeePresenter);
}

