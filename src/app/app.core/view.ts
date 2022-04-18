
export interface View {
    showMessage(message: string): void;
    showInfo(title: string, detail: string): void;
    showSuccess(title: string, detail: string): void;
    showWarn(title: string, detail: string): void;
    showError(title: string, detail: string): void;
    showBackException(error: any): void;
    blockUi(): void;
    allowUi(): void;
}
