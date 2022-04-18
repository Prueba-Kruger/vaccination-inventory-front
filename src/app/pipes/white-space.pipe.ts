import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whiteSpace'
})
export class WhiteSpacePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return whiteSpace(value);
  }
}
export function whiteSpace(value: string) {
  value = !value ? '' : value;
  return value.split('_').join(' ');
}
