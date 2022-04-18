import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { View } from './view';
import { AppTopbarComponent } from '../app.topbar.component';

export abstract class AbstractView implements View {
    @BlockUI() blockUI: NgBlockUI;
    auth = JSON.parse(localStorage.getItem('permisions'));

    constructor(public service: MessageService, public router?: Router) { }

    showMessage(message: string) {
        this.showWarn('Mensaje', message);
    }

    showInfo(title: string, detail: string) {
        this.showToast('info', title, detail);
    }

    showSuccess(title: string, detail: string) {
        this.showToast('success', title, detail);
    }

    showWarn(title: string, detail: string) {
        this.showToast('warn', title, detail);
    }

    showError(title: string, detail: string) {
        this.showToast('error', title, detail);
    }

    showBackException(error: any) {
        this.allowUi();
        if (error instanceof HttpErrorResponse) {
            this.showError('Atención', error.error.message);
        } else {
            if (error.translateMessage) {
                this.showError('Atención', error.translateMessage);
            } else if (error.message) {
                this.showError('Atención', error.message);
            } else {
                this.showError('Atención', 'Algo salió mal al procesar la petición');
            }
        }
    }

    showToast(type: string, title: string, detail: string) {
        this.service.add({
            key: 'tst',
            severity: type,
            summary: title,
            detail,
        });
    }

    redirectTo(ruta: string) {
        this.router.navigate([ruta]);
    }

    blockUi() {
        AppTopbarComponent.doingSomething = true;
        this.blockUI.start('Cargando...');
    }
    allowUi() {
        AppTopbarComponent.doingSomething = false;
        this.blockUI.stop();
    }

    getAuth(permissions: string[]) {
        const auth = this.auth;
        let isAuth = false;
        const newAuth = [];
        if (auth) {
            auth.forEach((element) => {
                newAuth.push(element.authority);
            });
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < permissions.length; i++) {
                const resultado = newAuth.includes(permissions[i]);
                if (resultado) {
                    isAuth = true;
                } else {
                    isAuth = false;
                    break;
                }
            }
            return isAuth;
        }
    }

}


