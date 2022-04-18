import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingInRoutingModule } from './sing-in-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from 'src/app/utilities/prime/prime.module';
import { PasswordModule } from 'primeng/password';
import { BlockUIModule } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SingInRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
    PasswordModule,
    // MatIconModule,
    // SpinnerModule,
    // MatFormFieldModule,
    // MatProgressSpinnerModule,
    // MatInputModule,
    BlockUIModule
  ],
  providers: [
    ConfirmationService,
    DialogService,
  ],
  entryComponents: [
  ]
})
export class SingInModule { }
