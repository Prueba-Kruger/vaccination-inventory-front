import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AbstractView } from 'src/app/app.core/abstract_view';
import { UiUtils } from 'src/app/app.core/ui-utils';
import { LoginView } from './login.view';
import { LoginPresenter } from './presenter/login.presenter';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractView implements OnInit, LoginView {
    user = '';
    password = '';
    token: string;
    visiblePassword = true;
    ref: any;

    constructor(
        public router: Router,
        public uiUtils: UiUtils,
        public loginPresenter: LoginPresenter,
        public messageService: MessageService,
        public dialogService: DialogService,

    ) {
        super(messageService, router);
        this.loginPresenter.view = this;
    }
    ngOnInit() {
    }

    onClickAcceptButton() {
        this.loginPresenter.acceptLoging();
    }
    redirectTo(ruta: string) {
        this.router.navigate([ruta]);
    }

}
