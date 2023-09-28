import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let values = value.split(' ');
    let result = '';

    for(let v of values) {
      result += this.captalize(v);
    }

    return result;
  }

  captalize(value: string): string {
    return value.substring(0,1).toUpperCase() + value.substring(1).toLocaleLowerCase() + ' ';
  }

}
