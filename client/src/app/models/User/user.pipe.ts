import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user',
  standalone: true
})
export class UserPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
