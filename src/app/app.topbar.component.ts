import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a href="#">
                    <img src="assets/layout/images/logo.png">
                </a>
            </div>
            <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                <i class="pi pi-bars"></i>
            </a>
            <ul class="topbar-menu fadeInDown" [ngClass]="{'topbar-menu-visible': app.topbarMenuActive}">
                <li #profile class="profile-item" [ngClass]="{'active-topmenuitem':app.activeTopbarItem === profile}">
                    <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                        <div class="profile-image">

                        </div>
                        <div class="profile-info">
                        <i class="topbar-icon material-icons pointer">person</i>
                        </div>
                    </a>

                    <ul class="fadeInDown">
                        <li role="menuitem" (click)="logout()">
                            <a href="#" >
                                <i class="pi pi-sign-out"></i>
                                <span >Salir</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppTopbarComponent {
    public static doingSomething = false;
    activeTopbarItem: Element;

    constructor(
        public app: AppMainComponent,
        public router: Router,
        // public messageService: MessageService,


    ) {
        // super(messageService, router);
    }

    logout() {
        // this.blockUi();
        localStorage.clear();
        const status = localStorage.getItem('authorization');
        if (status == null) {
            // window.location.reload();
            this.router.navigate(['/login']);
            window.location.href = window.location.href;
        }
    }

}
