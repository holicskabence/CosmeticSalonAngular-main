import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from "../_models/service";
import { FreeTime } from '../_models/freetime';
import { Appointment } from '../_models/appointment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { DateService } from '../date.service';


import { Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';
import { TokenModel } from '../_models/tokenmodel';
import { UserInfo } from '../_models/userinfo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Logic {

  http: HttpClient
  snackBar: MatSnackBar
  router: Router
  dateService:DateService

  constructor(http: HttpClient, snackBar: MatSnackBar, router: Router) {
    this.http = http
    this.snackBar = snackBar
    this.router = router
    this.dateService=new DateService()
  }

  async getServices(): Promise<{ category: string; services: Service[] }[]> {
    return new Promise<{ category: string; services: Service[] }[]>((resolve) => {
      this.http
        .get<Array<Service>>('https://localhost:7043/Service')
        .pipe(
          map((resp) => {
            const categories = Array.from(new Set(resp.map((s) => s.category)))

            return categories.map((category) => {
              return {
                category: category,
                services: resp.filter((s) => s.category === category),
              }
            })
          })
        )
        .subscribe((serviceGroups) => {
          resolve(serviceGroups)
        })
    })
  }


  async getDates(): Promise<FreeTime[]> {
    return new Promise<FreeTime[]>((resolve, reject) => {
      this.http
        .get<Array<FreeTime>>('https://localhost:7043/AppointmentNonCrud/FreeTimes')
        .subscribe(resp => {
          const freeDates: FreeTime[] = resp.map(x => {
            const s = new FreeTime();
            s.dayName = this.dateService.getHungarianDayName(x.dayName);
            s.dayNumber = x.dayNumber;
            s.dayMonth = x.dayMonth;
            s.freeHours = x.freeHours.map(hour => new Date(hour));
            return s;
          });
          resolve(freeDates);
        }, error => {
          reject(error);
        });
    });
  }
  

  getUserId(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('BookingApp-token')
    })

    return this.http.get<UserInfo>('https://localhost:7043/Auth', { headers: headers })
      .pipe(
        map((resp: UserInfo) => resp.id)
      )
  }


  addAppointment(appointment: Appointment): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('BookingApp-token')
    });

    // Töröld az id mezőt az appointment objektumból
    const { id, ...appointmentWithoutId } = appointment;

    this.http
      .post(
        'https://localhost:7043/Appointment',
        appointmentWithoutId,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Sikeres időpont foglalás!", "Close", { duration: 5000 })
          this.router.navigate(['/home'])
          //console.log(success);
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
          //console.log(error);
        }
      );
  }

  getAppointments(): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      this.getUserId().subscribe(
        ownerId => {
          this.http
            .get<Array<Appointment>>('https://localhost:7043/Appointment')
            .subscribe((appointments) => {
              const filteredAppointments = appointments.filter(appointment => appointment.ownerId === ownerId)
              const sortedAppointments = filteredAppointments.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  
              resolve(sortedAppointments)
            },
            error => {
              reject(error)
            })
        },
        error => {
          reject(error)
        }
      )
    })
  }
  
  

  deleteAppointment(appointmentId: string): void {
    const url = `https://localhost:7043/Appointment/${appointmentId}`
  
    this.http
      .delete(url)
      .subscribe(
        (success) => {
          this.snackBar.open("Sikeresen törölted a foglalást!", "Close", { duration: 5000 })
          this.router.navigate(['/list-appointments'])
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      );
  }
  
  getUserInfo(): Observable<UserInfo> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('BookingApp-token')
    });
  
    return this.http.get<UserInfo>('https://localhost:7043/Auth', { headers: headers })
  }

  deleteUser(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('BookingApp-token')
    })

    this.http.delete('https://localhost:7043/Auth', { headers: headers })
      .subscribe(
        () => {
          this.snackBar.open("Felhasználó sikeresen törölve", "Close", { duration: 5000 })
        },
        (error) => {
          console.error('Hiba történt a felhasználó törlése során:', error)
          this.snackBar.open("Hiba történt a felhasználó törlése során:", error, { duration: 5000 })
        }
      )
  }

  editUser(user:UserInfo):void{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('BookingApp-token')
    })

    this.http.patch('https://localhost:7043/Auth', user, { headers: headers })
    .subscribe(
      () => {
        this.snackBar.open("Felhasználó adatai sikeresen módosítva lettek", "Close", { duration: 5000 })
      },
      (error) => {
        console.error('Hiba történt a felhasználó törlése során:', error)
        this.snackBar.open("Hiba történt a felhasználó adatainak módosítása során", error, { duration: 5000 })
      }
    )
  }
  

}