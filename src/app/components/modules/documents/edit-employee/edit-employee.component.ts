import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbstractView } from 'src/app/app.core/abstract_view';
import { EmployeePresenter, EmployeeVaccinePresenter, VaccinePresenter } from 'src/app/model/employee';
import { Status } from 'src/app/model/status';
import { EditEmployeesPresenter } from './presenter/edit-employee.presenter';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent extends AbstractView implements OnInit, EditEmployeeComponent {

  selectedEmployee: EmployeePresenter;
  // selectedVaccines: EmployeeVaccinePresenter[] = [];

  form = this.formBuilder.group({});
  btnName = '';
  date = new Date();
  status: { name: string, value: Status }[];
  statusSelected: Status[] = [];
  showNewVaccine = false;

  selectedVaccine: VaccinePresenter;
  dateVaccine = new Date();
  dose: number;
  vaccines: VaccinePresenter[] = [];
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
    this.editEmployeesPresenter.getVaccines();
    this.initForm();
  }

  initForm() {
    if (this.selectedEmployee) {

      if (this.selectedEmployee.employeeVaccinePresenters.length) {
        // this.selectedVaccines = this.selectedEmployee.employeeVaccinePresenters;
        this.status = [
          { name: 'Vacunado', value: Status.VACCINE }
        ];
      } else {
        this.status = [
          { name: 'No vacunado', value: Status.NOT_VACCINE },
        ];
      }
      this.form = this.formBuilder.group({
        dni: new FormControl(this.selectedEmployee.dni,
          [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
        firstName: new FormControl(this.selectedEmployee.firstName, [Validators.required]),
        lastName: new FormControl(this.selectedEmployee.lastName, [Validators.required]),
        mail: new FormControl(this.selectedEmployee.mail, [Validators.required, Validators.email]),
        dateOfBirth: new FormControl(this.selectedEmployee.dateOfBirth),
        address: new FormControl(this.selectedEmployee.address),
        phone: new FormControl(this.selectedEmployee.phone),
        status: new FormControl({ value: this.status[0].name, disabled: true }),
      });

      this.btnName = 'Actualizar';
    } else {
      this.form = this.formBuilder.group({
        dni: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        dateOfBirth: new FormControl(''),
        address: new FormControl(''),
        phone: new FormControl(''),
        status: new FormControl({ value: 'NO VACUNADO', disabled: true }),
      });
      this.btnName = 'Guardar';
      this.status = [
        { name: 'No vacunado', value: Status.NOT_VACCINE },
      ];
    }
  }
  closeView(pickingOrder: EmployeePresenter) {
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
  newVaccine() {
    this.showNewVaccine = !this.showNewVaccine;
    this.dose = this.selectedEmployee.employeeVaccinePresenters.length + 1;
    this.selectedVaccine = this.vaccines[0];
  }
  addVaccine() {
    const format = 'yyyy-MM-dd hh:mm:ss';
    const locale = 'en-US';
    let initDate = '';
    if (!this.selectedVaccine) {
      this.showWarn('Advertencia', 'Debe seleccionar un nombre');
      return;
    }
    if (!this.dateVaccine) {
      this.showWarn('Advertencia', 'Debe seleccionar un nombre');
      return;
    }
    if (!this.dose) {
      this.showWarn('Advertencia', 'Debe seleccionar un nombre');
      return;
    }
    initDate = formatDate(this.dateVaccine, format, locale);
    const vaccine: EmployeeVaccinePresenter = {
      employeeVaccineId: null,
      vaccinePresenter: {
        vaccineId: this.selectedVaccine.vaccineId,
        name: this.selectedVaccine.name,
        description: this.selectedVaccine.description,
      },
      date: initDate,
      dose: this.dose.toString()
    };
    this.selectedEmployee.employeeVaccinePresenters.push(vaccine);
    // this.selectedVaccines.push(vaccine);
    this.showNewVaccine = false;
  }

}
