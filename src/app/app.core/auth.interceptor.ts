// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// import { AbstractView } from './abstract_view';
// import { AuthService } from './auth.service';
// import { NoInternetError } from './no-internet-error';

// @Injectable()
// export class HeaderInterceptor extends AbstractView implements HttpInterceptor {
//     constructor(
//         public router: Router,
//         private authService: AuthService,
//         private messageService: MessageService
//     ) {
//         super(messageService, router);
//     }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const authorization = localStorage.getItem('authorization');

//         if (authorization !== null) {
//             if (this.authService.isValidToken(authorization)) {
//                 const headers = req.headers.set('Authorization', authorization);
//                 req = req.clone({ headers });
//             } else {
//                 this.router.navigate(['/login']);
//                 localStorage.clear();
//             }
//         }

//         return next.handle(req).pipe(map((event: HttpEvent<any>) => {
//             if (event instanceof HttpResponse) {
//                 this.allowUi();
//             }

//             return event;
//         }), catchError((error: HttpErrorResponse) => {
//             if (error.status === 403) {
//                 localStorage.clear();
//                 this.router.navigate(['/login']);
//             } else if (error.status === 0) {
//                 this.auth.showError('Por favor revise su conexión a internet');
//                 return throwError(new NoInternetError('Por favor revise su conexión a internet'));
//             }
//             return throwError(error);
//         })
//         );
//     }
// }
