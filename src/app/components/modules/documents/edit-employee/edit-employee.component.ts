import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbstractView } from 'src/app/app.core/abstract_view';
import { Employee } from 'src/app/model/employee';
import { Vaccine } from 'src/app/model/vaccine';
import { EditEmployeesPresenter } from './presenter/edit-employee.presenter';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent extends AbstractView implements OnInit, EditEmployeeComponent {

  selectedEmployee: Employee;
  selectedVaccines: Vaccine[] = [];

  form = this.formBuilder.group({});
  btnName = '';

  constructor(
    public router: Router,
    public messageService: MessageService,
    public editEmployeesPresenter: EditEmployeesPresenter,
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    public formBuilder: FormBuilder

  ) {
    super(messageService, router);
    editEmployeesPresenter.view = this;
    this.selectedEmployee = config.data;
  }

  ngOnInit(): void {
    if (this.selectedEmployee) {
      this.form = this.formBuilder.group({
        dni: new FormControl(this.selectedEmployee.dni,
          [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
        firstName: new FormControl(this.selectedEmployee.firstName, [Validators.required]),
        lastName: new FormControl(this.selectedEmployee.lastName, [Validators.required]),
        mail: new FormControl(this.selectedEmployee.mail, [Validators.required, Validators.email]),
        dateOfBirth: new FormControl(this.selectedEmployee.dateOfBirth),
        address: new FormControl(this.selectedEmployee.address),
        phone: new FormControl(this.selectedEmployee.phone),
        status: new FormControl(this.selectedEmployee.status),
      });
      this.btnName = 'Actualizar';
    } else {
      this.form = this.formBuilder.group({
        dni: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl(''),
        address: new FormControl(''),
        phone: new FormControl(''),
        status: new FormControl(''),
      });
      this.btnName = 'Guardar';
    }
  }
  closeView(pickingOrder: Employee) {
    this.ref.close(pickingOrder);
  }
  get formControl() {
    return this.form.controls;
  }
  updateEmployee() {
    if (!this.form.valid) {
      this.showWarn('Adventencia', 'Información incorrecta');
      return;
    }
    this.editEmployeesPresenter.updateEmployee(this.form);
  }
}
