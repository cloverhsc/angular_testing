import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'my'
})
export class MyPipe implements PipeTransform {

  transform(value: string): string {
    return value.length === 0 ? '' :
    value.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
  }
}
