import { trigger, transition, style, animate, } from '@angular/animations';
export const leftToRigthAnimation = trigger('leftToRigthAnimation', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms', style({ transform: 'translateX(100%)' })),
    ]),
]);
export const righToLeft = trigger('righToLeft', [
    transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms', style({ transform: 'translateX(-100%)' })),
    ]),
]);

export const leftToLeft = trigger('leftToLeft', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms', style({ transform: 'translateX(-100%)' })),
    ]),
]);
export const rightToRight = trigger('rightToRight', [
    transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms', style({ transform: 'translateX(100%)' })),
    ]),
]);
export const bottomToTop = trigger('bottomToTop', [
    transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('300ms', style({ transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('300ms', style({ transform: 'translateY(100%)' })),
    ]),
]);
export const topToBottom = trigger('topToBottom', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('300ms', style({ transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('300ms', style({ transform: 'translateY(-100%)' })),
    ]),
]);
export const apearAnimation = trigger('apearAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
    ])
]);

