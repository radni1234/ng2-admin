import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointReplacer'
})

export class PointReplacerPipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    if(value) {
      return value.replace('.', ',');
    }
    return '';
  }
}
