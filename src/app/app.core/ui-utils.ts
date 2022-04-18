import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiUtils {

  checkVal(value: string): string {
    if (value == null || value.length === 0) {
      return '';
    } else {
      return 'ui-state-filled';
    }

  }
}
