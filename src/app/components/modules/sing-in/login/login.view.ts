import { View } from 'src/app/app.core/view';

export interface LoginView extends View {
    user: string;
    password: string;
    redirectTo(ruta: string): void;
}
