import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value === 'female') return 'F';
    else if (value === 'male') return 'M';
    else return 'Undefined';
  }
}
