import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presenter } from 'src/app/app.core/presenter';
import { UserService } from 'src/app/services/user.service';
import { LoginView } from '../login.view';

@Injectable({
    providedIn: 'root',
})
export class LoginPresenter implements Presenter {
    view: LoginView;

    constructor(
        private userService: UserService
    ) { }

    acceptLoging() {
        const user = this.view.user;
        const password = this.view.password;
        if (!user || user.length === 0) {
            this.view.showMessage('Debe ingresar un usuario');
            return;
        }
        if (!password || password.length === 0) {
            this.view.showMessage('Debe ingresar una contraseña');
            return;
        }
        // localStorage.clear();

        this.view.blockUi();
        this.userService.doLoginRest(user, password).subscribe((data: any) => {
            localStorage.setItem('user', JSON.stringify(data));
            this.view.redirectTo('/main');
            this.view.allowUi();

        }, (errors: HttpErrorResponse) => {
            this.view.showError('Error', errors.error.message);
            this.view.allowUi();
        });
    }


}
