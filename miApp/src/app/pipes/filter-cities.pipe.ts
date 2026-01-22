import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCities'
})
export class FilterCitiesPipe implements PipeTransform {
  transform(ciudades: string[], term: string): string[] {
    if (!term) return ciudades;
    const t = term.toLowerCase();
    return ciudades.filter(c => c.toLowerCase().includes(t));
  }
}
