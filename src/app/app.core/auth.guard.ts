import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { AbstractView } from './abstract_view';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard extends AbstractView implements CanActivate {
    constructor(
      public router: Router,
      private authService: AuthService,
      private messageService: MessageService,
    ) {
        super(messageService, router);
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        const token = localStorage.getItem('authorization');
        try {
            if (!this.authService.isValidToken(token)) {
                localStorage.clear();
                this.router.navigate(['/login']);
                return false;
            }

            return true;
        } catch (Error) {
            localStorage.clear();
            this.router.navigate(['/login']);
            return false;
        }
    }

    getTokenInfo(token: string) {
        return jwt_decode(token, { header: true });
    }
}
