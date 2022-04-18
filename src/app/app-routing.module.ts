import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AuthGuard } from './app.core/auth.guard';
import { AppErrorComponent } from './components/pages/app.error.component';
import { AppAccessdeniedComponent } from './components/pages/app.accessdenied.component';
import { AppNotfoundComponent } from './components/pages/app.notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'main', component: AppMainComponent,
                // canActivate: [AuthGuard]
            },

            { path: '', redirectTo: 'sing-in/login', pathMatch: 'full' },
            {
                path: '',
                loadChildren: () => import('./components/modules/sing-in/sing-in.module').then((m) => m.SingInModule),
            },
            {
                path: '',
                component: AppMainComponent,
                loadChildren: () =>
                    import('./components/modules/documents/documents.module').then((m) => m.DocumentsModule),
                // canActivate: [AuthGuard]
            },
            { path: 'error', component: AppErrorComponent },
            { path: 'denied', component: AppAccessdeniedComponent },
            { path: '**', component: AppNotfoundComponent },
        ]),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
