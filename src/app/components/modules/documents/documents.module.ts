import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents/documents.component';
import { PrimeModule } from 'src/app/utilities/prime/prime.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { EmployeesComponent } from './employees/employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    DocumentsComponent,
    EmployeesComponent,
    EditEmployeeComponent,
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    PrimeModule,
    MatTableModule,
    MatCheckboxModule,
    AutoCompleteModule,
    MatStepperModule,
    ScrollPanelModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: []

})
export class DocumentsModule { }
