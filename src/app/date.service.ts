import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

    getHungarianDayName(dayName: string): string {
        switch (dayName) {
          case 'Monday':
            return 'Hétfő';
          case 'Tuesday':
            return 'Kedd';
          case 'Wednesday':
            return 'Szerda';
          case 'Thursday':
            return 'Csütörtök';
          case 'Friday':
            return 'Péntek';
          case 'Saturday':
            return 'Szombat';
          case 'Sunday':
            return 'Vasárnap';
          default:
            return 'Ismeretlen';
        }
      }
      
}
