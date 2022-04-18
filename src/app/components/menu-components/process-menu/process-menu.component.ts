import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AbstractView } from 'src/app/app.core/abstract_view';

@Component({
  selector: 'app-process-menu',
  templateUrl: './process-menu.component.html',
})
export class ProcessMenuComponent extends AbstractView implements OnInit {
  public model: any[];

  constructor(
    public messageService: MessageService,
    public router: Router) {
    super(messageService, router
    );
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Empleados',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/employee/manage'],
      }
    ];
  }
}
