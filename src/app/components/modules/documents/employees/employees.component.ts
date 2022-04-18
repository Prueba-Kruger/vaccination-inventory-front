import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbstractView } from 'src/app/app.core/abstract_view';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { EmployeesView } from './employees.view';
import { EmployeesPresenter } from './presenter/employees.presenter';
import Swal from 'sweetalert2';
import { Status } from 'src/app/model/status';
import { User } from 'src/app/model/user.model';
import { EmployeePresenter } from 'src/app/model/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends AbstractView implements OnInit, OnDestroy, EmployeesView {
  @ViewChild('docNo', { read: false, static: false }) docNo: ElementRef;
  dockNum$ = new Subject<string>();
  dockNumSubscription: Subscription;

  employees: EmployeePresenter[] = [];
  selectedEmployee: EmployeePresenter;
  searchValue = '';
  page = 0;
  size = 10;
  totalElements = 0;
  ref: any;
  initDate = new Date();
  endDate = new Date();
  status: { name: string, value: Status }[];
  statusSelected: Status[] = [];
  loginUser: User;

  constructor(
    public router: Router,
    public messageService: MessageService,
    public employeesPresenter: EmployeesPresenter,
    public dialogService: DialogService
  ) {
    super(messageService, router);
    employeesPresenter.view = this;
  }
  ngOnInit(): void {
    this.loginUser = JSON.parse(localStorage.getItem('user'));
    this.status = [
      { name: 'Vacunado', value: Status.VACCINE },
      { name: 'No vacunado', value: Status.NOT_VACCINE },
    ];
    this.dockNumSubscription = this.dockNum$.pipe(debounceTime(1500)).subscribe(res => this.findEmployees());
    this.findEmployees();
  }
  ngOnDestroy(): void {

  }
  paginate($event) {
    this.page = $event['page'];
    this.size = $event['rows'];
    this.findEmployees();
  }
  findEmployees() {
    this.employeesPresenter.findEmployees();
  }
  getEmployeeId(employee: EmployeePresenter) {
    // if (this.loginUser.userId===employee.) {

    // }
    this.selectedEmployee = employee;
    this.employeesPresenter.getEmployeeId();
  }
  showEmployeeComponent(workOrder: EmployeePresenter) {
    this.ref = this.dialogService.open(EditEmployeeComponent, {
      showHeader: false,
      closeOnEscape: true,
      data: workOrder
    });
    this.ref.onClose.subscribe((res: EmployeePresenter) => {
      if (res) {
        this.showSuccess('Éxito', 'Empleado ' + res.dni + ' actualizado');
      }
      this.ref = null;

    });
  }
  showDeleteEmplote(workOrder: EmployeePresenter) {
    Swal.fire({
      text: 'Está seguro que quiere eliminar?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        this.employeesPresenter.deleteEmplote(workOrder);
      }
    });
  }
  getWorkOrders() {
    if (this.searchValue.length <= 3) {
      return;
    }
    this.dockNum$.next(this.searchValue);
  }

}
