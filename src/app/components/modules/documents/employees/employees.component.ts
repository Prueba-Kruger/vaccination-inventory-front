import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbstractView } from 'src/app/app.core/abstract_view';
import { Employee } from 'src/app/model/employee';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { EmployeesView } from './employees.view';
import { EmployeesPresenter } from './presenter/employees.presenter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends AbstractView implements OnInit, OnDestroy, EmployeesView {
  @ViewChild('docNo', { read: false, static: false }) docNo: ElementRef;
  dockNum$ = new Subject<string>();
  dockNumSubscription: Subscription;

  employees: Employee[] = [];
  selectedEmployee: Employee;
  searchValue = '';
  page = 0;
  size = 10;
  totalElements = 0;
  ref: any;
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
  getEmployeeId(workOrder: Employee) {
    this.selectedEmployee = workOrder;
    this.employeesPresenter.getEmployeeId();
  }
  showEmployeeComponent(workOrder: Employee) {
    this.ref = this.dialogService.open(EditEmployeeComponent, {
      showHeader: false,
      closeOnEscape: true,
      data: workOrder
    });
    this.ref.onClose.subscribe((res: Employee) => {
      if (res) {
        this.showSuccess('Éxito', 'Empleado ' + res.dni + ' actualizado');
      }
      this.ref = null;

    });
  }
  showDeleteEmplote(workOrder: Employee) {
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
