import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/app.core/auth.guard';
import { DocumentsComponent } from './documents/documents.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {
    path: 'employee',
    component: DocumentsComponent,
    children: [
      {
        path: 'manage',
        component: EmployeesComponent,
        // canActivate: [AuthGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
